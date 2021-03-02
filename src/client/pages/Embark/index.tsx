import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import {
  EmbarkProvider,
  Header,
  Passage,
  useEmbark,
} from '@hedviginsurance/embark'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

import { colorsV3 } from '@hedviginsurance/brand'
import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import { apolloClient } from 'apolloClient'
import {
  getPickedLocaleFromCurrentLocale,
  useCurrentLocale,
} from 'components/utils/CurrentLocale'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { useTextKeys } from 'utils/textKeys'
import { StorageContainer } from '../../utils/StorageContainer'
import { Landing } from '../Landing/Landing'
import { createQuote } from './createQuote'
import {
  resolveExternalInsuranceProviderProviderStatus,
  resolveExternalInsuranceProviderStartSession,
} from './externalInsuranceProvider'
import { graphQLMutation, graphQLQuery } from './graphql'
import { resolveHouseInformation } from './houseInformation'
import { LanguagePicker } from './LanguagePicker'
import { resolvePersonalInformation } from './personalInformation'

const EmbarkStyling = styled.div`
  height: 100%;
  background-color: ${colorsV3.gray900};
  color: ${colorsV3.white};

  * {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ul,
  li {
    list-style-type: none;
  }
`

const PassageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${colorsV3.gray900};
`

interface EmbarkProps {
  data: any
  name: string
  baseUrl: string
  startPageLink?: string
}

const Embark: React.FunctionComponent<EmbarkProps> = (props) => {
  const history = useHistory<{
    embarkPassageName: string
    embarkPassageId: string
    embarkPassageHistory: any
  }>()
  const {
    reducer: [state, dispatch],
    goTo,
  } = useEmbark(() => {
    if (
      history.location.state &&
      props.name === history.location.state.embarkPassageName
    ) {
      return {
        history: history.location.state.embarkPassageHistory || [
          props.data.startPassage,
        ],
        passageId:
          history.location.state.embarkPassageId || props.data.startPassage,
        data: props.data,
      }
    }

    return {
      history: [props.data.startPassage],
      passageId: props.data.startPassage,
      data: props.data,
    }
  })

  const currentPassage = state.data.passages.find(
    (passage: any) => passage.id === state.passageId,
  )

  React.useEffect(() => {
    if (!currentPassage?.id) {
      return
    }
    const method =
      history.location.pathname === props.baseUrl ? 'replace' : 'push'
    const newPathName = `${props.baseUrl}${currentPassage.url ||
      `/${currentPassage.id}`}`

    if (currentPassage.api || currentPassage.externalRedirect) {
      return
    }

    if (history.location.pathname !== newPathName) {
      history[method](newPathName, {
        embarkPassageId: currentPassage.id,
        embarkPassageHistory: state.history,
        embarkPassageName: props.name,
      })
    }
  }, [
    currentPassage.id,
    currentPassage.url,
    currentPassage.api,
    currentPassage.externalRedirect,
    history,
    state,
    props.baseUrl,
    props.name,
  ])

  const variation = useVariation()

  return (
    <PassageContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 1 }}
      >
        {![Variation.IOS, Variation.ANDROID].includes(variation!) && (
          <StorageContainer>
            {({ session }) => (
              <Header
                partnerName={
                  (session &&
                    session.getSession() &&
                    session.getSession()!.partner) ||
                  null
                }
                passage={currentPassage}
                storyData={state.data}
                startPageLink={props.startPageLink}
                customTrailingContent={<LanguagePicker />}
              />
            )}
          </StorageContainer>
        )}
      </motion.div>
      <Passage
        hasHeader={![Variation.IOS, Variation.ANDROID].includes(variation!)}
        canGoBack={state.history.length > 1}
        historyGoBackListener={(goBack) =>
          history.listen((_: any, action: string) => {
            if (action === 'POP' && state.history.length > 1) {
              goBack()
            }
          })
        }
        passage={currentPassage}
        goBack={() => {
          dispatch({
            type: 'GO_BACK',
          })
        }}
        changePassage={goTo}
      />
    </PassageContainer>
  )
}

interface EmbarkRootProps {
  name?: string
  baseUrl?: string
  showLanding?: boolean
  language: string
}

const ANGEL_DATA_QUERY = gql`
  query AngelStory($name: String!, $locale: String!) {
    angelStory(name: $name, locale: $locale) {
      content
    }
  }
`

interface AngelData {
  angelStory: {
    content: string
  }
}

interface AngelVariables {
  name: string
  locale: string
}

export const EmbarkRoot: React.FunctionComponent<EmbarkRootProps> = (props) => {
  const history = useHistory()
  const [data, setData] = React.useState<[string, any] | null>(null)
  const [initialStore, setInitialStore] = React.useState<null | {
    [key: string]: any
  }>()
  const currentLocale = useCurrentLocale()
  const localeIsoCode = getPickedLocaleFromCurrentLocale(currentLocale)

  const textKeys = useTextKeys()

  const isShowingLanding = props.showLanding || false

  React.useEffect(() => {
    ;(async () => {
      if (!props.name) {
        return
      }
      if (!apolloClient) {
        throw Error('Missing apollo client')
      }

      const result = await apolloClient.client.query<AngelData, AngelVariables>(
        {
          query: ANGEL_DATA_QUERY,
          variables: { name: props.name, locale: localeIsoCode },
        },
      )

      if (result.data && result.data.angelStory) {
        setData([props.name, JSON.parse(result.data.angelStory.content)])
      }
    })()
  }, [props.name, localeIsoCode])

  React.useEffect(() => {
    if (!props.name) {
      return
    }

    const prevStore = window.sessionStorage.getItem(
      `embark-store-${encodeURIComponent(props.name)}`,
    )

    if (!prevStore) {
      setInitialStore({})
      return
    }

    try {
      const parsedPrevStore = JSON.parse(prevStore)
      setInitialStore(parsedPrevStore as { [key: string]: any })
    } catch (err) {
      setInitialStore({})
    }
  }, [props.name])

  const isDenmarkInProduction =
    (currentLocale === 'dk' || currentLocale === 'dk-en') &&
    window.hedvigClientConfig.appEnvironment === 'production'

  useEffect(() => {
    if (isDenmarkInProduction) {
      window.location.pathname = `/${currentLocale}`
    }
  }, [isDenmarkInProduction])

  if (isDenmarkInProduction) {
    return null
  }

  return (
    <EmbarkStyling>
      <Helmet>
        <title>{textKeys.STARTPAGE_PAGE_TITLE()}</title>
        <meta
          property="og:image"
          content="https://www.hedvig.com/new-member-assets/social/hedvig-hemforsakring-2.jpg"
        />
        <meta property="og:title" content={textKeys.EMBARK_META_OG_TITLE()} />
      </Helmet>
      <Global
        styles={css`
          body {
            overflow: hidden;
          }
        `}
      />
      <AnimatePresence>
        {!isShowingLanding && (
          <motion.div
            key="embark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: 'easeOut',
              duration: 0.5,
              delay: 0.25,
            }}
          >
            {data && initialStore && data[0] === props.name && (
              <StorageContainer>
                {(storageState) => (
                  <EmbarkProvider
                    externalRedirects={{
                      Offer: () => {
                        history.push(
                          (props.language ? '/' + props.language : '') +
                            '/new-member/offer',
                        )
                      },
                      MailingList: () => {
                        location.href =
                          'https://hedvigapp.typeform.com/to/xiTKWi'
                      },
                    }}
                    data={data[1]}
                    resolvers={{
                      graphqlQuery: graphQLQuery(
                        storageState,
                        getPickedLocaleFromCurrentLocale(currentLocale),
                      ),
                      graphqlMutation: graphQLMutation(
                        storageState,
                        getPickedLocaleFromCurrentLocale(currentLocale),
                      ),
                      personalInformationApi: resolvePersonalInformation,
                      houseInformation: resolveHouseInformation,
                      createQuote: createQuote(
                        storageState,
                        getPickedLocaleFromCurrentLocale(currentLocale),
                      ),
                      externalInsuranceProviderProviderStatus: resolveExternalInsuranceProviderProviderStatus,
                      externalInsuranceProviderStartSession: resolveExternalInsuranceProviderStartSession,
                      track: (eventName, payload) => {
                        const castedWindow = window as any
                        if (castedWindow && castedWindow.analytics) {
                          castedWindow.analytics.track(eventName, {
                            ...payload,
                            originatedFromEmbarkStory: props.name,
                          })
                        }
                      },
                    }}
                    initialStore={initialStore}
                    onStoreChange={(store) => {
                      const storeKey = `embark-store-${encodeURIComponent(
                        props.name!,
                      )}`
                      window.sessionStorage.setItem(
                        storeKey,
                        JSON.stringify(store),
                      )
                      if (store.quoteId) {
                        storageState.session.setSession({
                          ...storageState.session.getSession(),
                          quoteIds: [store.quoteId],
                        })
                      }
                      if (
                        store.norwegianHomeContentsQuoteId &&
                        store.norwegianTravelQuoteId
                      ) {
                        storageState.session.setSession({
                          ...storageState.session.getSession(),
                          quoteIds: [
                            store.norwegianHomeContentsQuoteId,
                            store.norwegianTravelQuoteId,
                          ],
                        })
                      }
                    }}
                  >
                    <Embark
                      baseUrl={props.baseUrl!}
                      data={data[1]}
                      name={props.name!}
                      startPageLink={
                        props.language ? '/' + props.language : '/'
                      }
                    />
                  </EmbarkProvider>
                )}
              </StorageContainer>
            )}
          </motion.div>
        )}
        {isShowingLanding && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: 'easeOut',
              duration: 0.5,
              delay: 0.25,
            }}
          >
            <Landing language={props.language} />
          </motion.div>
        )}
      </AnimatePresence>
    </EmbarkStyling>
  )
}

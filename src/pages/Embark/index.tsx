import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import {
  EmbarkProvider,
  Header,
  Passage,
  useEmbark,
} from '@hedviginsurance/embark'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { useHistory } from 'react-router'

import { colorsV2 } from '@hedviginsurance/brand'
import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { apolloClient } from '../../client/apolloClient'
import { StorageContainer } from '../../utils/StorageContainer'
import { createQuote } from './createQuote'
import { EmbarkBackground } from './EmbarkBackground'
import {
  resolveExternalInsuranceProviderProviderStatus,
  resolveExternalInsuranceProviderStartSession,
} from './externalInsuranceProvider'
import { resolveHouseInformation } from './houseInformation'
import { Landing } from './Landing'
import { LanguagePicker } from './LanguagePicker'
import { resolvePersonalInformation } from './personalInformation'

const EmbarkStyling = styled.div`
  height: 100%;
  background-color: ${colorsV2.gray};

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
`

interface EmbarkProps {
  data: any
  name: string
  baseUrl: string
  startPageLink?: string
}

const Embark: React.FunctionComponent<EmbarkProps> = (props) => {
  const history = useHistory()
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
  }, [currentPassage.id])

  return (
    <PassageContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 1 }}
      >
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
      </motion.div>
      <Passage
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
  language?: string
}

const ANGEL_DATA_QUERY = gql`
  query AngelStory($name: String!) {
    angelStory(name: $name) {
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
}

export const EmbarkRoot: React.FunctionComponent<EmbarkRootProps> = (props) => {
  const history = useHistory()
  const [data, setData] = React.useState<[string, any] | null>(null)
  const [initialStore, setInitialStore] = React.useState<null | {
    [key: string]: any
  }>()

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
        { query: ANGEL_DATA_QUERY, variables: { name: props.name } },
      )

      if (result.data && result.data.angelStory) {
        setData([props.name, JSON.parse(result.data.angelStory.content)])
      }
    })()
  }, [props.name])

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

  return (
    <EmbarkStyling>
      <Helmet>
        <title>{textKeys.STARTPAGE_PAGE_TITLE()}</title>
        <meta
          property="og:image"
          content="https://www.hedvig.com/new-member-assets/social/hedvig-hemforsakring.jpg"
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
      <EmbarkBackground />
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
                      personalInformationApi: resolvePersonalInformation,
                      houseInformation: resolveHouseInformation,
                      createQuote: createQuote(storageState),
                      externalInsuranceProviderProviderStatus: resolveExternalInsuranceProviderProviderStatus,
                      externalInsuranceProviderStartSession: resolveExternalInsuranceProviderStartSession,
                      track: (eventName, payload) => {
                        const castedWindow = window as any
                        if (castedWindow && castedWindow.analytics) {
                          castedWindow.analytics.track(eventName, payload)
                        }
                      },
                    }}
                    initialStore={initialStore}
                    onStoreChange={(store) => {
                      window.sessionStorage.setItem(
                        `embark-store-${encodeURIComponent(props.name!)}`,
                        JSON.stringify(store),
                      )
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

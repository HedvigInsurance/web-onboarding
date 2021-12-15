import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import {
  EmbarkProvider,
  Header,
  Passage,
  useEmbark,
} from '@hedviginsurance/embark'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router'

import { colorsV3 } from '@hedviginsurance/brand'
import gql from 'graphql-tag'
import Helmet from 'react-helmet-async'
import { apolloClient } from 'apolloClient'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { useTextKeys } from 'utils/textKeys'
import { PhoneNumber } from 'components/PhoneNumber/PhoneNumber'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import {
  useCreateOnboardingQuoteCartMutation,
  useAddCampaignCodeMutation,
} from 'data/graphql'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { CampaignCode } from 'utils/campaignCode'
import { pushToGTMDataLayer } from '../../utils/tracking/gtm'
import { StorageContainer } from '../../utils/StorageContainer'
import { createQuote } from './createQuote'
import {
  resolveExternalInsuranceProviderProviderStatus,
  resolveExternalInsuranceProviderStartSession,
} from './externalInsuranceProvider'
import { graphQLMutation, graphQLQuery } from './graphql'
import { resolveHouseInformation } from './houseInformation'
import { LanguagePicker } from './LanguagePicker'
import { resolvePersonalInformation } from './personalInformation'
import { resolveAddressAutocomplete } from './addressAutocompleteProvider'
import { SetupFailedModal } from './ErrorModal'

const EmbarkStyling = styled.div`
  height: 100%;
  color: ${colorsV3.gray900};

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
  background-color: ${colorsV3.gray100};
`

interface EmbarkProps {
  data: any
  name: string
  baseUrl: string
  startPageLink?: string
}

const Embark: React.FunctionComponent<EmbarkProps> = (props) => {
  const currentLocale = useCurrentLocale()

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

  const handleClickPhoneNumber = (status: 'opened' | 'closed') => {
    pushToGTMDataLayer({
      event: 'click_call_number',
      phoneNumberData: {
        path: history.location.pathname,
        status,
      },
    })
  }

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
                customTrailingContent={
                  currentLocale.phoneNumber ? (
                    <PhoneNumber
                      color="black"
                      onClick={(status) => handleClickPhoneNumber(status)}
                    />
                  ) : (
                    <LanguagePicker />
                  )
                }
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

const useCreateQuoteCartId = ({ skip = false }) => {
  const { isoLocale, apiMarket } = useCurrentLocale()

  const [
    createOnboardingQuoteCart,
    { data, error },
  ] = useCreateOnboardingQuoteCartMutation()

  const [addCampaignCode] = useAddCampaignCodeMutation()

  const createQuoteCart = useCallback(async () => {
    const result = await createOnboardingQuoteCart({
      variables: { market: apiMarket, locale: isoLocale },
    })
    const quoteCartId = result.data?.onboardingQuoteCart_create.id
    const savedCampaignCode = CampaignCode.get()

    if (quoteCartId && savedCampaignCode !== null) {
      try {
        await addCampaignCode({
          variables: {
            id: quoteCartId,
            code: savedCampaignCode,
          },
        })
      } catch {
        CampaignCode.remove()
      }
    }
  }, [createOnboardingQuoteCart, apiMarket, isoLocale, addCampaignCode])

  useEffect(() => {
    if (!skip) {
      createQuoteCart()
    }
  }, [skip, createQuoteCart])

  return {
    createQuoteCart,
    quoteCartId: data?.onboardingQuoteCart_create.id,
    error,
  }
}

export const EmbarkRoot: React.FunctionComponent<EmbarkRootProps> = (props) => {
  const history = useHistory()
  const [data, setData] = React.useState<[string, any] | null>(null)
  const [initialStore, setInitialStore] = React.useState<
    Record<string, string>
  >()
  const { isoLocale, path: pathLocale } = useCurrentLocale()

  const [isQuoteCartApiEnabled] = useFeature([Features.QUOTE_CART_API])
  const {
    createQuoteCart,
    quoteCartId,
    error: quoteCartIdError,
  } = useCreateQuoteCartId({
    skip: !isQuoteCartApiEnabled,
  })

  const textKeys = useTextKeys()

  const trackPassageData = (
    eventName: string,
    payload: Record<string, any>,
  ) => {
    const payloadObject = { ...payload }
    Object.keys(payloadObject).forEach(
      (key) => payloadObject[key] === undefined && delete payloadObject[key],
    )

    pushToGTMDataLayer({
      event: eventName,
      passageData: {
        originatedFromEmbarkStory: props.name,
        ...payloadObject,
      },
    })

    // Push data to Segment
    const castedWindow = window as any
    if (castedWindow && castedWindow.analytics) {
      castedWindow.analytics.track(eventName, {
        originatedFromEmbarkStory: props.name,
        ...payloadObject,
      })
    }
  }

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
          variables: { name: props.name, locale: isoLocale },
        },
      )

      if (result.data && result.data.angelStory) {
        setData([props.name, JSON.parse(result.data.angelStory.content)])
      }
    })()
  }, [props.name, isoLocale])

  React.useEffect(() => {
    if (!props.name || (isQuoteCartApiEnabled && !quoteCartId)) {
      return
    }

    const defaultStore: Record<string, string> = quoteCartId
      ? { quoteCartId }
      : {}

    const prevStore = window.sessionStorage.getItem(
      `embark-store-${encodeURIComponent(props.name)}`,
    )

    if (!prevStore) {
      setInitialStore(defaultStore)
      return
    }

    try {
      const parsedPrevStore = JSON.parse(prevStore)
      setInitialStore({ ...parsedPrevStore, ...defaultStore })
    } catch (err) {
      setInitialStore(defaultStore)
    }
  }, [props.name, isQuoteCartApiEnabled, quoteCartId])

  const redirectToOfferPage = () => {
    history.push(
      (props.language ? `/${props.language}` : '') + '/new-member/offer',
    )
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
            background-color: ${colorsV3.gray100};
          }
        `}
      />
      <AnimatePresence>
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
                    Offer: (quoteIds) => {
                      if (quoteIds.length > 0) {
                        storageState.session.setSession({
                          ...storageState.session.getSession(),
                          quoteIds,
                        })
                      }
                      redirectToOfferPage()
                    },
                    VariantedOffer: (quoteIds, selectedQuoteIds) => {
                      if (quoteIds.length > 0) {
                        storageState.session.setSession({
                          ...storageState.session.getSession(),
                          quoteIds,
                          selectedQuoteIds,
                        })
                      }
                      redirectToOfferPage()
                    },
                    QuoteCartOfferRedirect: (
                      quoteCartId,
                      selectedInsuranceTypes,
                    ) => {
                      const searchParams = new URLSearchParams()
                      selectedInsuranceTypes.forEach((insuranceType) => {
                        searchParams.append('type', insuranceType)
                      })

                      history.push(
                        `${pathLocale}/new-member/offer/${quoteCartId}?${searchParams.toString()}`,
                      )
                    },
                    MailingList: () => {
                      location.href = 'https://hedvigapp.typeform.com/to/xiTKWi'
                    },
                  }}
                  data={data[1]}
                  resolvers={{
                    graphqlQuery: graphQLQuery(storageState, isoLocale),
                    graphqlMutation: graphQLMutation(storageState, isoLocale),
                    personalInformationApi: resolvePersonalInformation,
                    houseInformation: resolveHouseInformation,
                    createQuote: createQuote(storageState, isoLocale),
                    addressAutocompleteQuery: resolveAddressAutocomplete,
                    externalInsuranceProviderProviderStatus: resolveExternalInsuranceProviderProviderStatus,
                    externalInsuranceProviderStartSession: resolveExternalInsuranceProviderStartSession,
                    track: trackPassageData,
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
                    if (
                      store.danishHomeContentsQuoteId &&
                      store.danishAccidentQuoteId
                    ) {
                      storageState.session.setSession({
                        ...storageState.session.getSession(),
                        quoteIds: [
                          store.danishHomeContentsQuoteId,
                          store.danishAccidentQuoteId,
                        ],
                      })
                    }
                    if (
                      store.danishHomeContentsQuoteId &&
                      store.danishAccidentQuoteId &&
                      store.danishTravelQuoteId
                    ) {
                      storageState.session.setSession({
                        ...storageState.session.getSession(),
                        quoteIds: [
                          store.danishHomeContentsQuoteId,
                          store.danishAccidentQuoteId,
                          store.danishTravelQuoteId,
                        ],
                      })
                    }
                  }}
                >
                  <Embark
                    baseUrl={props.baseUrl!}
                    data={data[1]}
                    name={props.name!}
                    startPageLink={props.language ? '/' + props.language : '/'}
                  />
                </EmbarkProvider>
              )}
            </StorageContainer>
          )}
        </motion.div>
      </AnimatePresence>

      <SetupFailedModal
        isVisible={quoteCartIdError !== undefined}
        onRetry={createQuoteCart}
      />
    </EmbarkStyling>
  )
}

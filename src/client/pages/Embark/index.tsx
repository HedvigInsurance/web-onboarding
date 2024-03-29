import styled from '@emotion/styled'
import {
  EmbarkProvider,
  Header,
  Passage,
  useEmbark,
} from '@hedviginsurance/embark'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router'

import { colorsV3 } from '@hedviginsurance/brand'
import gql from 'graphql-tag'
import { apolloClient } from 'apolloClient'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { CallCenterPhoneNumber } from 'components/CallCenterPhoneNumber/CallCenterPhoneNumber'
import { LanguagePicker } from 'components/LanguagePicker/LanguagePicker'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useAddCampaignCodeMutation } from 'data/graphql'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { CampaignCode } from 'utils/campaignCode'
import { EmbarkStory } from 'utils/embarkStory'
import { useOnboardingQuoteCartId } from 'utils/hooks/useOnboardingQuoteCartId'
import { pushToGTMDataLayer } from 'utils/tracking/gtm/dataLayer'
import { useTrackAbPurchaseFlowRedirect } from 'utils/tracking/hooks/useTrackAbPurchaseFlowRedirect'
import { StorageContainer } from '../../utils/StorageContainer'
import { createQuote } from './createQuote'
import { graphQLMutation, graphQLQuery } from './graphql'
import { resolveHouseInformation } from './houseInformation'
import { resolvePersonalInformation } from './personalInformation'
import { resolveAddressAutocomplete } from './addressAutocompleteProvider'

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

const Embark = (props: EmbarkProps) => {
  const currentLocale = useCurrentLocale()
  const [
    isCustomerServicePhoneNumberEnabled,
    isLanguagePickerClientSideNavigationEnabled,
  ] = useFeature([
    Features.CUSTOMER_SERVICE_PHONE_NUMBER,
    Features.LANGUAGE_PICKER_CLIENT_SIDE_NAVIGATION,
  ])

  useTrackAbPurchaseFlowRedirect()

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

  useEffect(() => {
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
                  isCustomerServicePhoneNumberEnabled &&
                  currentLocale.callCenter ? (
                    <CallCenterPhoneNumber
                      color="black"
                      onClick={handleClickPhoneNumber}
                    />
                  ) : (
                    <LanguagePicker
                      color="black"
                      performClientSideNavigation={
                        isLanguagePickerClientSideNavigationEnabled
                      }
                    />
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
            // Avoid iOS Safari going back to previous passage for after Insurely BankID redirect
            if (location.pathname.includes('/price-comparison')) {
              return
            }

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
  isUsingQuoteCart: boolean
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

const useInitQuoteCart = ({ skip = false }) => {
  const quoteCartId = useOnboardingQuoteCartId()
  const [addCampaignCode] = useAddCampaignCodeMutation()

  const initQuoteCart = useCallback(async () => {
    const savedCampaignCode = CampaignCode.get()

    if (savedCampaignCode !== null) {
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
  }, [addCampaignCode, quoteCartId])

  useEffect(() => {
    if (!skip) {
      initQuoteCart()
    }
  }, [skip, initQuoteCart])

  return quoteCartId
}

export const EmbarkRoot = (props: EmbarkRootProps) => {
  const history = useHistory()
  const [data, setData] = useState<[string, any] | null>(null)
  const [initialStore, setInitialStore] = useState<Record<string, string>>()
  const { isoLocale, path: pathLocale } = useCurrentLocale()

  const quoteCartId = useInitQuoteCart({
    skip: !props.isUsingQuoteCart,
  })

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
  }

  useEffect(() => {
    async function fetchAngelData() {
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
    }

    fetchAngelData()
  }, [props.name, isoLocale])

  useEffect(() => {
    if (!props.name) {
      return
    }

    const defaultStore: Record<string, string> = props.isUsingQuoteCart
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
  }, [props.name, props.isUsingQuoteCart, quoteCartId])

  useEffect(() => {
    if (props.name) EmbarkStory.set(props.name)
  }, [props.name])

  const redirectToOfferPage = () => {
    history.push(
      (props.language ? `/${props.language}` : '') + '/new-member/offer',
    )
  }

  return (
    <EmbarkStyling>
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
                        `/${pathLocale}/new-member/offer/${quoteCartId}?${searchParams.toString()}`,
                      )
                    },
                    MailingList: () => {
                      location.href = 'https://hedvigapp.typeform.com/to/xiTKWi'
                    },
                    Web: (path: string) => {
                      const cleanedPath = path.replace(/^\//, '')

                      location.href = `/${pathLocale}/${cleanedPath}`
                    },
                  }}
                  config={{
                    insurelyClientIds: {
                      HEDVIG_HOME:
                        window.hedvigClientConfig.insurelyHomeClientId,
                      HEDVIG_CAR: window.hedvigClientConfig.insurelyCarClientId,
                    },
                    logLevel:
                      window.hedvigClientConfig.appEnvironment === 'development'
                        ? 'debug'
                        : 'warn',
                  }}
                  data={data[1]}
                  resolvers={{
                    graphqlQuery: graphQLQuery(storageState, isoLocale),
                    graphqlMutation: graphQLMutation(storageState, isoLocale),
                    personalInformationApi: resolvePersonalInformation,
                    houseInformation: resolveHouseInformation,
                    createQuote: createQuote(storageState, isoLocale),
                    addressAutocompleteQuery: resolveAddressAutocomplete,
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
    </EmbarkStyling>
  )
}

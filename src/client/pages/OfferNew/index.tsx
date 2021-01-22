import { History } from 'history'
import { SemanticEvents } from 'quepasa'
import React, { useState, createContext } from 'react'
import { Redirect, useHistory, useRouteMatch } from 'react-router'
import { LoadingPage } from 'components/LoadingPage'
import { TopBar } from 'components/TopBar'
import {
  getLocaleIsoCode,
  useCurrentLocale,
  Market,
  useMarket,
} from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import {
  QuoteBundle,
  useQuoteBundleQuery,
  useRedeemedCampaignsQuery,
} from 'data/graphql'
import { SwitchSafetySection } from 'pages/OfferNew/SwitchSafetySection'
import { getOfferData } from 'pages/OfferNew/utils'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { useStorage } from 'utils/StorageContainer'
import { trackOfferGTM } from 'utils/tracking/gtm'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
import { Checkout } from './Checkout'
import { FaqSection } from './FaqSection'
import { Introduction } from './Introduction'
import { Perils } from './Perils'

const createToggleCheckout = (history: History<any>, locale?: string) => (
  isOpen: boolean,
) => {
  if (isOpen) {
    history.push(`/${locale}/new-member/sign`)
  } else {
    history.goBack()
  }
}

type DetailsModalState = {
  onClose: () => void
  onOpen: () => void
  isDetailsModalOpen: boolean
}
export const DetailsModalContext = createContext<DetailsModalState | undefined>(
  undefined,
)

export const useDetailsModalState = () => {
  const context = React.useContext(DetailsModalContext)
  if (context === undefined) {
    throw new Error(
      'useDetailsModalState must be used within a DetailsModalProvider',
    )
  }
  return context
}

export const OfferNew: React.FC = () => {
  const storage = useStorage()
  const currentLocale = useCurrentLocale()
  const localeIsoCode = getLocaleIsoCode(currentLocale)
  const currentMarket = useMarket()
  const variation = useVariation()
  const quoteIds = storage.session.getSession()?.quoteIds ?? []
  const { data: redeemedCampaignsData } = useRedeemedCampaignsQuery()
  const redeemedCampaigns = redeemedCampaignsData?.redeemedCampaigns ?? []
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const onClose = () => setIsDetailsModalOpen(false)
  const onOpen = () => setIsDetailsModalOpen(true)

  const { data, loading: loadingQuoteBundle, refetch } = useQuoteBundleQuery({
    variables: {
      input: {
        ids: [...quoteIds],
      },
      locale: localeIsoCode,
    },
  })

  const history = useHistory()
  const checkoutMatch = useRouteMatch(
    '/:locale(se-en|se|no-en|no|dk-en|dk)/new-member/sign',
  )
  const toggleCheckout = createToggleCheckout(history, currentLocale)

  if (quoteIds.length === 0) {
    return <Redirect to={`/${currentLocale}/new-member`} />
  }

  if (!loadingQuoteBundle && !data?.quoteBundle) {
    throw new Error(
      `No quote returned to show offer with (quoteIds=${quoteIds}).`,
    )
  }

  if (loadingQuoteBundle && !data?.quoteBundle) {
    return <LoadingPage />
  }

  const handleCheckoutToggle = (open: boolean) => {
    toggleCheckout(open)
  }

  const offerData = data?.quoteBundle
    ? getOfferData(data?.quoteBundle as QuoteBundle)
    : null

  if (offerData) {
    trackOfferGTM(
      'offer_created',
      offerData,
      redeemedCampaigns[0]?.incentive?.__typename === 'MonthlyCostDeduction',
    )
  }

  return (
    <DetailsModalContext.Provider
      value={{ isDetailsModalOpen, onClose, onOpen }}
    >
      <Page>
        <SessionTokenGuard>
          {![Variation.IOS, Variation.ANDROID].includes(variation!) && (
            <TopBar isTransparent />
          )}
          {offerData && (
            <>
              <TrackAction
                event={{
                  name: SemanticEvents.Ecommerce.CheckoutStarted,
                  properties: {
                    value: Number(offerData.cost.monthlyNet.amount),
                    currency: offerData.cost.monthlyNet.currency,
                    label: 'Offer',
                    ...getUtmParamsFromCookie(),
                  },
                }}
              >
                {({ track }) => (
                  <Introduction
                    offerData={offerData}
                    refetch={refetch as () => Promise<any>}
                    onCheckoutOpen={() => {
                      handleCheckoutToggle(true)
                      track()
                    }}
                  />
                )}
              </TrackAction>
              <Perils offerData={offerData} />
              {currentMarket !== Market.Dk && <SwitchSafetySection />}
              <FaqSection />
              <Checkout
                offerData={offerData}
                isOpen={checkoutMatch !== null}
                onClose={() => {
                  handleCheckoutToggle(false)
                }}
                refetch={refetch as () => Promise<any>}
              />
            </>
          )}
        </SessionTokenGuard>
      </Page>
    </DetailsModalContext.Provider>
  )
}

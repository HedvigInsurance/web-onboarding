import { TopBar } from 'components/TopBar'
import {
  getLocaleIsoCode,
  Market,
  useCurrentLocale,
  useMarket,
} from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { QuoteBundle, useQuoteBundleQuery } from 'data/graphql'
import { History } from 'history'
import { SwitchSafetySection } from 'pages/OfferNew/SwitchSafetySection'
import { TestimonialsSection } from 'pages/OfferNew/TestimonialsSection'
import { getOfferData } from 'pages/OfferNew/utils'
import { SemanticEvents } from 'quepasa'
import * as React from 'react'
import { Redirect, useHistory, useRouteMatch } from 'react-router'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { useStorage } from 'utils/StorageContainer'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking'
import { Checkout } from './Checkout'
import { Compare } from './Compare'
import { FaqSection } from './FaqSection'
import { Introduction } from './Introduction'
import { Perils } from './Perils/index'

const createToggleCheckout = (history: History<any>, locale?: string) => (
  isOpen: boolean,
) => {
  if (isOpen) {
    history.push((locale ? '/' + locale : '') + `/new-member/sign`)
  } else {
    history.goBack()
  }
}

export const OfferNew: React.FC = () => {
  const storage = useStorage()
  const quoteIds = storage.session.getSession()?.quoteIds ?? []
  const currentLocale = useCurrentLocale()
  const localeIsoCode = getLocaleIsoCode(currentLocale)
  const variation = useVariation()

  if (quoteIds.length === 0) {
    return (
      <Redirect to={`${currentLocale && '/' + currentLocale}/new-member`} />
    )
  }

  const { data, loading: loadingQuoteBundle, refetch } = useQuoteBundleQuery({
    variables: {
      input: {
        ids: [...quoteIds],
      },
      locale: localeIsoCode,
    },
  })

  const history = useHistory()
  const market = useMarket()
  const checkoutMatch = useRouteMatch('/:locale(en|no-en|no)?/new-member/sign')
  const toggleCheckout = createToggleCheckout(history, currentLocale)

  if (!loadingQuoteBundle && !data?.quoteBundle) {
    throw new Error(
      `No quote returned to show offer with (quoteIds=${quoteIds}).`,
    )
  }

  if (loadingQuoteBundle && !data?.quoteBundle) {
    return null
  }

  console.log(data?.quoteBundle)
  const offerData = getOfferData(data?.quoteBundle! as QuoteBundle)

  return (
    <Page>
      <SessionTokenGuard>
        {![Variation.IOS, Variation.ANDROID].includes(variation!) && <TopBar />}
        <TrackAction
          event={{
            name: SemanticEvents.Ecommerce.CheckoutStarted,
            properties: {
              value: Number(offerData.cost.monthlyNet.amount),
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
                toggleCheckout(true)
                track()
              }}
            />
          )}
        </TrackAction>
        <Perils offerData={offerData} />
        {market === Market.Se && (
          <Compare
            currentInsurer={offerData.quotes[0].currentInsurer || undefined}
          />
        )}
        ){market === Market.Se && <TestimonialsSection />}
        <SwitchSafetySection />
        <FaqSection />
        <Checkout
          offerData={offerData}
          isOpen={checkoutMatch !== null}
          onClose={() => toggleCheckout(false)}
          refetch={refetch as () => Promise<any>}
        />
      </SessionTokenGuard>
    </Page>
  )
}

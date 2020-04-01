import {
  Market,
  useCurrentLocale,
  useMarket,
} from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { Quote, QuoteBundle } from 'data/graphql'
import { useQuote } from 'data/useQuote'
import { useQuoteBundle } from 'data/useQuoteBundle'
import { History } from 'history'
import { TopBar } from 'new-components/TopBar'
import { SwitchSafetySection } from 'pages/OfferNew/SwitchSafetySection'
import { TestimonialsSection } from 'pages/OfferNew/TestimonialsSection'
import { getOfferData } from 'pages/OfferNew/utils'
import { SemanticEvents } from 'quepasa'
import * as React from 'react'
import { Redirect, useHistory, useRouteMatch } from 'react-router'
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

type UseOfferQuoteReturnTuple = [
  Quote | QuoteBundle | undefined,
  {
    loading: boolean
    refetch: () => Promise<any>
  },
]

const useOfferQuote = (
  quoteIds: ReadonlyArray<string>,
  bundledQuoteIds: ReadonlyArray<string>,
): UseOfferQuoteReturnTuple => {
  if (quoteIds.length === 0) {
    return useQuoteBundle(bundledQuoteIds)
  }
  return useQuote(quoteIds[0])
}

export const OfferNew: React.FC = () => {
  const storage = useStorage()
  const quoteIds = storage.session.getSession()?.quoteIds ?? []
  const bundledQuoteIds = storage.session.getSession()?.bundledQuoteIds ?? []
  const currentLocale = useCurrentLocale()

  if (quoteIds.length === 0 && bundledQuoteIds.length === 0) {
    return (
      <Redirect to={`${currentLocale && '/' + currentLocale}/new-member`} />
    )
  }
  const [
    offerQuoteBeingFetched,
    { loading: loadingOfferQuote, refetch },
  ] = useOfferQuote(quoteIds, bundledQuoteIds)

  const history = useHistory()
  const market = useMarket()
  const checkoutMatch = useRouteMatch('/:locale(en|no-en|no)?/new-member/sign')
  const toggleCheckout = createToggleCheckout(history, currentLocale)

  if (!loadingOfferQuote && offerQuoteBeingFetched === undefined) {
    throw new Error(
      `No quote returned to show offer with (quoteIds=${quoteIds}, bundledQuoteIds=${bundledQuoteIds}).`,
    )
  }

  if (loadingOfferQuote && offerQuoteBeingFetched === undefined) {
    return null
  }

  const offerData = getOfferData(offerQuoteBeingFetched!)

  return (
    <Page>
      <SessionTokenGuard>
        <TopBar />
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
        {offerData.quotes.map((quote) => {
          return (
            <>
              <Perils contractType={quote.contractType} />
              {market === Market.Se && (
                <Compare currentInsurer={quote.currentInsurer || undefined} />
              )}
            </>
          )
        })}
        {market === Market.Se && <TestimonialsSection />}
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

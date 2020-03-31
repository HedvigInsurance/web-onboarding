import {
  Market,
  useCurrentLocale,
  useMarket,
} from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { CompleteQuote } from 'data/graphql'
import { useQuote } from 'data/useQuote'
import { History } from 'history'
import { TopBar } from 'new-components/TopBar'
import { SwitchSafetySection } from 'pages/OfferNew/SwitchSafetySection'
import { TestimonialsSection } from 'pages/OfferNew/TestimonialsSection'
import { getInsuranceType } from 'pages/OfferNew/utils'
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

export const OfferNew: React.FC = () => {
  const storage = useStorage()
  const quoteIds = storage.session.getSession()?.quoteIds ?? []

  const currentLocale = useCurrentLocale()
  const history = useHistory()
  const market = useMarket()
  const checkoutMatch = useRouteMatch('/:locale(en|no-en|no)?/new-member/sign')
  const toggleCheckout = createToggleCheckout(history, currentLocale)

  if (quoteIds.length === 0) {
    return (
      <Redirect to={`${currentLocale && '/' + currentLocale}/new-member`} />
    )
  }
  const quoteId = quoteIds[0]
  const [quote, { loading: loadingQuotes, refetch }] = useQuote(quoteId)

  if (!loadingQuotes && quote === undefined) {
    throw new Error(`No quote returned (quoteId=${quoteId}).`)
  }

  const completeQuote = quote as CompleteQuote

  return loadingQuotes && quote === undefined ? null : (
    <Page>
      <SessionTokenGuard>
        <TopBar />
        <TrackAction
          event={{
            name: SemanticEvents.Ecommerce.CheckoutStarted,
            properties: {
              value: Number(completeQuote.insuranceCost.monthlyNet.amount),
              label: 'Offer',
              ...getUtmParamsFromCookie(),
            },
          }}
        >
          {({ track }) => (
            <Introduction
              firstQuote={completeQuote}
              refetch={refetch as () => Promise<any>}
              onCheckoutOpen={() => {
                toggleCheckout(true)
                track()
              }}
            />
          )}
        </TrackAction>
        <Perils insuranceType={getInsuranceType(completeQuote)} />
        {market === Market.Se && (
          <Compare currentInsurer={completeQuote.currentInsurer || undefined} />
        )}
        {market === Market.Se && <TestimonialsSection />}
        <SwitchSafetySection />
        <FaqSection />
        <Checkout
          firstQuote={completeQuote}
          isOpen={checkoutMatch !== null}
          onClose={() => toggleCheckout(false)}
          refetch={refetch as () => Promise<any>}
        />
      </SessionTokenGuard>
    </Page>
  )
}

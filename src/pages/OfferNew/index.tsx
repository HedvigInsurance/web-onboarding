import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { CompleteQuote } from 'data/graphql'
import { useMultipleQuotes } from 'data/useMultipleQuotes'
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
  const [quotes, { loading: loadingQuotes, refetch }] = useMultipleQuotes(
    quoteIds,
  )
  const history = useHistory()
  const currentLocale = useCurrentLocale()
  const checkoutMatch = useRouteMatch('/:locale(en|no/en|no)?/new-member/sign')
  const toggleCheckout = createToggleCheckout(history, currentLocale)

  if (quoteIds.length === 0) {
    return (
      <Redirect to={`${currentLocale && '/' + currentLocale}/new-member`} />
    )
  }

  if (!loadingQuotes && quoteIds.length !== quotes.length) {
    throw new Error(
      `Mismatching number of quote ids in session (${quoteIds.length}) and actual returned quotes (${quotes.length}).`,
    )
  }

  const firstQuote = quotes[0] as CompleteQuote

  return loadingQuotes ? null : (
    <Page>
      <SessionTokenGuard>
        <TopBar />
        <TrackAction
          event={{
            name: SemanticEvents.Ecommerce.CheckoutStarted,
            properties: {
              value: Number(firstQuote.insuranceCost.monthlyNet.amount),
              label: 'Offer',
              ...getUtmParamsFromCookie(),
            },
          }}
        >
          {({ track }) => (
            <Introduction
              firstQuote={firstQuote}
              refetch={refetch as () => Promise<any>}
              onCheckoutOpen={() => {
                toggleCheckout(true)
                track()
              }}
            />
          )}
        </TrackAction>
        <Perils insuranceType={getInsuranceType(firstQuote)} />
        <Compare currentInsurer={firstQuote.currentInsurer || undefined} />
        <TestimonialsSection />
        <SwitchSafetySection />
        <FaqSection />
        <Checkout
          firstQuote={firstQuote}
          isOpen={checkoutMatch !== null}
          onClose={() => toggleCheckout(false)}
          refetch={refetch as () => Promise<any>}
        />
      </SessionTokenGuard>
    </Page>
  )
}

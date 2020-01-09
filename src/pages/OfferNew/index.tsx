import { useCurrentLanguage } from 'components/utils/CurrentLanguage'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { useMemberOfferQuery } from 'generated/graphql'
import { History } from 'history'
import { TopBar } from 'new-components/TopBar'
import { SemanticEvents } from 'quepasa'
import * as React from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking'
import { Checkout } from './Checkout'
import { Compare } from './Compare'
import { Introduction } from './Introduction'
import { Perils } from './Perils/index'
import { isOffer } from './utils'
import { TestimonialsSection } from 'pages/OfferNew/TestimonialsSection'
import { SwitchSafetySection } from 'pages/OfferNew/SwitchSafetySection'

const createToggleCheckout = (history: History<any>, language?: string) => (
  isOpen: boolean,
) => {
  if (isOpen) {
    history.push((language ? '/' + language : '') + `/new-member/sign`)
  } else {
    history.goBack()
  }
}

export const OfferNew: React.FC = () => {
  const { data, loading, error, refetch } = useMemberOfferQuery()
  const history = useHistory()
  const currentLanguage = useCurrentLanguage()
  const checkoutMatch = useRouteMatch('/:language(en)?/new-member/sign')
  const toggleCheckout = createToggleCheckout(history, currentLanguage)

  return !loading && !error && data && isOffer(data) ? (
    <Page>
      <SessionTokenGuard>
        <TopBar />
        <TrackAction
          event={{
            name: SemanticEvents.Ecommerce.CheckoutStarted,
            properties: {
              value: Number(
                data.lastQuoteOfMember.insuranceCost.monthlyNet.amount,
              ),
              label: 'Offer',
              ...getUtmParamsFromCookie(),
            },
          }}
        >
          {({ track }) => (
            <Introduction
              offer={data}
              refetch={refetch as () => Promise<any>}
              onCheckoutOpen={() => {
                toggleCheckout(true)
                track()
              }}
            />
          )}
        </TrackAction>
        <Perils offer={data} />
        <Compare
          currentInsurer={data.lastQuoteOfMember.currentInsurer || undefined}
        />
        <TestimonialsSection />
        <SwitchSafetySection />
        <SwitchSafetySection />
        <Checkout
          offer={data}
          isOpen={checkoutMatch !== null}
          onClose={() => toggleCheckout(false)}
        />
      </SessionTokenGuard>
    </Page>
  ) : null
}

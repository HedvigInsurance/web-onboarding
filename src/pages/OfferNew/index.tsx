import { useCurrentLanguage } from 'components/utils/CurrentLanguage'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { useMemberOfferQuery } from 'generated/graphql'
import { History } from 'history'
import { TopBar } from 'new-components/TopBar'
import { SwitchSafetySection } from 'pages/OfferNew/SwitchSafetySection'
import { TestimonialsSection } from 'pages/OfferNew/TestimonialsSection'
import { SemanticEvents } from 'quepasa'
import * as React from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking'
import { Checkout } from './Checkout'
import { Compare } from './Compare'
import { FaqSection } from './FaqSection'
import { Introduction } from './Introduction'
import { Perils } from './Perils/index'
import { isOffer } from './utils'

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
  const variation = useVariation()

  return !loading && !error && data && isOffer(data) ? (
    <Page>
      <SessionTokenGuard>
        {![Variation.IOS, Variation.ANDROID].includes(variation!) && <TopBar />}
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
        <FaqSection />
        <Checkout
          offer={data}
          isOpen={checkoutMatch !== null}
          onClose={() => toggleCheckout(false)}
          refetch={refetch as () => Promise<any>}
        />
      </SessionTokenGuard>
    </Page>
  ) : null
}

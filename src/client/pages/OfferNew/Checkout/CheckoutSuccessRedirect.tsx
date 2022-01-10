import React from 'react'
import { SemanticEvents } from 'quepasa'
import { Mount } from 'react-lifecycle-components'
import { Redirect } from 'react-router-dom'
import { OfferData } from 'pages/OfferNew/types'
import {
  getContractType,
  getUtmParamsFromCookie,
  TrackAction,
} from 'utils/tracking/tracking'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

type Props = {
  offerData: OfferData
}

export const CheckoutSuccessRedirect: React.FC<Props> = ({ offerData }) => {
  const { path: localePath } = useCurrentLocale()

  return (
    <TrackAction
      event={{
        name: SemanticEvents.Ecommerce.OrderCompleted,
        properties: {
          category: 'web-onboarding-steps',
          currency: offerData.cost.monthlyNet.currency,
          total: Number(offerData.cost.monthlyNet.amount),
          products: [
            {
              name: getContractType(offerData),
            },
          ],
          ...getUtmParamsFromCookie(),
        },
      }}
    >
      {({ track: trackAction }) => (
        <Mount on={trackAction}>
          <Redirect to={`/${localePath}/new-member/connect-payment`} />
        </Mount>
      )}
    </TrackAction>
  )
}

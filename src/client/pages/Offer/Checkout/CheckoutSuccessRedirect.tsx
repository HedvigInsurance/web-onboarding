import React from 'react'
import { SemanticEvents } from 'quepasa'
import { Mount } from 'react-lifecycle-components'
import { Redirect } from 'react-router-dom'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { OfferData } from 'pages/OfferNew/types'
import {
  getContractType,
  getUtmParamsFromCookie,
  TrackAction,
} from 'utils/tracking/tracking'

type Props = {
  offerData: OfferData | null
}

export const CheckoutSuccessRedirect = ({ offerData }: Props) => {
  const { path } = useCurrentLocale()

  if (!offerData) return null

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
          <Redirect to={`/${path}/new-member/connect-payment/`} />
        </Mount>
      )}
    </TrackAction>
  )
}

import React, { useEffect } from 'react'
import { SemanticEvents } from 'quepasa'
import { Redirect } from 'react-router-dom'
import { OfferData } from 'pages/OfferNew/types'
import {
  getContractType,
  getUtmParamsFromCookie,
} from 'utils/tracking/gtm/helpers'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTrackSegmentEvent } from 'utils/tracking/hooks/useTrackSegmentEvent'

type Props = {
  offerData: OfferData
}

export const CheckoutSuccessRedirect: React.FC<Props> = ({ offerData }) => {
  const { path: localePath } = useCurrentLocale()
  const trackSegmentEvent = useTrackSegmentEvent()
  useEffect(() => {
    trackSegmentEvent({
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
    })
  }, [trackSegmentEvent, offerData])
  return <Redirect to={`/${localePath}/new-member/connect-payment`} />
}

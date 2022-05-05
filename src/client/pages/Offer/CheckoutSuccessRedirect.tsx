import React, { useEffect } from 'react'
import { SemanticEvents } from 'quepasa'
import { Redirect } from 'react-router-dom'
import { getUtmParamsFromCookie } from 'utils/tracking/gtm/helpers'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { QuoteBundle } from 'data/graphql'
import { quoteBundleTrackingContractType } from 'api/quoteBundleTrackingContractType'
import { useTrackSegmentEvent } from 'utils/tracking/hooks/useTrackSegmentEvent'

type Props = {
  bundle: QuoteBundle
  connectPayment?: boolean
}

export const CheckoutSuccessRedirect: React.FC<Props> = ({
  bundle,
  connectPayment = true,
}) => {
  const { path: localePath } = useCurrentLocale()
  const trackSegmentEvent = useTrackSegmentEvent()
  useEffect(() => {
    trackSegmentEvent({
      name: SemanticEvents.Ecommerce.OrderCompleted,
      properties: {
        category: 'web-onboarding-steps',
        currency: bundle.bundleCost.monthlyNet.currency,
        total: Number(bundle.bundleCost.monthlyNet.amount),
        products: [
          {
            name: quoteBundleTrackingContractType(bundle),
          },
        ],
        ...getUtmParamsFromCookie(),
      },
    })
  }, [trackSegmentEvent, bundle])
  return connectPayment ? (
    <Redirect to={`/${localePath}/new-member/connect-payment`} />
  ) : (
    <Redirect to={`/${localePath}/new-member/download`} />
  )
}

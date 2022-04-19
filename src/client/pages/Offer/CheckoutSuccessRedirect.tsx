import React from 'react'
import { SemanticEvents } from 'quepasa'
import { Mount } from 'react-lifecycle-components'
import { Redirect } from 'react-router-dom'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { QuoteBundle } from 'data/graphql'
import { quoteBundleTrackingContractType } from 'api/quoteBundleTrackingContractType'

type Props = {
  bundle: QuoteBundle
  connectPayment?: boolean
}

export const CheckoutSuccessRedirect: React.FC<Props> = ({
  bundle,
  connectPayment = true,
}) => {
  const { path: localePath } = useCurrentLocale()

  return (
    <TrackAction
      event={{
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
      }}
    >
      {({ track: trackAction }) => (
        <Mount on={trackAction}>
          {connectPayment ? (
            <Redirect to={`/${localePath}/new-member/connect-payment`} />
          ) : (
            <Redirect to={`/${localePath}/new-member/download`} />
          )}
        </Mount>
      )}
    </TrackAction>
  )
}

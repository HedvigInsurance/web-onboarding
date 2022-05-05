import { useCallback } from 'react'
import { QuoteCartDocument, QuoteCartQuery } from 'data/graphql'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import {
  getSelectedBundleVariant,
  getCampaign,
} from 'api/quoteCartQuerySelectors'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { apolloClient } from 'apolloClient'
import { useVariation } from 'utils/hooks/useVariation'
import {
  trackSignedCustomerEvent,
  TrackSignedEventParams,
} from 'utils/tracking/gtm/trackSignedCustomerEvent'

export const useTrackSignedCustomerEvent = () => {
  const { isoLocale } = useCurrentLocale()

  const variation = useVariation()

  const { quoteCartId } = useQuoteCartIdFromUrl()

  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()

  const trackEventHandler = useCallback(
    (memberId: TrackSignedEventParams['memberId']) => {
      const trackEventCallback = async () => {
        const quoteCartQueryData = await apolloClient!.runQuery<QuoteCartQuery>(
          {
            query: QuoteCartDocument,
            variables: {
              id: quoteCartId,
              locale: isoLocale,
            },
          },
        )

        const selectedBundleVariant = getSelectedBundleVariant(
          quoteCartQueryData,
          selectedInsuranceTypes,
        )

        if (selectedBundleVariant) {
          trackSignedCustomerEvent({
            variation,
            campaignCode: getCampaign(quoteCartQueryData)?.code,
            isDiscountMonthlyCostDeduction:
              getCampaign(quoteCartQueryData)?.incentive?.__typename ===
              'MonthlyCostDeduction',
            memberId,
            bundle: selectedBundleVariant.bundle,
            quoteCartId,
          })
        }
      }
      if (apolloClient && quoteCartId) {
        trackEventCallback()
      }
    },
    [quoteCartId, isoLocale, selectedInsuranceTypes, variation],
  )

  return trackEventHandler
}

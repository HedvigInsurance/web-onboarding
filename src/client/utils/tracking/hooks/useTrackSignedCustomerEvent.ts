import { useCallback } from 'react'
import { QuoteCartDocument, QuoteCartQuery } from 'data/graphql'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { getSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import {
  getSelectedBundleVariant,
  getCampaign,
} from 'api/quoteCartQuerySelectors'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { apolloClient, ApolloClientUtils } from 'apolloClient'
import { getCurrentVariation } from 'utils/hooks/useVariation'
import {
  trackSignedCustomerEvent,
  TrackSignedEventParams,
} from 'utils/tracking/gtm/trackSignedCustomerEvent'

export const useTrackSignedCustomerEvent = () => {
  const { isoLocale } = useCurrentLocale()

  const { quoteCartId } = useQuoteCartIdFromUrl()

  const trackEventHandler = useCallback(
    ({
      memberId,
      ...restParams
    }: Partial<TrackSignedEventParams> &
      Pick<TrackSignedEventParams, 'memberId'>) => {
      const trackEventCallback = async (apolloClient: ApolloClientUtils) => {
        const quoteCartQueryData = await apolloClient.runQuery<QuoteCartQuery>({
          query: QuoteCartDocument,
          variables: {
            id: quoteCartId,
            locale: isoLocale,
          },
        })

        const selectedBundleVariant = getSelectedBundleVariant(
          quoteCartQueryData,
          getSelectedInsuranceTypes(),
        )

        if (selectedBundleVariant) {
          trackSignedCustomerEvent({
            variation: getCurrentVariation(),
            campaignCode: getCampaign(quoteCartQueryData)?.code,
            isDiscountMonthlyCostDeduction:
              getCampaign(quoteCartQueryData)?.incentive?.__typename ===
              'MonthlyCostDeduction',
            memberId,
            bundle: selectedBundleVariant.bundle,
            quoteCartId,
            ...restParams,
          })
        }
      }
      if (apolloClient && quoteCartId) {
        trackEventCallback(apolloClient)
      }
    },
    [quoteCartId, isoLocale],
  )

  return trackEventHandler
}

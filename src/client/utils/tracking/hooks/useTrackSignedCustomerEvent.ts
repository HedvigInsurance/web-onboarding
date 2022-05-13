import { useCallback } from 'react'
import { QuoteCartDocument, QuoteCartQuery } from 'data/graphql'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import {
  getSelectedBundleVariant,
  getCampaign,
  hasMonthlyCostDeduction,
} from 'api/quoteCartQuerySelectors'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { apolloClient, ApolloClientUtils } from 'apolloClient'
import { useVariation } from 'utils/hooks/useVariation'
import {
  trackSignedCustomerEvent,
  TrackSignedEventParams,
} from 'utils/tracking/gtm/trackSignedCustomerEvent'

export const useTrackSignedCustomerEvent = () => {
  const { isoLocale, adTractionConfig } = useCurrentLocale()

  const variation = useVariation()

  const { quoteCartId } = useQuoteCartIdFromUrl()

  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()

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
          selectedInsuranceTypes,
        )

        if (selectedBundleVariant) {
          trackSignedCustomerEvent({
            variation,
            campaignCode: getCampaign(quoteCartQueryData)?.code,
            isDiscountMonthlyCostDeduction: hasMonthlyCostDeduction(
              quoteCartQueryData,
            ),
            memberId,
            bundle: selectedBundleVariant.bundle,
            quoteCartId,
            adTractionConfig,
            ...restParams,
          })
        }
      }
      if (apolloClient && quoteCartId) {
        trackEventCallback(apolloClient)
      }
    },
    [
      quoteCartId,
      isoLocale,
      selectedInsuranceTypes,
      variation,
      adTractionConfig,
    ],
  )

  return trackEventHandler
}

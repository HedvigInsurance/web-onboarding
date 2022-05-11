import { useCallback } from 'react'
import { QuoteCartDocument, QuoteCartQuery } from 'data/graphql'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import {
  getMonthlyCostDeductionIncentive,
  getSelectedBundleVariant,
} from 'api/quoteCartQuerySelectors'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { apolloClient, ApolloClientUtils } from 'apolloClient'

import {
  EventParameters,
  trackOfferEvent,
} from 'utils/tracking/gtm/trackOfferEvent'

export const useTrackOfferEvent = () => {
  const { isoLocale } = useCurrentLocale()

  const { quoteCartId } = useQuoteCartIdFromUrl()

  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()

  const trackEventHandler = useCallback(
    ({ eventName, options = {} }: EventParameters) => {
      const trackEventCallback = async (apolloClient: ApolloClientUtils) => {
        const quoteCartQueryData = await apolloClient.runQuery<QuoteCartQuery>({
          query: QuoteCartDocument,
          variables: {
            id: quoteCartId,
            locale: isoLocale,
          },
        })
        const isReferralCodeUsed =
          getMonthlyCostDeductionIncentive(quoteCartQueryData) !== undefined
        const selectedBundleVariant = getSelectedBundleVariant(
          quoteCartQueryData,
          selectedInsuranceTypes,
        )

        if (selectedBundleVariant) {
          trackOfferEvent(
            eventName,
            selectedBundleVariant.bundle,
            isReferralCodeUsed,
            {
              quoteCartId,
              ...options,
            },
          )
        }
      }
      if (apolloClient && quoteCartId) {
        trackEventCallback(apolloClient)
      }
    },
    [quoteCartId, isoLocale, selectedInsuranceTypes],
  )

  return trackEventHandler
}

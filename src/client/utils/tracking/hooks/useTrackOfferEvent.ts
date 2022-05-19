import { useCallback } from 'react'
import { QuoteCartDocument, QuoteCartQuery } from 'data/graphql'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { getSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import {
  getSelectedBundleVariant,
  hasMonthlyCostDeduction,
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

        const bundle = getSelectedBundleVariant(
          quoteCartQueryData,
          getSelectedInsuranceTypes(),
        )?.bundle

        if (bundle) {
          trackOfferEvent(
            eventName,
            bundle,
            hasMonthlyCostDeduction(quoteCartQueryData),
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
    [quoteCartId, isoLocale],
  )

  return trackEventHandler
}

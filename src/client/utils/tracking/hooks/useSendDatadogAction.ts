import { datadogRum } from '@datadog/browser-rum'
import { useCallback } from 'react'
import { getSelectedBundleVariant } from 'api/quoteCartQuerySelectors'
import { QuoteCartDocument, QuoteCartQuery } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { apolloClient } from 'apolloClient'

export const useSendDatadogAction = () => {
  const { apiMarket, isoLocale } = useCurrentLocale()
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const [insuranceTypes] = useSelectedInsuranceTypes()

  return useCallback(
    (eventName: string) => {
      const data = apolloClient?.client.readQuery({
        query: QuoteCartDocument,
        variables: { id: quoteCartId, locale: isoLocale },
      })

      const variant = getSelectedBundleVariant(
        data as QuoteCartQuery,
        insuranceTypes,
      )

      datadogRum.addAction(eventName, {
        quoteCartId,
        typeOfContract: variant?.bundle.quotes
          .map((quote) => quote.typeOfContract)
          .join('-'),
        market: apiMarket,
      })
    },
    [quoteCartId, apiMarket, isoLocale, insuranceTypes],
  )
}

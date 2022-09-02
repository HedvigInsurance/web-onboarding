import { useCallback } from 'react'
import { getSelectedBundleVariant } from 'api/quoteCartQuerySelectors'
import { useQuoteCartQuery } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import { getQuoteIdsFromBundleVariant } from 'pages/Offer/utils'

type Params = { quoteCartId: string }

export const useFetchSelectedQuoteIds = ({ quoteCartId }: Params) => {
  const { isoLocale } = useCurrentLocale()
  const [insuranceTypes] = useSelectedInsuranceTypes()

  const { refetch: refetchQuoteCart } = useQuoteCartQuery({
    variables: { id: quoteCartId, locale: isoLocale },
  })

  return useCallback(async () => {
    const { data } = await refetchQuoteCart()

    const bundleVariant = getSelectedBundleVariant(data, insuranceTypes)

    if (bundleVariant === undefined) {
      throw new Error('Can not determined selected quotes')
    }

    return getQuoteIdsFromBundleVariant(bundleVariant)
  }, [refetchQuoteCart, insuranceTypes])
}

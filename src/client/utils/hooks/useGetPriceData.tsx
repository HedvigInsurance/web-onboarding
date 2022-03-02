import { useParams } from 'react-router'
import { usePriceQuery } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

export const useGetPriceData = () => {
  const { isoLocale } = useCurrentLocale()

  const { id: quoteCartId } = useParams<{ id: string }>()
  const { data, error } = usePriceQuery({
    variables: {
      id: quoteCartId,
      locale: isoLocale,
    },
  })
  const quoteBundle = data?.quoteCart.bundle

  if (error || !quoteBundle) {
    return null
  }

  const quotes = quoteBundle.quotes
  const totalBundleCost = quoteBundle.bundleCost.monthlyNet.amount
  const discount = quoteBundle.bundleCost.monthlyDiscount.amount
  const currency = quoteBundle.quotes[0].price.currency
  const campaignName = data?.quoteCart?.campaign?.displayValue

  return {
    data: {
      quotes,
      totalBundleCost,
      discount,
      currency,
      campaignName,
    },
    error,
    isLoading: data === null,
  }
}

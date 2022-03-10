import { useParams } from 'react-router-dom'
import { useQuoteCartQuery } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { getMainQuote } from 'api/quoteBundleSelectors'
import { getSelectedBundleVariant } from 'api/quoteCartQuerySelectors'
import { PriceData } from 'src/client/pages/Checkout/shared/types'
import { useSelectedInsuranceTypes } from './useSelectedInsuranceTypes'

export const useQuoteCartData = () => {
  const { id: quoteCartId } = useParams<{ id: string }>()
  const { isoLocale } = useCurrentLocale()
  const { data, loading, error } = useQuoteCartQuery({
    variables: { id: quoteCartId, locale: isoLocale },
  })
  console.log(data)

  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()
  const selectedQuoteBundle = getSelectedBundleVariant(
    data,
    selectedInsuranceTypes,
  )
  if (!selectedQuoteBundle) return null

  const prices = selectedQuoteBundle?.bundle.quotes.map((item) => {
    return { displayName: item.displayName, price: item.price.amount }
  })

  const mainQuote = getMainQuote(selectedQuoteBundle.bundle)

  const getPriceData = (): PriceData => {
    return {
      prices: prices,
      discount: selectedQuoteBundle.bundle.bundleCost.monthlyDiscount.amount,
      currency: selectedQuoteBundle.bundle.bundleCost.monthlyNet.currency,
      totalBundleCost: selectedQuoteBundle.bundle.bundleCost.monthlyNet.amount,
      campaignName: data?.quoteCart.campaign?.displayValue,
    }
  }

  const quoteDetails = mainQuote.quoteDetails

  const userDetails = {
    firstName: mainQuote.firstName ?? undefined,
    lastName: mainQuote.lastName,
    email: mainQuote.email,
  }

  return {
    priceData: getPriceData(),
    quoteDetails: quoteDetails,
    userDetails: userDetails,
    loading,
    error,
  }
}

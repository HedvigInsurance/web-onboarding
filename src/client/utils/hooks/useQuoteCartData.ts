import { useParams } from 'react-router-dom'
import { useQuoteCartQuery } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { getMainQuote } from 'src/client/api/quoteBundleSelectors'

// interface userData {
//   firstName: string | undefined
//   lastName: string | null | undefined
//   email: string | null | undefined
// }

export const useQuoteCartData = () => {
  const { id: quoteCartId } = useParams<{ id: string }>()
  const { isoLocale } = useCurrentLocale()

  const { data, loading, error } = useQuoteCartQuery({
    variables: {
      id: quoteCartId,
      locale: isoLocale,
    },
  })

  console.log(data)
  // get bundle based on selectedBundleVariant from Offer
  const bundle = data?.quoteCart.bundle?.possibleVariations[0].bundle
  const prices = bundle?.quotes.map((item) => {
    return { displayName: item.displayName, price: item.price.amount }
  })

  if (!bundle) {
    return null
  }
  // const mainQuote = getMainQuote()

  const priceData = {
    prices: prices,
    discount: bundle?.bundleCost.monthlyDiscount.amount,
    currency: bundle?.bundleCost.monthlyNet.currency,
    totalBundleCost: bundle?.bundleCost.monthlyNet.amount,
    campaignName: data?.quoteCart.campaign?.displayValue,
  }

  const quoteDetails =
    data?.quoteCart.bundle?.possibleVariations[0].bundle.quotes[0].quoteDetails

  // const userDetails: userData = {
  //   // firstName: mainQuote.firstName ?? undefined,
  //   // lastName: mainQuote.lastName,
  //   // email: mainQuote.email,
  // }

  console.log(priceData)

  return {
    quoteCartQueryData: data,
    priceData: priceData,
    quoteDetails: quoteDetails,
    userDetails: '',
    isLoadingQuoteCart: loading,
    quoteCartError: error,
  }
}

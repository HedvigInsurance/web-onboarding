import { CreateQuoteBundleMutation, QuoteBundleVariant } from 'data/graphql'
import { getBundleVariantFromInsuranceTypesWithFallback } from 'pages/OfferNew/utils'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'

export function getSelectedBundleVariant(
  quoteBundleMutation: CreateQuoteBundleMutation | null | undefined,
  selectedInsuranceTypes: InsuranceType[],
) {
  if (
    quoteBundleMutation?.quoteCart_createQuoteBundle.__typename !== 'QuoteCart'
  ) {
    return undefined
  }

  const bundleVariants = (quoteBundleMutation?.quoteCart_createQuoteBundle
    ?.bundle?.possibleVariations ?? []) as Array<QuoteBundleVariant>

  if (!bundleVariants.length) return undefined

  return getBundleVariantFromInsuranceTypesWithFallback(
    bundleVariants,
    selectedInsuranceTypes,
  )
}

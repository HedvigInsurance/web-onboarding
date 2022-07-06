import {
  CreateQuoteBundleMutation,
  QuoteBundleVariant,
  TypeOfContract,
} from 'data/graphql'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
import { getBundleVariantFromInsuranceTypesWithFallback } from '../pages/Offer/utils'

export function getSelectedBundleVariant(
  quoteBundleMutation: CreateQuoteBundleMutation | null | undefined,
  selectedInsuranceTypes: InsuranceType[] | TypeOfContract[],
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

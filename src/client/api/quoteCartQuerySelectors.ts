import { QuoteCartQuery, QuoteBundleVariant } from 'data/graphql'
import { getBundleVariantFromInsuranceTypesWithFallback } from 'pages/OfferNew/utils'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'

export function getSelectedBundleVariant(
  quoteCartQuery: QuoteCartQuery | undefined,
  selectedInsuranceTypes: InsuranceType[],
) {
  const bundleVariants = (quoteCartQuery?.quoteCart?.bundle
    ?.possibleVariations ?? []) as Array<QuoteBundleVariant>

  if (!bundleVariants.length) return undefined

  return getBundleVariantFromInsuranceTypesWithFallback(
    bundleVariants,
    selectedInsuranceTypes,
  )
}

export function getPossibleVariations(
  quoteCartQuery: QuoteCartQuery | undefined,
) {
  return (quoteCartQuery?.quoteCart?.bundle?.possibleVariations ?? []) as Array<
    QuoteBundleVariant
  >
}

export function getCampaign(quoteCartQuery: QuoteCartQuery | undefined) {
  return quoteCartQuery?.quoteCart.campaign ?? undefined
}

export function getCheckoutStatus(quoteCartQuery: QuoteCartQuery | undefined) {
  return quoteCartQuery?.quoteCart.checkout?.status
}

export function getCheckoutMethod(quoteCartQuery: QuoteCartQuery | undefined) {
  const checkoutMethods = quoteCartQuery?.quoteCart.checkoutMethods
  return checkoutMethods && checkoutMethods.length > 0
    ? checkoutMethods[0]
    : undefined
}

export function getMonthlyCostDeductionIncentive(
  quoteCartQuery: QuoteCartQuery | undefined,
) {
  const incentive = quoteCartQuery?.quoteCart.campaign?.incentive
  return incentive?.__typename === 'MonthlyCostDeduction'
    ? incentive
    : undefined
}

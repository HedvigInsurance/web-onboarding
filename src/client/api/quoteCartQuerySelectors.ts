import {
  QuoteCartQuery,
  QuoteBundleVariant,
  BundledQuote,
  TypeOfContract,
} from 'data/graphql'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
import { OfferData } from 'pages/Offer/types'
import { getBundleVariantFromInsuranceTypesWithFallback } from '../pages/Offer/utils'

export function getSelectedBundleVariant(
  quoteCartQuery: QuoteCartQuery | undefined,
  selectedInsuranceTypes: InsuranceType[] | TypeOfContract[],
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

export function hasMonthlyCostDeduction(
  quoteCartQuery: QuoteCartQuery | undefined,
) {
  return getMonthlyCostDeductionIncentive(quoteCartQuery) !== undefined
}

export function isPaymentConnected(quoteCartQuery: QuoteCartQuery | undefined) {
  const id = quoteCartQuery?.quoteCart.paymentConnection?.id
  return id !== undefined && id !== null
}

export function getAllQuotes(quoteCartQuery: QuoteCartQuery | undefined) {
  const possibleVariations = getPossibleVariations(quoteCartQuery)

  const quoteMap: Record<string, BundledQuote> = {}
  possibleVariations.forEach((variation) => {
    variation.bundle.quotes.forEach((quote) => {
      quoteMap[quote.id] = quote
    })
  })

  return Object.values(quoteMap)
}

export const isCarInsuranceType = (
  bundleVariant: QuoteBundleVariant | undefined,
) => {
  return bundleVariant?.bundle.quotes.every(
    (quote) => quote.data.type === 'SWEDISH_CAR',
  )
}

export const hasCurrentInsurer = (offerData: OfferData | undefined) => {
  return offerData?.quotes.every(
    (quote) => quote.currentInsurer?.displayName != undefined,
  )
}

export const getStandaloneQuotes = (quoteCartQuery?: QuoteCartQuery) => {
  return quoteCartQuery?.quoteCart.bundle?.standaloneQuotes ?? []
}

export const getAdditionalQuotes = (quoteCartQuery?: QuoteCartQuery) => {
  return quoteCartQuery?.quoteCart.bundle?.additionalQuotes ?? []
}

export const getDataCollectionId = (quoteCartQuery?: QuoteCartQuery) => {
  return quoteCartQuery?.quoteCart?.bundle?.possibleVariations[0].bundle
    .quotes[0].dataCollectionId
}

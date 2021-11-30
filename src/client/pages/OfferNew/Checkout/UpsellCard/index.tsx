import React from 'react'
import { QuoteBundleVariant, BundledQuote } from 'data/graphql'
import { isSwedishAccident } from 'pages/OfferNew/utils'
import { Card } from './Card'

type UpsellCardProps = {
  quoteBundleVariants: QuoteBundleVariant[]
  selectedQuoteBundleVariant: QuoteBundleVariant
  onAcceptDeal: (quoteIds: string[]) => void
  textKeys: Record<string, any>
}

export const UpsellCard = ({
  quoteBundleVariants,
  selectedQuoteBundleVariant,
  onAcceptDeal,
  textKeys,
}: UpsellCardProps) => {
  const isSwedishAccidentAdded = selectedQuoteBundleVariant.bundle.quotes.some(
    ({ quoteDetails }) => isSwedishAccident(quoteDetails),
  )
  if (isSwedishAccidentAdded) {
    return null
  }

  // Look for a bundle variant that includes Accident Insurance.
  // In case it founds it, store the bundle variant and the accident
  // insurance quote so we can use them to accept UpsellCard deal and
  // get the price of Accident Insurance.
  const remainingBundleVariants = quoteBundleVariants.filter(
    ({ id }) => id !== selectedQuoteBundleVariant.id,
  )
  let betterDealBundleVariant: QuoteBundleVariant | null = null
  let accidentInsuranceQuote: BundledQuote | null = null
  for (const bundleVariant of remainingBundleVariants) {
    const accidentInsuranceIndex = bundleVariant.bundle.quotes.findIndex(
      ({ quoteDetails }) => isSwedishAccident(quoteDetails),
    )

    if (accidentInsuranceIndex !== -1) {
      betterDealBundleVariant = bundleVariant
      accidentInsuranceQuote =
        betterDealBundleVariant.bundle.quotes[accidentInsuranceIndex]
      break
    }
  }

  if (betterDealBundleVariant === null || accidentInsuranceQuote === null) {
    return null
  }

  const localizedPerMonth = textKeys.SIDEBAR_PRICE_SUFFIX_INTERVAL()
  const { amount, currency } = accidentInsuranceQuote.price
  const price = `${amount} ${currency}${localizedPerMonth}`
  const betterDealQuoteIds = betterDealBundleVariant.bundle.quotes.map(
    ({ id }) => id,
  )

  return (
    <Card
      title={textKeys.ACCIDENT_SWEDEN_UPSELL_TITLE()}
      description={textKeys.ACCIDENT_SWEDEN_UPSELL_DESCRIPTION()}
      actionButtonLabel={textKeys.ACCIDENT_SWEDEN_UPSELL_BUTTON()}
      price={price}
      onAcceptDeal={() => onAcceptDeal(betterDealQuoteIds)}
    />
  )
}

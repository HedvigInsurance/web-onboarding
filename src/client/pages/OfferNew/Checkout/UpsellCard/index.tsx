import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { QuoteBundleVariant } from 'data/graphql'
import { isSwedishAccident } from 'pages/OfferNew/utils'
import { Card } from './Card'

type UpsellCardProps = {
  quoteBundleVariants: QuoteBundleVariant[]
  selectedQuoteBundleVariant: QuoteBundleVariant
  onAcceptDeal: (quoteIds: string[]) => void
}

const getSwedishAccidentQuoteFromVariant = (
  bundleVariant: QuoteBundleVariant,
) =>
  bundleVariant.bundle.quotes.find(({ quoteDetails }) =>
    isSwedishAccident(quoteDetails),
  )

const isSwedishAccidentQuoteInVariant = (bundleVariant: QuoteBundleVariant) => {
  const isSwedishAccidentAdded = bundleVariant.bundle.quotes.some(
    ({ quoteDetails }) => isSwedishAccident(quoteDetails),
  )
  return isSwedishAccidentAdded
}

export const UpsellCard = ({
  quoteBundleVariants,
  selectedQuoteBundleVariant,
  onAcceptDeal,
}: UpsellCardProps) => {
  const textKeys = useTextKeys()

  if (isSwedishAccidentQuoteInVariant(selectedQuoteBundleVariant)) return null

  const bundleWithAccidentQuote = quoteBundleVariants.find(
    isSwedishAccidentQuoteInVariant,
  )

  if (!bundleWithAccidentQuote) return null

  const accidentInsuranceQuote = getSwedishAccidentQuoteFromVariant(
    bundleWithAccidentQuote,
  )

  if (!accidentInsuranceQuote) return null

  const localizedPerMonth = textKeys.SIDEBAR_PRICE_SUFFIX_INTERVAL()
  const { amount, currency } = accidentInsuranceQuote.price
  const price = `${amount} ${currency}${localizedPerMonth}`
  const newSelectedQuoteIds = bundleWithAccidentQuote.bundle.quotes.map(
    ({ id }) => id,
  )

  return (
    <Card
      title={textKeys.ACCIDENT_SWEDEN_UPSELL_TITLE()}
      description={textKeys.ACCIDENT_SWEDEN_UPSELL_DESCRIPTION()}
      actionButtonLabel={textKeys.ACCIDENT_SWEDEN_UPSELL_BUTTON()}
      price={price}
      onAcceptDeal={() => onAcceptDeal(newSelectedQuoteIds)}
    />
  )
}

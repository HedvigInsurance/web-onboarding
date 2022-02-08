import { QuoteBundleVariant } from 'data/graphql'
import { MarketLabel } from 'src/shared/clientConfig'

export const isMultiQuoteBundle = (variant: QuoteBundleVariant | undefined) => {
  const quotes = variant?.bundle.quotes || []
  return quotes.length > 1
}

export const isSingleStartDateBundle = (
  variant: QuoteBundleVariant | undefined,
  marketLabel: MarketLabel,
) => {
  return isMultiQuoteBundle(variant) && marketLabel === 'DK'
}

export const getQuotes = (variant: QuoteBundleVariant | undefined) => {
  return variant?.bundle.quotes || []
}

import { QuoteBundle } from 'data/graphql'

export const quoteBundleIsBundleSelector = (bundle: QuoteBundle) =>
  bundle.quotes.length > 1

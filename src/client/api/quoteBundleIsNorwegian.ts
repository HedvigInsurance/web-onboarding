import { QuoteBundle } from 'data/graphql'
import * as quoteSelector from './quoteSelector'

export const quoteBundleIsNorwegian = (bundle: QuoteBundle) =>
  bundle.quotes.every((quote) => quoteSelector.isNorwegian(quote))

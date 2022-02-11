import { QuoteBundle } from 'data/graphql'
import * as quoteSelector from './quoteSelector'

export const quoteBundleIsDanish = (bundle: QuoteBundle) =>
  bundle.quotes.every((quote) => quoteSelector.isDanish(quote))

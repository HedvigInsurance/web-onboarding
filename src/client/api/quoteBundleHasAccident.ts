import { QuoteBundle } from 'data/graphql'
import * as quoteSelector from './quoteSelector'

export const quoteBundleHasAccident = (bundle: QuoteBundle) =>
  bundle.quotes.some((quote) => quoteSelector.isAccident(quote))

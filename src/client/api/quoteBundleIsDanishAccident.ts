import { QuoteBundle } from 'data/graphql'
import { quoteBundleIsDanish } from './quoteBundleIsDanish'
import * as quoteSelector from './quoteSelector'

export const quoteBundleIsDanishAccident = (bundle: QuoteBundle) =>
  quoteBundleIsDanish(bundle) &&
  bundle.quotes.length === 2 &&
  bundle.quotes.some((quote) => quoteSelector.isDanishAccident(quote))

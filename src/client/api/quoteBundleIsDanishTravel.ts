import { QuoteBundle } from 'data/graphql'
import { quoteBundleIsDanish } from './quoteBundleIsDanish'
import * as quoteSelector from './quoteSelector'

export const quoteBundleIsDanishTravel = (bundle: QuoteBundle) =>
  quoteBundleIsDanish(bundle) &&
  bundle.quotes.length === 3 &&
  bundle.quotes.some((quote) => quoteSelector.isDanishTravel(quote))

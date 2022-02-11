import { QuoteBundle } from 'data/graphql'
import * as quoteSelector from './quoteSelector'

export const quoteBundleHasTravel = (bundle: QuoteBundle) =>
  bundle.quotes.some((quote) => quoteSelector.isTravel(quote))

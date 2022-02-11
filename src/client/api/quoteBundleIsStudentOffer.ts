import { QuoteBundle } from 'data/graphql'
import * as quoteSelector from './quoteSelector'

export const quoteBundleIsStudentOffer = (bundle: QuoteBundle) =>
  bundle.quotes.every((quote) => quoteSelector.isStudent(quote))

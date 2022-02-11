import { QuoteBundle } from 'data/graphql'

export const quoteBundleIsisYouthOffer = (bundle: QuoteBundle): boolean =>
  bundle.quotes.every((quote) => quote.data.isYouth === true)

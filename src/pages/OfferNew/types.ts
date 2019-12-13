import { CompleteQuote, IncompleteQuote, Query } from 'generated/graphql'

interface OfferCore {
  redeemedCampaigns: Query['redeemedCampaigns']
  member: Query['member']
}

export interface CompleteOfferData extends OfferCore {
  quote: CompleteQuote
}

export interface IncompleteOfferData extends OfferCore {
  quote: IncompleteQuote
}

export type OfferData = CompleteOfferData | IncompleteOfferData

export interface WithEmailForm {
  email: string
  onEmailChange: (email: string) => void
}

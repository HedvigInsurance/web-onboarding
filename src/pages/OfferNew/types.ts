import { CompleteQuote, IncompleteQuote, Query } from 'generated/graphql'

interface OfferCore {
  redeemedCampaigns: Query['redeemedCampaigns']
  member: Query['member']
}

export interface CompleteOfferDataForMember extends OfferCore {
  lastQuoteOfMember: CompleteQuote
}

export interface IncompleteOfferDataForMember extends OfferCore {
  lastQuoteOfMember: IncompleteQuote
}

export type OfferData =
  | CompleteOfferDataForMember
  | IncompleteOfferDataForMember

export interface WithEmailForm {
  email: string
  onEmailChange: (email: string) => void
}

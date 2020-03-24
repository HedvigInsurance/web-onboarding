import {
  CompleteApartmentQuoteDetails,
  CompleteHouseQuoteDetails,
  CompleteQuote,
  IncompleteQuote,
  Query,
} from 'data/graphql'

interface OfferCore {
  redeemedCampaigns: Query['redeemedCampaigns']
  member: Omit<Query['member'], 'features'>
}

export interface CompleteOfferDataForMember extends OfferCore {
  lastQuoteOfMember: CompleteQuoteWithoutUnknownDetails
}

export type CompleteQuoteWithoutUnknownDetails = CompleteQuote & {
  details: CompleteHouseQuoteDetails | CompleteApartmentQuoteDetails
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

export interface WithSsnForm {
  ssn: string
  onSsnChange: (ssn: string) => void
}

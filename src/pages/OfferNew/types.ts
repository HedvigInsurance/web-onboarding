import {
  BundledQuote,
  CompleteApartmentQuoteDetails,
  CompleteHouseQuoteDetails,
  CompleteQuote,
  Query,
  QuoteBundle,
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

export type OfferQuote = CompleteQuote | QuoteBundle

export type OfferData = CompleteQuote | BundledQuote

export interface OfferPerson {
  firstName: string
  lastName: string
  ssn?: string
  email?: string
}

export interface WithEmailForm {
  email: string
  onEmailChange: (email: string) => void
}

export interface WithSsnForm {
  ssn: string
  onSsnChange: (ssn: string) => void
}

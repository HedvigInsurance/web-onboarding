import {
  BundledQuote,
  CompleteApartmentQuoteDetails,
  CompleteHouseQuoteDetails,
  CompleteQuote,
  InsurableLimit,
  InsurableLimitType,
  InsuranceCost,
  InsuranceTerm,
  InsuranceTermType,
  Query,
  TypeOfContract,
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

export interface Address {
  street: string
  zipCode: string
}

export type OfferPersonInfo = Pick<
  BundledQuote,
  'firstName' | 'lastName' | 'email' | 'ssn' | 'birthDate'
> & {
  householdSize: number
  address: Address | null
}

export type OfferQuote = Pick<
  BundledQuote,
  | 'id'
  | 'startDate'
  | 'quoteDetails'
  | 'dataCollectionId'
  | 'currentInsurer'
  | 'perils'
> & {
  contractType: TypeOfContract
  insurableLimits: ReadonlyMap<InsurableLimitType, InsurableLimit>
  insuranceTerms: ReadonlyMap<InsuranceTermType, InsuranceTerm>
}

export interface OfferData {
  person: OfferPersonInfo
  quotes: ReadonlyArray<OfferQuote>
  cost: InsuranceCost
}

export interface WithEmailForm {
  email: string
  onEmailChange: (email: string) => void
}

export interface WithSsnForm {
  ssn: string
  onSsnChange: (ssn: string) => void
}

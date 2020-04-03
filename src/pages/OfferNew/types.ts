import {
  BundledQuote,
  CompleteApartmentQuoteDetails,
  CompleteHouseQuoteDetails,
  CompleteQuote,
  InsuranceCost,
  Query,
} from 'data/graphql'
import { TypeOfContract } from 'utils/insuranceDomainUtils'

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
  | 'insurableLimits'
  | 'termsAndConditions'
  | 'insuranceTerms'
> & {
  contractType: TypeOfContract
}

export interface OfferData {
  person: OfferPersonInfo
  quotes: ReadonlyArray<OfferQuote>
  cost: InsuranceCost
  startDate: Date | null
}

export interface WithEmailForm {
  email: string
  onEmailChange: (email: string) => void
}

export interface WithSsnForm {
  ssn: string
  onSsnChange: (ssn: string) => void
}

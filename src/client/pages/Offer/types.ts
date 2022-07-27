import {
  BundledQuote,
  InsurableLimit,
  InsuranceCost,
  InsuranceTerm,
  TypeOfContract,
} from 'data/graphql'

export interface Address {
  street: string
  zipCode: string
  apartment?: string
  floor?: string
}

export type OfferPersonInfo = Pick<
  BundledQuote,
  'firstName' | 'lastName' | 'email' | 'ssn' | 'birthDate' | 'phoneNumber'
> & {
  householdSize?: number
  address: Address | null
}

export type OfferQuote = Pick<
  BundledQuote,
  | 'id'
  | 'displayName'
  | 'price'
  | 'startDate'
  | 'quoteDetails'
  | 'dataCollectionId'
  | 'currentInsurer'
  | 'perils'
> & {
  contractType: TypeOfContract
  insurableLimits: InsurableLimit[]
  insuranceTerms: InsuranceTerm[]
  data: GenericQuoteData
}

export type GenericQuoteData = {
  birthDate: string
  firstName?: string
  lastName?: string

  type: string

  numberCoInsured: number
  isStudent?: boolean

  street?: string
  zipCode?: string
  livingSpace?: number
  subType?: string
  apartment?: string
  floor?: number
  squareMeters?: number

  numberOfWetUnits?: number
  ancillaryArea?: number
  numberOfBathrooms?: number
  yearOfConstruction?: number
  yearOfOwnership?: number
  isSubleted?: boolean
  waterLeakageDetector?: boolean

  extraBuildings?: Array<{
    displayName: string | null
    type: string
    area: number
    hasWaterConnected: boolean
  }>

  typeOfContract?: string

  // Car
  mileage?: number
  registrationNumber?: string
}

export interface OfferData {
  person: OfferPersonInfo
  quotes: ReadonlyArray<OfferQuote>
  cost: InsuranceCost
  memberId?: string
}

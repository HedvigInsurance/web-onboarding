import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
import { BundledQuote, ApartmentType } from 'data/graphql'

export const isSwedishApartment = (quote: BundledQuote) =>
  quote.data.type === InsuranceType.SWEDISH_APARTMENT

export const isSwedishBRF = (quote: BundledQuote) =>
  isSwedishApartment(quote) && quote.data.subType === ApartmentType.Brf

export const isSwedishHouse = (quote: BundledQuote) =>
  quote.data.type === InsuranceType.SWEDISH_HOUSE

export const isSwedishAccident = (quote: BundledQuote) =>
  quote.data.type === InsuranceType.SWEDISH_ACCIDENT

export const isNorwegianHomeContents = (quote: BundledQuote) =>
  quote.data.type === InsuranceType.NORWEGIAN_HOME_CONTENT

export const isNorwegianHouse = (quote: BundledQuote) =>
  quote.data.type === InsuranceType.NORWEGIAN_HOUSE

export const isNorwegianTravel = (quote: BundledQuote) =>
  quote.data.type === InsuranceType.NORWEGIAN_TRAVEL

export const isNorwegian = (quote: BundledQuote) =>
  isNorwegianHomeContents(quote) || isNorwegianTravel(quote)

export const isDanishHomeContents = (quote: BundledQuote) =>
  quote.data.type === InsuranceType.DANISH_HOME_CONTENT

export const isDanishAccident = (quote: BundledQuote) =>
  quote.data.type === InsuranceType.DANISH_ACCIDENT

export const isDanishTravel = (quote: BundledQuote) =>
  quote.data.type === InsuranceType.DANISH_TRAVEL

export const isDanish = (quote: BundledQuote) =>
  isDanishHomeContents(quote) ||
  isDanishAccident(quote) ||
  isDanishTravel(quote)

const SWEDISH_STUDENT_APARTMENT_TYPES = [
  ApartmentType.StudentBrf,
  ApartmentType.StudentRent,
]
export const isStudent = (quote: BundledQuote) => {
  if (SWEDISH_STUDENT_APARTMENT_TYPES.includes(quote.data.subType)) {
    return true
  }

  return quote.data.isStudent === true
}

const ACCIDENT_INSURANCE_TYPES = [
  InsuranceType.SWEDISH_ACCIDENT,
  InsuranceType.DANISH_ACCIDENT,
  InsuranceType.NORWEGIAN_ACCIDENT,
]
export const isAccident = (quote: BundledQuote) =>
  ACCIDENT_INSURANCE_TYPES.includes(quote.data.type)

const TRAVEL_INSURANCE_TYPES = [
  InsuranceType.DANISH_TRAVEL,
  InsuranceType.NORWEGIAN_TRAVEL,
]
export const isTravel = (quote: BundledQuote) =>
  TRAVEL_INSURANCE_TYPES.includes(quote.data.type)

const HOUSE_INSURANCE_TYPES = [
  InsuranceType.NORWEGIAN_HOUSE,
  InsuranceType.SWEDISH_HOUSE,
  InsuranceType.DANISH_HOUSE,
]
export const isHouse = (quote: BundledQuote) =>
  HOUSE_INSURANCE_TYPES.includes(quote.data.type)

const HOME_CONTENT_TYPES = [
  InsuranceType.SWEDISH_APARTMENT,
  InsuranceType.NORWEGIAN_HOME_CONTENT,
  InsuranceType.DANISH_HOME_CONTENT,
]
export const isHomeContents = (quote: BundledQuote) =>
  HOME_CONTENT_TYPES.includes(quote.data.type)

const HOME_OR_HOUSE_INSURANCE_TYPES = [
  InsuranceType.SWEDISH_APARTMENT,
  InsuranceType.SWEDISH_HOUSE,
  InsuranceType.NORWEGIAN_HOME_CONTENT,
  InsuranceType.NORWEGIAN_HOUSE,
  InsuranceType.DANISH_HOME_CONTENT,
  InsuranceType.DANISH_HOUSE,
]
export const isHomeContentsOrHouse = (quote: BundledQuote) =>
  HOME_OR_HOUSE_INSURANCE_TYPES.includes(quote.data.type)

// This type is so that we can call if with the type OfferQuote as well, which
// picks some properties from BundledQuote, but not all of them
export const isCar = (quote: Pick<BundledQuote, 'data'>) =>
  quote.data.type === InsuranceType.SWEDISH_CAR

export type QuoteOwnershipType = 'RENT' | 'OWN' | 'STUDENT_RENT' | 'STUDENT_OWN'

export type QuoteCarSubType = 'TRAFFIC' | 'HALF' | 'FULL'

export type QuoteDataSubTypes = QuoteOwnershipType | QuoteCarSubType
export const getSubType = (quote: BundledQuote) =>
  quote.data.subType as QuoteDataSubTypes

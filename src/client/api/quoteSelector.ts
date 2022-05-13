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

export const isYouth = (quote: BundledQuote) => {
  return quote.data.isYouth === true
}

export const isStudentOrYouth = (quote: BundledQuote) => {
  return isStudent(quote) || isYouth(quote)
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

const HOME_INSURANCE_TYPES = [
  InsuranceType.SWEDISH_APARTMENT,
  InsuranceType.SWEDISH_HOUSE,
  InsuranceType.NORWEGIAN_HOME_CONTENT,
  InsuranceType.DANISH_HOME_CONTENT,
]
export const isHomeContentsOrHouse = (quote: BundledQuote) =>
  HOME_INSURANCE_TYPES.includes(quote.data.type)

type QuoteDataSubTypes = 'RENT' | 'OWN' | 'STUDENT_RENT' | 'STUDENT_OWN'
export const getSubType = (quote: BundledQuote) =>
  quote.data.subType as QuoteDataSubTypes

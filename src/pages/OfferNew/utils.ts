import { Market } from 'components/utils/CurrentLocale'
import {
  ApartmentType,
  Campaign,
  CompleteQuote,
  Quote,
  QuoteDetails,
  SwedishApartmentQuoteDetails,
  SwedishHouseQuoteDetails,
} from 'data/graphql'
import { match } from 'matchly'
import { CompleteOfferDataForMember, OfferData } from './types'

export const isOffer = (
  offer?: OfferData,
): offer is CompleteOfferDataForMember =>
  (offer && isQuote(offer.lastQuoteOfMember)) || false

export const isQuote = (quote: Quote): quote is CompleteQuote =>
  quote.__typename === 'CompleteQuote' || false

export const isStudent = (details: QuoteDetails) =>
  isSwedishApartment(details) &&
  (details.type === 'STUDENT_BRF' || details.type === 'STUDENT_RENT')

export const isSwedishApartment = (
  details: QuoteDetails,
): details is SwedishApartmentQuoteDetails =>
  details.__typename === 'SwedishApartmentQuoteDetails'

export const isSwedishHouse = (
  details: QuoteDetails,
): details is SwedishHouseQuoteDetails =>
  details.__typename === 'SwedishHouseQuoteDetails'

export const isFreeMonths = (campaigns: Campaign[]) =>
  (campaigns.length > 0 &&
    campaigns[0].incentive &&
    campaigns[0].incentive.__typename === 'FreeMonths') ||
  false

export const isMonthlyCostDeduction = (campaigns: Campaign[]) =>
  (campaigns.length > 0 &&
    (campaigns[0]?.incentive?.__typename === 'MonthlyCostDeduction' ||
      campaigns[0]?.incentive?.__typename === 'PercentageDiscountMonths')) ||
  false

export const isNoDiscount = (campaigns: Campaign[]) =>
  (campaigns.length > 0 &&
    campaigns[0].incentive &&
    campaigns[0].incentive.__typename === 'NoDiscount') ||
  false

export type QuoteTextKeyType =
  | 'SE_RENT'
  | 'SE_BRF'
  | 'SE_STUDENT_RENT'
  | 'SE_STUDENT_BRF'
  | 'SE_HOUSE'
  | 'NO_HOME'
  | 'NO_TRAVEL'

export const quoteTypeTextKeys: Record<QuoteTextKeyType, string> = {
  SE_RENT: 'SIDEBAR_INSURANCE_TYPE_RENT',
  SE_BRF: 'SIDEBAR_INSURANCE_TYPE_BRF',
  SE_STUDENT_RENT: 'SIDEBAR_INSURANCE_TYPE_STUDENT_RENT',
  SE_STUDENT_BRF: 'SIDEBAR_INSURANCE_TYPE_STUDENT_BRF',
  SE_HOUSE: 'SIDEBAR_INSURANCE_TYPE_HOUSE',
  NO_HOME: 'SIDEBAR_INSURANCE_TYPE_NORWAY_HOME',
  NO_TRAVEL: 'SIDEBAR_INSURANCE_TYPE_NORWAY_TRAVEL',
}

export const getQuoteTextKeyType = (quote: CompleteQuote): QuoteTextKeyType => {
  if (isSwedishHouse(quote.quoteDetails)) {
    return 'SE_HOUSE'
  }

  if (isSwedishApartment(quote.quoteDetails)) {
    const result = match<ApartmentType, QuoteTextKeyType>([
      [ApartmentType.Rent, 'SE_RENT'],
      [ApartmentType.Brf, 'SE_BRF'],
      [ApartmentType.StudentRent, 'SE_STUDENT_RENT'],
      [ApartmentType.StudentBrf, 'SE_STUDENT_BRF'],
    ])(quote.quoteDetails.type)

    if (!result) {
      throw new Error(`Unknown apartment quote type ${quote.quoteDetails.type}`)
    }

    return result
  }

  if (quote.quoteDetails.__typename === 'NorwegianHomeContentsDetails') {
    return 'NO_HOME'
  }
  if (quote.quoteDetails.__typename === 'NorwegianTravelDetails') {
    return 'NO_TRAVEL'
  }

  throw new Error(`Unknown quote type ${quote.quoteDetails.__typename}`)
}

export const apartmentTypeTextKeys: Record<ApartmentType, string> = {
  [ApartmentType.Brf]: 'CHECKOUT_INSURANCE_APARTMENT_TYPE_BRF',
  [ApartmentType.Rent]: 'CHECKOUT_INSURANCE_APARTMENT_TYPE_RENT',
  [ApartmentType.StudentBrf]: 'CHECKOUT_INSURANCE_APARTMENT_TYPE_BRF',
  [ApartmentType.StudentRent]: 'CHECKOUT_INSURANCE_APARTMENT_TYPE_RENT',
}

export const maskAndFormatRawSsn = (ssn: string) => {
  if (ssn.length !== 12) {
    return ssn
  }

  const CENTURY_LENGTH = 2
  const DATE_LENGTH = 6
  return ssn.substr(CENTURY_LENGTH, DATE_LENGTH) + '-****'
}

export const createSsnValidator = (market: Market) => (
  ssn: string,
): boolean => {
  if (market === Market.No) {
    return /^[0-9]{2}[0,1][0-9][0-9]{2}[ ]?[0-9]{5}$/.test(ssn)
  } else if (market === Market.Se) {
    return /^([1-2][0-9])?[0-9]{2}[0-1][0-9][0-9]{2}[-+]?[0-9]{4}$/.test(ssn)
  }

  throw new Error(`Expected market to be NO or SE but was ${market}`)
}

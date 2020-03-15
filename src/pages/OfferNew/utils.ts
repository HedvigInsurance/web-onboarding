import {
  ApartmentType,
  Campaign,
  CompleteApartmentQuoteDetails,
  CompleteHouseQuoteDetails,
  CompleteQuote,
  CompleteQuoteDetails,
  InsuranceType,
  Quote,
  UnknownQuoteDetails,
} from '../../generated/graphql'
import { CompleteOfferDataForMember, OfferData } from './types'

export const isOffer = (
  offer?: OfferData,
): offer is CompleteOfferDataForMember =>
  (offer && isQuote(offer.lastQuoteOfMember)) || false

export const isQuote = (quote: Quote): quote is CompleteQuote =>
  quote.__typename === 'CompleteQuote' || false

export const isStudent = (details: CompleteQuoteDetails) =>
  isApartment(details) &&
  (details.type === 'STUDENT_BRF' || details.type === 'STUDENT_RENT')

export const isApartment = (
  details: CompleteQuoteDetails,
): details is CompleteApartmentQuoteDetails =>
  details.__typename === 'CompleteApartmentQuoteDetails' || false

export const isHouse = (
  details: CompleteQuoteDetails,
): details is CompleteHouseQuoteDetails =>
  details.__typename === 'CompleteHouseQuoteDetails' || false

export const isUnknownQuoteType = (
  details: CompleteQuoteDetails,
): details is UnknownQuoteDetails =>
  details.__typename === 'UnknownQuoteDetails' || false

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

export const getInsuranceType = (quote: CompleteQuote): InsuranceType => {
  if (isHouse(quote.details)) {
    return InsuranceType.House
  }

  if (isUnknownQuoteType(quote.details)) {
    throw new Error(`Unknown insurance type: ${quote.details.unknown}`)
  }

  const map = {
    RENT: InsuranceType.Rent,
    BRF: InsuranceType.Brf,
    STUDENT_RENT: InsuranceType.StudentRent,
    STUDENT_BRF: InsuranceType.StudentBrf,
  }

  if (!map[quote.details.type]) {
    throw new Error(`Invalid insurance type ${quote.details.type}`)
  }

  return map[quote.details.type]
}

export const insuranceTypeTextKeys: Record<InsuranceType, string> = {
  [InsuranceType.Rent]: 'SIDEBAR_INSURANCE_TYPE_RENT',
  [InsuranceType.Brf]: 'SIDEBAR_INSURANCE_TYPE_BRF',
  [InsuranceType.StudentRent]: 'SIDEBAR_INSURANCE_TYPE_STUDENT_RENT',
  [InsuranceType.StudentBrf]: 'SIDEBAR_INSURANCE_TYPE_STUDENT_BRF',
  [InsuranceType.House]: 'SIDEBAR_INSURANCE_TYPE_HOUSE',
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

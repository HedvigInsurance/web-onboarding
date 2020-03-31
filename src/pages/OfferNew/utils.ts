import { Market } from 'components/utils/CurrentLocale'
import {
  ApartmentType,
  Campaign,
  CompleteQuote,
  InsuranceCost,
  NorwegianHomeContentsDetails,
  NorwegianHomeContentsType,
  NorwegianTravelDetails,
  Quote,
  QuoteBundle,
  QuoteDetails,
  SwedishApartmentQuoteDetails,
  SwedishHouseQuoteDetails,
  TypeOfContract,
} from 'data/graphql'
import { OfferPerson, OfferQuote } from 'pages/OfferNew/types'
import { OfferData } from './types'

export const getOfferInsuranceCost = (
  offerQuote: OfferQuote,
): InsuranceCost => {
  if (isOfferFromCompleteQuote(offerQuote)) {
    return offerQuote.insuranceCost
  }
  if (isOfferFromQuoteBundle(offerQuote)) {
    return offerQuote.bundleCost
  }
  throw new Error(`Invalid OfferQuote type ${offerQuote}`)
}

export const getOfferData = (
  offerQuote: OfferQuote,
): ReadonlyArray<OfferData> => {
  if (isOfferFromCompleteQuote(offerQuote)) {
    return [offerQuote]
  }
  if (isOfferFromQuoteBundle(offerQuote)) {
    return offerQuote.quotes
  }
  throw new Error(`Invalid OfferQuote type ${offerQuote}`)
}

export const getOfferQuoteIds = (offerQuote: OfferQuote): string[] => {
  if (isOfferFromCompleteQuote(offerQuote)) {
    return [offerQuote.id]
  }
  if (isOfferFromQuoteBundle(offerQuote)) {
    return offerQuote.quotes.map((quote) => quote.id)
  }
  throw new Error(`Invalid OfferQuote type ${offerQuote}`)
}

export const getOfferPerson = (offerQuote: OfferQuote): OfferPerson => {
  if (isOfferFromCompleteQuote(offerQuote)) {
    return {
      firstName: offerQuote.firstName,
      lastName: offerQuote.lastName,
      ssn: offerQuote.ssn ?? undefined,
      email: offerQuote.email ?? undefined,
    }
  }
  if (isOfferFromQuoteBundle(offerQuote)) {
    console.log(offerQuote)
    const firstQuote = offerQuote.quotes[0]
    return {
      firstName: firstQuote.firstName,
      lastName: firstQuote.lastName,
      ssn: firstQuote.ssn ?? undefined,
      email: firstQuote.email ?? undefined,
    }
  }
  throw new Error(`Invalid OfferQuote type ${offerQuote}`)
}

export const isOfferFromCompleteQuote = (
  offerQuote: OfferQuote,
): offerQuote is CompleteQuote =>
  offerQuote.__typename === 'CompleteQuote' || false

export const isOfferFromQuoteBundle = (
  offerQuote: OfferQuote,
): offerQuote is QuoteBundle => offerQuote.__typename === 'QuoteBundle' || false

export const isCompleteQuote = (quote: Quote): quote is CompleteQuote =>
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

export const isNorwegianHomeContents = (
  details: QuoteDetails,
): details is NorwegianHomeContentsDetails =>
  details.__typename === 'NorwegianHomeContentsDetails'

export const isNorwegianTravel = (
  details: QuoteDetails,
): details is NorwegianTravelDetails =>
  details.__typename === 'NorwegianTravelDetails'

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

export const getContractType = (quote: OfferData): TypeOfContract => {
  if (isSwedishHouse(quote.quoteDetails)) {
    return TypeOfContract.SeHouse
  }

  if (isSwedishApartment(quote.quoteDetails)) {
    const map = {
      RENT: TypeOfContract.SeApartmentRent,
      BRF: TypeOfContract.SeApartmentBrf,
      STUDENT_RENT: TypeOfContract.SeApartmentStudentRent,
      STUDENT_BRF: TypeOfContract.SeApartmentStudentBrf,
    }

    if (!map[quote.quoteDetails.type]) {
      throw new Error(`Invalid insurance type ${quote.quoteDetails.type}`)
    }

    return map[quote.quoteDetails.type]
  }

  if (isNorwegianHomeContents(quote.quoteDetails)) {
    const map = {
      RENT: NorwegianHomeContentsType.Rent,
      OWN: NorwegianHomeContentsType.Own,
    }

    if (!map[quote.quoteDetails.type]) {
      throw new Error(`Invalid insurance type ${quote.quoteDetails.type}`)
    }

    const type = map[quote.quoteDetails.type]

    switch (type) {
      case NorwegianHomeContentsType.Own:
        if (quote.quoteDetails.isYouth) {
          return TypeOfContract.NoHomeContentYouthOwn
        }
        return TypeOfContract.NoHomeContentOwn
      case NorwegianHomeContentsType.Rent:
        if (quote.quoteDetails.isYouth) {
          return TypeOfContract.NoHomeContentYouthRent
        }
        return TypeOfContract.NoHomeContentRent
    }
  }

  if (isNorwegianTravel(quote.quoteDetails)) {
    if (quote.quoteDetails.isYouth) {
      return TypeOfContract.NoTravelYouth
    }
    return TypeOfContract.NoTravel
  }

  throw new Error(
    `Unsupported quoteDetails type (quoteDetails=${JSON.stringify(
      quote.quoteDetails,
    )})`,
  )
}

export const insuranceTypeTextKeys: Record<TypeOfContract, string> = {
  [TypeOfContract.SeApartmentRent]: 'SIDEBAR_INSURANCE_TYPE_RENT',
  [TypeOfContract.SeApartmentBrf]: 'SIDEBAR_INSURANCE_TYPE_BRF',
  [TypeOfContract.SeApartmentStudentRent]:
    'SIDEBAR_INSURANCE_TYPE_STUDENT_RENT',
  [TypeOfContract.SeApartmentStudentBrf]: 'SIDEBAR_INSURANCE_TYPE_STUDENT_BRF',
  [TypeOfContract.SeHouse]: 'SIDEBAR_INSURANCE_TYPE_HOUSE',
  [TypeOfContract.NoHomeContentRent]: 'SIDEBAR_INSURANCE_TYPE_NO_CONTENTS_RENT',
  [TypeOfContract.NoHomeContentOwn]: 'SIDEBAR_INSURANCE_TYPE_NO_CONTENTS_OWN',
  [TypeOfContract.NoHomeContentYouthRent]:
    'SIDEBAR_INSURANCE_TYPE_NO_CONTENTS_YOUTH_RENT',
  [TypeOfContract.NoHomeContentYouthOwn]:
    'SIDEBAR_INSURANCE_TYPE_NO_CONTENTS_YOUTH_OWN',
  [TypeOfContract.NoTravel]: 'SIDEBAR_INSURANCE_TYPE_NO_TRAVEL',
  [TypeOfContract.NoTravelYouth]: 'SIDEBAR_INSURANCE_TYPE_NO_TRAVEL_YOUTH',
}

export const apartmentTypeTextKeys: Record<ApartmentType, string> = {
  [ApartmentType.Rent]: 'CHECKOUT_INSURANCE_APARTMENT_TYPE_RENT',
  [ApartmentType.Brf]: 'CHECKOUT_INSURANCE_APARTMENT_TYPE_BRF',
  [ApartmentType.StudentRent]: 'CHECKOUT_INSURANCE_APARTMENT_TYPE_RENT',
  [ApartmentType.StudentBrf]: 'CHECKOUT_INSURANCE_APARTMENT_TYPE_BRF',
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

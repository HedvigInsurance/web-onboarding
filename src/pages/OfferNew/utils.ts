import { Market } from 'components/utils/CurrentLocale'
import {
  ApartmentType,
  BundledQuote,
  Campaign,
  NorwegianHomeContentsDetails,
  QuoteBundle,
  QuoteDetails,
  SwedishApartmentQuoteDetails,
  SwedishHouseQuoteDetails,
} from 'data/graphql'
import { parse } from 'date-fns'
import { Address, OfferData } from 'pages/OfferNew/types'
import { TypeOfContract } from 'utils/insuranceDomainUtils'

export const getOfferData = (quoteBundle: QuoteBundle): OfferData => {
  const firstQuote = quoteBundle.quotes[0]
  return {
    person: {
      firstName: firstQuote.firstName,
      lastName: firstQuote.lastName,
      email: firstQuote.email,
      ssn: firstQuote.ssn,
      birthDate: firstQuote.birthDate,
      householdSize: getHouseholdSize(firstQuote.quoteDetails),
      address: getAddressFromBundledQuotes(quoteBundle.quotes),
    },
    quotes: quoteBundle.quotes.map((bundleQuote) => {
      return {
        id: bundleQuote.id,
        startDate: bundleQuote.startDate,
        quoteDetails: bundleQuote.quoteDetails,
        dataCollectionId: bundleQuote.dataCollectionId,
        currentInsurer: bundleQuote.currentInsurer,
        contractType: bundleQuote.typeOfContract,
        perils: bundleQuote.perils,
      }
    }),
    cost: quoteBundle.bundleCost,
    startDate: getStartDateFromBundledQuotes(quoteBundle.quotes),
  }
}

export const getHouseholdSize = (quoteDetails: QuoteDetails) =>
  quoteDetails.__typename === 'SwedishApartmentQuoteDetails' ||
  quoteDetails.__typename === 'SwedishHouseQuoteDetails'
    ? quoteDetails.householdSize
    : quoteDetails.__typename === 'NorwegianHomeContentsDetails' ||
      quoteDetails.__typename === 'NorwegianTravelDetails'
    ? quoteDetails.coInsured + 1
    : 0

const getAddressFromBundledQuotes = (
  quotes: ReadonlyArray<BundledQuote>,
): Address | undefined => {
  const quotesWithAddress = quotes.filter((quote) =>
    quoteDetailsHasAddress(quote.quoteDetails),
  )
  if (
    quotesWithAddress.length > 0 &&
    quoteDetailsHasAddress(quotesWithAddress[0].quoteDetails)
  ) {
    return {
      street: quotesWithAddress[0].quoteDetails.street,
      zipCode: quotesWithAddress[0].quoteDetails.zipCode,
    }
  }
  return undefined
}

const getStartDateFromBundledQuotes = (
  quotes: ReadonlyArray<BundledQuote>,
): Date | undefined => {
  const distinctStartDates = Array.from(
    new Set(quotes.map((quote) => quote.startDate)),
  )
  if (distinctStartDates.length === 1 && distinctStartDates[0]) {
    return parse(distinctStartDates[0], 'yyyy-MM-dd', new Date())
  }
  return undefined
}

export const quoteDetailsHasAddress = (
  quoteDetails: QuoteDetails,
): quoteDetails is
  | SwedishApartmentQuoteDetails
  | SwedishHouseQuoteDetails
  | NorwegianHomeContentsDetails =>
  [
    'SwedishApartmentQuoteDetails',
    'SwedishHouseQuoteDetails',
    'NorwegianHomeContentsDetails',
  ].includes(quoteDetails.__typename as string)

export const getQuoteIds = (offerData: OfferData): string[] =>
  offerData.quotes.map((quote) => quote.id)

export const isBundle = (offerData: OfferData): boolean =>
  offerData.quotes.length > 1

export const hasAddress = (offerData: OfferData): boolean =>
  offerData.person.address !== undefined

export const hasCurrentInsurer = (offerData: OfferData): boolean =>
  offerData.quotes.filter((quote) => quote.currentInsurer).length > 0

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

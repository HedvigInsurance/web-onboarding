import { Market } from 'components/utils/CurrentLocale'
import {
  ApartmentType,
  BundledQuote,
  Campaign,
  DanishHomeContentsDetails,
  InsurableLimit,
  InsurableLimitType,
  InsuranceTerm,
  InsuranceTermType,
  NorwegianHomeContentsDetails,
  NorwegianTravelDetails,
  QuoteBundle,
  QuoteDetails,
  SwedishApartmentQuoteDetails,
  SwedishHouseQuoteDetails,
  TypeOfContract,
} from 'data/graphql'
import { Address, OfferData, OfferQuote } from 'pages/OfferNew/types'

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
        insurableLimits: new Map(
          bundleQuote.insurableLimits.map((insurableLimit) => [
            insurableLimit.type,
            insurableLimit,
          ]),
        ) as ReadonlyMap<InsurableLimitType, InsurableLimit>,
        insuranceTerms: new Map(
          bundleQuote.insuranceTerms.map((insuranceTerm) => [
            insuranceTerm.type,
            insuranceTerm,
          ]),
        ) as ReadonlyMap<InsuranceTermType, InsuranceTerm>,
      }
    }),
    cost: quoteBundle.bundleCost,
  }
}

export const getHouseholdSize = (quoteDetails: QuoteDetails) => {
  if ('householdSize' in quoteDetails) {
    return quoteDetails.householdSize
  }
  if ('coInsured' in quoteDetails) {
    return quoteDetails.coInsured + 1
  }
  throw new Error(
    `quoteDetails ${JSON.stringify(
      quoteDetails,
    )} must include one of the following: "householdSize" or "coInsured".`,
  )
}

const getAddressFromBundledQuotes = (
  quotes: ReadonlyArray<BundledQuote>,
): Address | null => {
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
  return null
}

export const quoteDetailsHasAddress = (
  quoteDetails: QuoteDetails,
): quoteDetails is
  | SwedishApartmentQuoteDetails
  | SwedishHouseQuoteDetails
  | NorwegianHomeContentsDetails
  | DanishHomeContentsDetails =>
  [
    'SwedishApartmentQuoteDetails',
    'SwedishHouseQuoteDetails',
    'NorwegianHomeContentsDetails',
    'DanishHomeContentsDetails',
  ].includes(quoteDetails.__typename as string)

export const getQuoteIds = (offerData: OfferData): string[] =>
  offerData.quotes.map((quote) => quote.id)

export const isBundle = (offerData: OfferData): boolean =>
  offerData.quotes.length > 1

export const isYouth = (offerData: OfferData): boolean =>
  offerData.quotes.every(
    (quote) =>
      isNorwegianHomeContents(quote.quoteDetails) ||
      (isNorwegianTravel(quote.quoteDetails) && quote.quoteDetails.isYouth),
  )

export const isSwedishQuote = (quote: OfferQuote): boolean =>
  isSwedishApartment(quote.quoteDetails) || isSwedishHouse(quote.quoteDetails)

export const isSwedish = (offerData: OfferData): boolean =>
  offerData.quotes.every((quote) => isSwedishQuote(quote))

export const isNorwegianQuote = (quote: OfferQuote): boolean =>
  isNorwegianHomeContents(quote.quoteDetails) ||
  isNorwegianTravel(quote.quoteDetails)

export const isNorwegian = (offerData: OfferData): boolean =>
  offerData.quotes.every((quote) => isNorwegianQuote(quote))

export const isDanishQuote = (quote: OfferQuote): boolean =>
  isDanishHomeContents(quote.quoteDetails)

export const isDanish = (offerData: OfferData): boolean =>
  offerData.quotes.every((quote) => isDanishQuote(quote))

export const hasAddress = (offerData: OfferData): boolean =>
  !!offerData.person.address

export const hasCurrentInsurer = (quote: OfferQuote): boolean =>
  Boolean(quote.currentInsurer)

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

export const isDanishHomeContents = (
  details: QuoteDetails,
): details is DanishHomeContentsDetails =>
  details.__typename === 'DanishHomeContentsDetails'

export const isFreeMonths = (campaigns: Campaign[]) =>
  (campaigns.length > 0 &&
    campaigns[0].incentive &&
    campaigns[0].incentive.__typename === 'FreeMonths') ||
  false

export const isMonthlyCostDeduction = (
  campaigns: ReadonlyArray<Campaign | unknown>,
) => {
  const firstCampaign = campaigns[0] as Campaign
  return (
    (campaigns.length > 0 &&
      (firstCampaign?.incentive?.__typename === 'MonthlyCostDeduction' ||
        firstCampaign?.incentive?.__typename === 'PercentageDiscountMonths')) ||
    false
  )
}

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
  [TypeOfContract.DkHomeContentOwn]: 'SIDEBAR_INSURANCE_TYPE_DK_CONTENTS_OWN',
  [TypeOfContract.DkHomeContentRent]: 'SIDEBAR_INSURANCE_TYPE_DK_CONTENTS_RENT',
  [TypeOfContract.DkHomeContentStudentOwn]:
    'SIDEBAR_INSURANCE_TYPE_DK_CONTENTS_STUDENT_OWN',
  [TypeOfContract.DkHomeContentStudentRent]:
    'SIDEBAR_INSURANCE_TYPE_DK_CONTENTS_STUDENT_RENT',
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

export const ssnLengthByMarket: Record<Market, number> = {
  SE: 12,
  NO: 11,
  DK: 10,
}

export const createSsnValidator = (market: Market) => (
  ssn: string,
): boolean => {
  if (market === Market.No) {
    return /^[0-9]{2}[0,1][0-9][0-9]{2}[ ]?[0-9]{5}$/.test(ssn)
  } else if (market === Market.Dk) {
    return /^[0-9]{2}[0,1][0-9][0-9]{2}[ ]?[0-9]{4}$/.test(ssn)
  } else if (market === Market.Se) {
    return /^([1-2][0-9])?[0-9]{2}[0-1][0-9][0-9]{2}[-+]?[0-9]{4}$/.test(ssn)
  }

  throw new Error(`Expected market to be NO, DK or SE but was ${market}`)
}

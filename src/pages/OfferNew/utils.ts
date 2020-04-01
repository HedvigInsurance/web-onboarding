import { Market } from 'components/utils/CurrentLocale'
import {
  ApartmentType,
  BundledQuote,
  Campaign,
  CompleteQuote,
  NorwegianHomeContentsDetails,
  NorwegianHomeContentsType,
  NorwegianTravelDetails,
  Quote,
  QuoteBundle,
  QuoteDetails,
  SwedishApartmentQuoteDetails,
  SwedishHouseQuoteDetails,
} from 'data/graphql'
import { parse } from 'date-fns'
import { Address, OfferData } from 'pages/OfferNew/types'
import { TypeOfContract } from 'utils/insuranceDomainUtils'

export const getOfferData = (quote: Quote | QuoteBundle): OfferData => {
  if (isOfferFromCompleteQuote(quote)) {
    return {
      person: {
        ...quote,
        householdSize: getHouseholdSize(quote.quoteDetails),
        address: quoteDetailsHasAddress(quote.quoteDetails)
          ? {
              street: quote.quoteDetails.street,
              zipCode: quote.quoteDetails.zipCode,
            }
          : undefined,
      },
      quotes: [
        {
          ...quote,
          contractType: getContractType(quote.quoteDetails),
        },
      ],
      cost: quote.insuranceCost,
      startDate: quote.startDate
        ? parse(quote.startDate, 'yyyy-MM-dd', new Date())
        : undefined,
    }
  }
  if (isOfferFromQuoteBundle(quote)) {
    const firstQuote = quote.quotes[0]
    return {
      person: {
        ...firstQuote,
        householdSize: getHouseholdSize(firstQuote.quoteDetails),
        address: getAddressFromBundledQuotes(quote.quotes),
      },
      quotes: quote.quotes.map((bundleQuote) => {
        return {
          ...bundleQuote,
          contractType: getContractType(bundleQuote.quoteDetails),
        }
      }),
      cost: quote.bundleCost,
      startDate: getStartDateFromBundledQuotes(quote.quotes),
    }
  }
  throw new Error(`Invalid OfferQuote type ${quote}`)
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

// FIXME: I think this may result in some weird behaviour on refetch
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

// FIXME: Remove this
export const hasAddress = (offerData: OfferData): boolean =>
  offerData.person.address !== undefined

export const hasCurrentInsurer = (offerData: OfferData): boolean =>
  offerData.quotes.filter((quote) => quote.currentInsurer).length > 0

export const isOfferFromCompleteQuote = (
  offerQuote: Quote | QuoteBundle,
): offerQuote is CompleteQuote =>
  offerQuote.__typename === 'CompleteQuote' || false

export const isOfferFromQuoteBundle = (
  offerQuote: Quote | QuoteBundle,
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

export const getContractType = (quoteDetails: QuoteDetails): TypeOfContract => {
  if (isSwedishHouse(quoteDetails)) {
    return TypeOfContract.SeHouse
  }

  if (isSwedishApartment(quoteDetails)) {
    const map = {
      RENT: TypeOfContract.SeApartmentRent,
      BRF: TypeOfContract.SeApartmentBrf,
      STUDENT_RENT: TypeOfContract.SeApartmentStudentRent,
      STUDENT_BRF: TypeOfContract.SeApartmentStudentBrf,
    }

    if (!map[quoteDetails.type]) {
      throw new Error(
        `Get Contract Type: Invalid insurance type ${quoteDetails.type}`,
      )
    }

    return map[quoteDetails.type]
  }

  if (isNorwegianHomeContents(quoteDetails)) {
    const map = {
      RENT: NorwegianHomeContentsType.Rent,
      OWN: NorwegianHomeContentsType.Own,
    }

    // @ts-ignore
    if (!map[quoteDetails.homeType]) {
      // FIXME: We're using homeType as alias for type
      throw new Error(
        `Get Contract Type: Invalid insurance type ${quoteDetails.type}`,
      )
    }

    // @ts-ignore
    const type = map[quoteDetails.homeType]

    switch (type) {
      case NorwegianHomeContentsType.Own:
        if (quoteDetails.isYouth) {
          return TypeOfContract.NoHomeContentYouthOwn
        }
        return TypeOfContract.NoHomeContentOwn
      case NorwegianHomeContentsType.Rent:
        if (quoteDetails.isYouth) {
          return TypeOfContract.NoHomeContentYouthRent
        }
        return TypeOfContract.NoHomeContentRent
    }
  }

  if (isNorwegianTravel(quoteDetails)) {
    if (quoteDetails.isYouth) {
      return TypeOfContract.NoTravelYouth
    }
    return TypeOfContract.NoTravel
  }

  throw new Error(
    `Unsupported quoteDetails type (quoteDetails=${JSON.stringify(
      quoteDetails,
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

import {
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
  DanishAccidentDetails,
  DanishTravelDetails,
} from 'data/graphql'
import { Address, OfferData, OfferQuote } from 'pages/OfferNew/types'
import { TextKeyMap } from 'utils/textKeys'
import { Market } from 'components/utils/CurrentLocale'
import {
  birthDateFormats,
  LocaleLabel,
  locales,
} from 'components/utils/locales'

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

export const getMainQuote = (offerData: OfferData) => {
  const mainQuoteInBundle = offerData.quotes.filter((quote) => {
    const isHomeContentsQuote =
      isNorwegianHomeContents(quote.quoteDetails) ||
      isDanishHomeContents(quote.quoteDetails)
    return isHomeContentsQuote
  })

  const mainQuote = isBundle(offerData)
    ? mainQuoteInBundle[0]
    : offerData.quotes[0]

  return mainQuote
}

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
  isDanishHomeContents(quote.quoteDetails) ||
  isDanishAccident(quote.quoteDetails) ||
  isDanishTravel(quote.quoteDetails)

export const isDanish = (offerData: OfferData): boolean =>
  offerData.quotes.every((quote) => isDanishQuote(quote))

export const hasAddress = (offerData: OfferData): boolean =>
  !!offerData.person.address

export const hasCurrentInsurer = (quote: OfferQuote): boolean =>
  Boolean(quote.currentInsurer)

export const isStudent = (details: QuoteDetails) => {
  const studentQuoteTypesSe = ['STUDENT_BRF', 'STUDENT_RENT']
  if ('type' in details && studentQuoteTypesSe.includes(details.type)) {
    return true
  }

  if ('isStudent' in details) {
    return details.isStudent
  }

  return false
}

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

export const isDanishAccident = (
  details: QuoteDetails,
): details is DanishAccidentDetails =>
  details.__typename === 'DanishAccidentDetails'

export const isDanishTravel = (
  details: QuoteDetails,
): details is DanishTravelDetails =>
  details.__typename === 'DanishTravelDetails'

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

type ContractTextKeys = {
  typeOfContract: string
  typeOfResidence:
    | 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT'
    | 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT'
    | 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_HOUSE'
    | 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_UNSPECIFIED'
    | null
}

export const insuranceTypeTextKeys: Record<TypeOfContract, ContractTextKeys> = {
  [TypeOfContract.SeApartmentRent]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_RENT',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  },
  [TypeOfContract.SeApartmentBrf]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_BRF',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT',
  },
  [TypeOfContract.SeApartmentStudentRent]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_STUDENT_RENT',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  },
  [TypeOfContract.SeApartmentStudentBrf]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_STUDENT_BRF',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT',
  },
  [TypeOfContract.SeHouse]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_HOUSE',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_HOUSE',
  },
  [TypeOfContract.NoHomeContentRent]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_NO_CONTENTS_RENT',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  },
  [TypeOfContract.NoHomeContentOwn]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_NO_CONTENTS_OWN',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT',
  },
  [TypeOfContract.NoHomeContentYouthRent]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_NO_CONTENTS_YOUTH_RENT',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  },
  [TypeOfContract.NoHomeContentYouthOwn]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_NO_CONTENTS_YOUTH_OWN',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT',
  },
  [TypeOfContract.NoTravel]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_NO_TRAVEL',
    typeOfResidence: null,
  },
  [TypeOfContract.NoTravelYouth]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_NO_TRAVEL_YOUTH',
    typeOfResidence: null,
  },
  [TypeOfContract.DkHomeContentOwn]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_DK_CONTENTS_OWN',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_UNSPECIFIED',
  },
  [TypeOfContract.DkHomeContentRent]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_DK_CONTENTS_RENT',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  },
  [TypeOfContract.DkHomeContentStudentOwn]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_DK_CONTENTS_STUDENT_OWN',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_UNSPECIFIED',
  },
  [TypeOfContract.DkHomeContentStudentRent]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_DK_CONTENTS_STUDENT_RENT',
    typeOfResidence: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  },
  [TypeOfContract.DkAccident]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_DK_ACCIDENT',
    typeOfResidence: null,
  },
  [TypeOfContract.DkAccidentStudent]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_DK_ACCIDENT_STUDENT',
    typeOfResidence: null,
  },
  [TypeOfContract.DkTravel]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_DK_TRAVEL',
    typeOfResidence: null,
  },
  [TypeOfContract.DkTravelStudent]: {
    typeOfContract: 'SIDEBAR_INSURANCE_TYPE_DK_TRAVEL_STUDENT',
    typeOfResidence: null,
  },
}

export const getInsuranceTitle = (
  offerData: OfferData,
  textKeys: TextKeyMap,
) => {
  if (isBundle(offerData) && isNorwegian(offerData)) {
    return textKeys.SIDEBAR_INSURANCE_TYPE_NO_BUNDLE()
  }
  if (isBundle(offerData) && isDanish(offerData)) {
    return offerData.quotes.length === 2
      ? textKeys.SIDEBAR_INSURANCE_TYPE_DK_CONTENTS_ACCIDENT()
      : textKeys.SIDEBAR_INSURANCE_TYPE_DK_CONTENTS_ACCIDENT_TRAVEL()
  }

  return textKeys[
    insuranceTypeTextKeys[offerData.quotes[0].contractType].typeOfContract
  ]()
}

export const ssnLengthByMarket: Record<Market, number> = {
  SE: 12,
  NO: 11,
  DK: 10,
}

export const ssnRegExpByMarket: Record<Market, RegExp> = {
  SE: /^([1-2][0-9])?[0-9]{2}[0-1][0-9][0-9]{2}[-+]?[0-9]{4}$/,
  NO: /^[0-9]{2}[0,1][0-9][0-9]{2}[ ]?[0-9]{5}$/,
  DK: /^[0-9]{2}[0,1][0-9][0-9]{2}[ ]?[0-9]{4}$/,
}

export const createSsnValidator = (market: Market) => (
  ssn: string,
): boolean => {
  switch (market) {
    case Market.No:
      return ssnRegExpByMarket[Market.No].test(ssn)
    case Market.Dk:
      return ssnRegExpByMarket[Market.Dk].test(ssn)
    case Market.Se:
      return ssnRegExpByMarket[Market.Se].test(ssn)
  }
}

type FormattedBirthdateParams = {
  birthdate: string
  currentLocale: string
}

export const getFormattedBirthdate = ({
  birthdate,
  currentLocale,
}: FormattedBirthdateParams) => {
  const localeFormatRegex =
    locales[currentLocale as LocaleLabel].birthDate.formatRegex
  const hasCorrectFormat = localeFormatRegex.test(birthdate)

  if (hasCorrectFormat) {
    return birthdate
  }

  const defaultFormatRegex = birthDateFormats.default // This is the format we expect from back-end
  const hasDefaultFormat = defaultFormatRegex.test(birthdate)

  if (!hasDefaultFormat) {
    throw `Format of birthdate ${birthdate} doesn't match the expected default format YYYY-MM-DD`
  }

  const reversedBirthdate = birthdate.replace(defaultFormatRegex, '$3-$2-$1')
  const hasCorrectReversedFormat = localeFormatRegex.test(reversedBirthdate)

  return hasCorrectReversedFormat ? reversedBirthdate : birthdate
}

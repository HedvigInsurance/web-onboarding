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
  ApartmentType,
} from 'data/graphql'
import { birthdateFormats, LocaleLabel, locales } from 'l10n/locales'
import { Address, OfferData, OfferQuote } from 'pages/OfferNew/types'
import { TextKeyMap } from 'utils/textKeys'

export const getOfferData = (quoteBundle: QuoteBundle): OfferData => {
  const firstQuote = quoteBundle.quotes[0]
  return {
    person: {
      firstName: firstQuote.firstName,
      lastName: firstQuote.lastName,
      email: firstQuote.email,
      ssn: firstQuote.ssn,
      birthDate: firstQuote.birthDate,
      householdSize: getHouseholdSizeFromBundledQuotes(quoteBundle.quotes),
      address: getAddressFromBundledQuotes(quoteBundle.quotes),
    },
    quotes: quoteBundle.quotes.map((bundleQuote) => {
      return {
        id: bundleQuote.id,
        displayName: bundleQuote.displayName,
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

const getHouseholdSizeFromBundledQuotes = (quotes: BundledQuote[]): number => {
  const quoteDetails = quotes.map((quote) => quote.quoteDetails)

  for (const details of quoteDetails) {
    if ('householdSize' in details) return details.householdSize
    if ('coInsured' in details) return details.coInsured + 1
  }

  throw new Error(
    `quoteDetails ${JSON.stringify(
      quoteDetails,
    )} must include one of the following: "householdSize" or "coInsured".`,
  )
}

export const getHouseholdSize = (quoteDetails: QuoteDetails): number => {
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

const isHomeQuote = (
  quoteDetails: QuoteDetails,
): quoteDetails is
  | SwedishApartmentQuoteDetails
  | SwedishHouseQuoteDetails
  | NorwegianHomeContentsDetails
  | DanishHomeContentsDetails =>
  isNorwegianHomeContents(quoteDetails) ||
  isDanishHomeContents(quoteDetails) ||
  isSwedishHouse(quoteDetails) ||
  isSwedishApartment(quoteDetails)

export const quoteDetailsHasAddress = isHomeQuote

export const getMainQuote = (offerData: OfferData) => {
  if (isBundle(offerData)) {
    const mainQuoteInBundle = offerData.quotes.find(({ quoteDetails }) =>
      isHomeQuote(quoteDetails),
    )

    if (!mainQuoteInBundle) {
      throw new Error(
        `Bundle offer ${JSON.stringify(offerData)} is missing a home quote".`,
      )
    }

    return mainQuoteInBundle
  }

  return offerData.quotes[0]
}

export const checkIfMainQuote = (
  offerData: OfferData,
  quoteId: OfferQuote['id'],
) => {
  const mainQuote = getMainQuote(offerData)
  return mainQuote.id === quoteId
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

export const isDanishAccidentBundle = (offerData: OfferData): boolean =>
  isDanish(offerData) && offerData.quotes.length === 2

export const isDanishTravelBundle = (offerData: OfferData): boolean =>
  isDanish(offerData) && offerData.quotes.length === 3

export const isStudentOffer = (offerData: OfferData): boolean =>
  offerData.quotes.every((quote) => isStudent(quote.quoteDetails))

export const hasAddress = (offerData: OfferData): boolean =>
  !!offerData.person.address

export const hasCurrentInsurer = (quote: OfferQuote): boolean =>
  Boolean(quote.currentInsurer)

export const isStudent = (details: QuoteDetails) => {
  const studentQuoteTypesSe = [
    ApartmentType.StudentBrf,
    ApartmentType.StudentRent,
  ]
  if (
    'type' in details &&
    studentQuoteTypesSe.includes(details.type as ApartmentType)
  ) {
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

// TODO: Make Contract Types more generic
export type HomeInsuranceTypeOfContract = Exclude<
  TypeOfContract,
  | TypeOfContract.NoTravel
  | TypeOfContract.NoTravelYouth
  | TypeOfContract.DkAccident
  | TypeOfContract.DkAccidentStudent
  | TypeOfContract.DkTravel
  | TypeOfContract.DkTravelStudent
  | TypeOfContract.SeAccident
  | TypeOfContract.SeAccidentStudent
>

type TypeOfResidenceTextKeys =
  | 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT'
  | 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT'
  | 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_HOUSE'
  | 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_UNSPECIFIED'

export const typeOfResidenceTextKeys: Record<
  HomeInsuranceTypeOfContract,
  TypeOfResidenceTextKeys
> = {
  [TypeOfContract.SeApartmentRent]: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  [TypeOfContract.SeApartmentBrf]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT',
  [TypeOfContract.SeApartmentStudentRent]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  [TypeOfContract.SeApartmentStudentBrf]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT',
  [TypeOfContract.SeHouse]: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_HOUSE',
  [TypeOfContract.NoHomeContentRent]: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  [TypeOfContract.NoHomeContentOwn]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT',
  [TypeOfContract.NoHomeContentYouthRent]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  [TypeOfContract.NoHomeContentYouthOwn]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT',
  [TypeOfContract.DkHomeContentOwn]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_UNSPECIFIED',
  [TypeOfContract.DkHomeContentRent]: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  [TypeOfContract.DkHomeContentStudentOwn]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_UNSPECIFIED',
  [TypeOfContract.DkHomeContentStudentRent]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
}

// TODO: Make Contract Types more generic
type SingleInsuranceTypeOfContract = Exclude<
  TypeOfContract,
  | TypeOfContract.DkAccident
  | TypeOfContract.DkAccidentStudent
  | TypeOfContract.DkTravel
  | TypeOfContract.DkTravelStudent
  | TypeOfContract.SeAccident
  | TypeOfContract.SeAccidentStudent
>

export const getInsuranceTitle = (
  offerData: OfferData,
  textKeys: TextKeyMap,
) => {
  const { quotes } = offerData

  if (isBundle(offerData) && isNorwegian(offerData)) {
    const { quoteDetails } = offerData.quotes[0]
    const isYouthOffer = 'isYouth' in quoteDetails && quoteDetails.isYouth
    return isYouthOffer
      ? textKeys.QUOTE_TITLE_HOME_TRAVEL_YOUTH()
      : textKeys.QUOTE_TITLE_HOME_TRAVEL()
  }
  if (isBundle(offerData) && isDanish(offerData)) {
    const isStudentOffer = isStudent(quotes[0].quoteDetails)

    if (offerData.quotes.length === 2) {
      return isStudentOffer
        ? textKeys.QUOTE_TITLE_HOME_ACCIDENT_STUDENT()
        : textKeys.QUOTE_TITLE_HOME_ACCIDENT()
    }
    if (offerData.quotes.length === 3) {
      return isStudentOffer
        ? textKeys.QUOTE_TITLE_HOME_ACCIDENT_TRAVEL_STUDENT()
        : textKeys.QUOTE_TITLE_HOME_ACCIDENT_TRAVEL()
    }
  }

  const singleInsuranceTitles: Record<SingleInsuranceTypeOfContract, string> = {
    [TypeOfContract.SeApartmentRent]: textKeys.QUOTE_TITLE_RENT(),
    [TypeOfContract.SeApartmentBrf]: textKeys.QUOTE_TITLE_BRF(),
    [TypeOfContract.SeApartmentStudentRent]: textKeys.QUOTE_TITLE_RENT_STUDENT(),
    [TypeOfContract.SeApartmentStudentBrf]: textKeys.QUOTE_TITLE_BRF_STUDENT(),
    [TypeOfContract.SeHouse]: textKeys.QUOTE_TITLE_HOUSE(),
    [TypeOfContract.NoHomeContentRent]: textKeys.QUOTE_TITLE_HOME_CONTENTS(),
    [TypeOfContract.NoHomeContentOwn]: textKeys.QUOTE_TITLE_HOME_CONTENTS(),
    [TypeOfContract.NoHomeContentYouthRent]: textKeys.QUOTE_TITLE_HOME_CONTENTS_YOUTH(),
    [TypeOfContract.NoHomeContentYouthOwn]: textKeys.QUOTE_TITLE_HOME_CONTENTS_YOUTH(),
    [TypeOfContract.NoTravel]: textKeys.QUOTE_TITLE_TRAVEL(),
    [TypeOfContract.NoTravelYouth]: textKeys.QUOTE_TITLE_TRAVEL_YOUTH(),
    [TypeOfContract.DkHomeContentOwn]: textKeys.QUOTE_TITLE_HOME_CONTENTS(),
    [TypeOfContract.DkHomeContentRent]: textKeys.QUOTE_TITLE_HOME_CONTENTS(),
    [TypeOfContract.DkHomeContentStudentOwn]: textKeys.QUOTE_TITLE_HOME_CONTENTS_STUDENT(),
    [TypeOfContract.DkHomeContentStudentRent]: textKeys.QUOTE_TITLE_HOME_CONTENTS_STUDENT(),
  }

  return singleInsuranceTitles[
    quotes[0].contractType as SingleInsuranceTypeOfContract
  ]
}

type FormattedBirthdateParams = {
  birthdate: string
  currentLocale: string
}

export const getFormattedBirthdate = ({
  birthdate,
  currentLocale,
}: FormattedBirthdateParams) => {
  const localeBirthdateFormat =
    locales[currentLocale as LocaleLabel].birthdate.formatRegex

  const hasCorrectFormat = localeBirthdateFormat.test(birthdate)

  if (hasCorrectFormat) {
    return birthdate
  }

  const defaultFormat = birthdateFormats.default // This is the format we expect from back-end
  const hasExpectedFormat = defaultFormat.test(birthdate)

  if (!hasExpectedFormat) {
    throw new Error(
      `Format of birthdate "${birthdate}" doesn't match the expected default format YYYY-MM-DD`,
    )
  }

  const reversedBirthdate = birthdate.replace(defaultFormat, '$3-$2-$1')
  const hasCorrectReversedFormat = localeBirthdateFormat.test(reversedBirthdate)

  return hasCorrectReversedFormat ? reversedBirthdate : birthdate
}

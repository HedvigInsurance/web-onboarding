import {
  BundledQuote,
  Campaign,
  DanishHomeContentsDetails,
  InsurableLimit,
  InsurableLimitType,
  NorwegianHomeContentsDetails,
  NorwegianTravelDetails,
  QuoteBundle,
  QuoteDetails,
  SwedishApartmentQuoteDetails,
  SwedishHouseQuoteDetails,
  TypeOfContract,
  DanishAccidentDetails,
  DanishTravelDetails,
  QuoteBundleVariant,
  SwedishAccidentDetails,
  SwedishApartmentType,
} from 'data/graphql'
import { LocaleLabel, locales } from 'l10n/locales'
import { birthDateFormats } from 'l10n/birthDateAndSsnFormats'
import { Address, OfferData, OfferQuote } from 'pages/OfferNew/types'
import { TextKeyMap } from 'utils/textKeys'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'

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
        ...bundleQuote,
        contractType: bundleQuote.typeOfContract,
        perils: bundleQuote.contractPerils,
        insurableLimits: new Map(
          bundleQuote.insurableLimits.map((insurableLimit) => [
            insurableLimit.type,
            insurableLimit,
          ]),
        ) as ReadonlyMap<InsurableLimitType, InsurableLimit>,
      }
    }),
    cost: quoteBundle.bundleCost,
  }
}

export const isOfferDataAvailable = (
  offerData: OfferData | null,
): offerData is OfferData => {
  return offerData !== null
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

const isAccidentQuote = (
  quoteDetails: QuoteDetails,
): quoteDetails is SwedishAccidentDetails | DanishAccidentDetails =>
  isDanishAccident(quoteDetails) || isSwedishAccident(quoteDetails)

const isTravelQuote = (
  quoteDetails: QuoteDetails,
): quoteDetails is NorwegianTravelDetails | DanishTravelDetails =>
  isDanishTravel(quoteDetails) || isNorwegianTravel(quoteDetails)

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

export const isSwedishQuote = ({ quoteDetails }: OfferQuote): boolean =>
  isSwedishApartment(quoteDetails) ||
  isSwedishHouse(quoteDetails) ||
  isSwedishAccident(quoteDetails)

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

export const hasHomeQuote = (offerData: OfferData) =>
  offerData.quotes.some(({ quoteDetails }) => isHomeQuote(quoteDetails))

export const hasAccidentQuote = (offerData: OfferData) =>
  offerData.quotes.some(({ quoteDetails }) => isAccidentQuote(quoteDetails))

export const hasTravelQuote = (offerData: OfferData) =>
  offerData.quotes.some(({ quoteDetails }) => isTravelQuote(quoteDetails))

export const hasAddress = (offerData: OfferData): boolean =>
  !!offerData.person.address

export const hasCurrentInsurer = (quote: OfferQuote): boolean =>
  Boolean(quote.currentInsurer)

export const isStudent = (details: QuoteDetails) => {
  const studentQuoteTypesSe = [
    SwedishApartmentType.StudentBrf,
    SwedishApartmentType.StudentRent,
  ]
  if (
    'type' in details &&
    studentQuoteTypesSe.includes(details.type as SwedishApartmentType)
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

export const isSwedishBRF = (
  details: QuoteDetails,
): details is SwedishApartmentQuoteDetails =>
  details.__typename === 'SwedishApartmentQuoteDetails' &&
  details.type === SwedishApartmentType.Brf

export const isSwedishHouse = (
  details: QuoteDetails,
): details is SwedishHouseQuoteDetails =>
  details.__typename === 'SwedishHouseQuoteDetails'

export const isSwedishAccident = (
  details: QuoteDetails,
): details is SwedishHouseQuoteDetails =>
  details.__typename === 'SwedishAccidentDetails'

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

export const isNorwegianBundle = (offerData: OfferData): boolean =>
  isBundle(offerData) && isNorwegian(offerData)

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
  birthDate: string
  currentLocale: string
}

export const getFormattedBirthdate = ({
  birthDate,
  currentLocale,
}: FormattedBirthdateParams) => {
  const localeBirthdateFormat =
    locales[currentLocale as LocaleLabel].birthDate.formatRegex

  const hasCorrectFormat = localeBirthdateFormat.test(birthDate)

  if (hasCorrectFormat) {
    return birthDate
  }

  const defaultFormat = birthDateFormats.backEndDefault // This is the format we expect from back-end
  const hasExpectedFormat = defaultFormat.test(birthDate)

  if (!hasExpectedFormat) {
    throw new Error(
      `Format of birthDate "${birthDate}" doesn't match the expected default format YYYY-MM-DD`,
    )
  }

  const reversedBirthdate = birthDate.replace(defaultFormat, '$3-$2-$1')
  const hasCorrectReversedFormat = localeBirthdateFormat.test(reversedBirthdate)

  return hasCorrectReversedFormat ? reversedBirthdate : birthDate
}

export const isBundleVariantMatchingQuoteIds = (
  variant: QuoteBundleVariant,
  quoteIds: readonly string[],
) => {
  const variantQuoteIds = variant.bundle.quotes.map((quote) => quote.id)
  return (
    variantQuoteIds.sort().join(',') ===
    quoteIds
      .concat()
      .sort()
      .join(',')
  )
}

export const getBundleVariantFromQuoteIds = (
  quoteIds: readonly string[],
  bundleVariants: QuoteBundleVariant[],
) =>
  bundleVariants.find((variant) =>
    isBundleVariantMatchingQuoteIds(variant, quoteIds),
  )

export const getUniqueQuotesFromVariantList = (
  variants: QuoteBundleVariant[],
) => {
  const quotesWithDuplicates = variants.reduce((acc, variant) => {
    return [...acc, ...variant.bundle.quotes]
  }, [] as BundledQuote[])

  const uniqueQuoteIds = [...new Set(quotesWithDuplicates.map(({ id }) => id))]

  const uniqueQuotes = uniqueQuoteIds.map((id) =>
    quotesWithDuplicates.find((quote) => quote.id === id),
  ) as BundledQuote[]

  return uniqueQuotes
}

const isBundleVariantMatchingInsuranceTypes = (
  variant: QuoteBundleVariant,
  insuranceTypes: Array<InsuranceType>,
) => {
  const variantInsuranceTypes = getInsuranceTypesFromBundleVariant(variant)
  return (
    variantInsuranceTypes.sort().join(',') ===
    insuranceTypes
      .concat()
      .sort()
      .join(',')
  )
}

export const getBundleVariantFromInsuranceTypesWithFallback = (
  variants: Array<QuoteBundleVariant>,
  insuranceTypes: Array<InsuranceType>,
) =>
  variants.find((variant) =>
    isBundleVariantMatchingInsuranceTypes(variant, insuranceTypes),
  ) || variants?.[0]

export const getInsuranceTypesFromBundleVariant = (
  bundleVariant: QuoteBundleVariant,
) =>
  bundleVariant.bundle.quotes.map<InsuranceType>(
    (quote) => quote.data.type as InsuranceType,
  )

export const getQuoteIdsFromBundleVariant = (
  bundleVariant: QuoteBundleVariant,
) => bundleVariant.bundle.quotes.map((quote) => quote.id)

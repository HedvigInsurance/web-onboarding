import {
  BundledQuote,
  DanishHomeContentsDetails,
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
  SwedishCarDetails,
} from 'data/graphql'
import { LocaleLabel, locales } from 'l10n/locales'
import { birthDateFormats } from 'l10n/inputFormats'
import { Address, OfferData, OfferQuote } from 'pages/Offer/types'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
import { getFirstInsuranceType } from 'api/quoteBundleSelectors'

export const getOfferData = (quoteBundle: QuoteBundle): OfferData => {
  const firstQuote = quoteBundle.quotes[0]

  return {
    person: {
      firstName: firstQuote.firstName,
      lastName: firstQuote.lastName,
      email: firstQuote.email,
      ssn: firstQuote.ssn,
      phoneNumber: firstQuote.phoneNumber,
      birthDate: firstQuote.birthDate,
      householdSize: getHouseholdSizeFromBundledQuotes(quoteBundle.quotes),
      address: getAddressFromBundledQuotes(quoteBundle.quotes),
    },
    quotes: quoteBundle.quotes.map((bundleQuote) => {
      return {
        ...bundleQuote,
        contractType: bundleQuote.typeOfContract,
        perils: bundleQuote.contractPerils,
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

const getHouseholdSizeFromBundledQuotes = (
  quotes: BundledQuote[],
): number | undefined => {
  const quoteDetails = quotes.map((quote) => quote.quoteDetails)

  for (const details of quoteDetails) {
    if ('householdSize' in details) return details.householdSize
    if ('coInsured' in details) return details.coInsured + 1
  }

  return
}

const getAddressFromBundledQuotes = (
  quotes: ReadonlyArray<BundledQuote>,
): Address | null => {
  const quoteWithAddress = quotes.find(hasAddress)

  if (quoteWithAddress) {
    return {
      street: quoteWithAddress.data.street,
      zipCode: quoteWithAddress.data.zipCode,
      apartment: quoteWithAddress.data.apartment,
      floor: quoteWithAddress.data.floor,
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
  isDanishAccident(quoteDetails) ||
  isSwedishAccident(quoteDetails) ||
  isNorwegianAccident(quoteDetails)

const isTravelQuote = (
  quoteDetails: QuoteDetails,
): quoteDetails is NorwegianTravelDetails | DanishTravelDetails =>
  isDanishTravel(quoteDetails) || isNorwegianTravel(quoteDetails)

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

export const isBundle = (offerData: OfferData): boolean =>
  offerData.quotes.length > 1

export const isSwedishQuote = ({ quoteDetails }: OfferQuote): boolean =>
  isSwedishApartment(quoteDetails) ||
  isSwedishHouse(quoteDetails) ||
  isSwedishAccident(quoteDetails)

export const isSwedish = (offerData: OfferData): boolean =>
  offerData.quotes.every((quote) => isSwedishQuote(quote))

export const isNorwegianQuote = (quote: OfferQuote): boolean =>
  isNorwegianHomeContents(quote.quoteDetails) ||
  isNorwegianTravel(quote.quoteDetails) ||
  isNorwegianAccident(quote.quoteDetails)

export const isNorwegian = (offerData: OfferData): boolean =>
  offerData.quotes.every((quote) => isNorwegianQuote(quote))

export const isNorwegianHomeTravelBundle = (offerData: OfferData): boolean =>
  isNorwegian(offerData) &&
  offerData.quotes.length === 2 &&
  hasTravelQuote(offerData)

export const isNorwegianHomeAccidentBundle = (offerData: OfferData): boolean =>
  isNorwegian(offerData) &&
  offerData.quotes.length === 2 &&
  hasAccidentQuote(offerData)

export const isNorwegianHomeTravelAccidentBundle = (
  offerData: OfferData,
): boolean =>
  isNorwegian(offerData) &&
  offerData.quotes.length === 3 &&
  hasTravelQuote(offerData) &&
  hasAccidentQuote(offerData)

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

export const isStudentOffer = (offerData: OfferData): boolean => {
  const quotesToBeExcluded = [TypeOfContract.NoAccident]

  return offerData.quotes
    .filter((quote) => !quotesToBeExcluded.includes(quote.contractType))
    .every((quote) => isStudent(quote.quoteDetails))
}

export const hasHomeQuote = (offerData: OfferData) =>
  offerData.quotes.some(({ quoteDetails }) => isHomeQuote(quoteDetails))

export const hasAccidentQuote = (offerData: OfferData) =>
  offerData.quotes.some(({ quoteDetails }) => isAccidentQuote(quoteDetails))

export const hasTravelQuote = (offerData: OfferData) =>
  offerData.quotes.some(({ quoteDetails }) => isTravelQuote(quoteDetails))

export const hasCurrentInsurer = (quote: OfferQuote): boolean =>
  Boolean(quote.currentInsurer)

export const isCurrentInsurerSwichable = (quote: OfferQuote): boolean =>
  Boolean(quote.currentInsurer?.switchable)

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

export const isNorwegianAccident = (
  details: QuoteDetails,
): details is NorwegianHomeContentsDetails =>
  details.__typename === 'NorwegianAccidentDetails'

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

// TODO: Make Contract Types more generic
export type HomeInsuranceTypeOfContract = Exclude<
  TypeOfContract,
  | TypeOfContract.NoTravel
  | TypeOfContract.NoTravelYouth
  | TypeOfContract.NoTravelStudent
  | TypeOfContract.NoAccident
  | TypeOfContract.DkAccident
  | TypeOfContract.DkAccidentStudent
  | TypeOfContract.DkTravel
  | TypeOfContract.DkTravelStudent
  | TypeOfContract.SeAccident
  | TypeOfContract.SeAccidentStudent
  | TypeOfContract.SeCarFull
  | TypeOfContract.SeCarHalf
  | TypeOfContract.SeCarTraffic
  | TypeOfContract.SeQasaLongTermRental
  | TypeOfContract.SeQasaShortTermRental
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
  [TypeOfContract.SeApartmentBrfTrial]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT',
  [TypeOfContract.SeApartmentRentTrial]: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  [TypeOfContract.SeHouse]: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_HOUSE',
  [TypeOfContract.NoHouse]: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_HOUSE',
  [TypeOfContract.DkHouse]: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_HOUSE',
  [TypeOfContract.NoHomeContentRent]: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  [TypeOfContract.NoHomeContentOwn]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT',
  [TypeOfContract.NoHomeContentYouthRent]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  [TypeOfContract.NoHomeContentStudentRent]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  [TypeOfContract.NoHomeContentYouthOwn]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT',
  [TypeOfContract.NoHomeContentStudentOwn]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_APARTMENT',
  [TypeOfContract.DkHomeContentOwn]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_UNSPECIFIED',
  [TypeOfContract.DkHomeContentRent]: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
  [TypeOfContract.DkHomeContentStudentOwn]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_UNSPECIFIED',
  [TypeOfContract.DkHomeContentStudentRent]:
    'CHECKOUT_DETAILS_RESIDENCE_TYPE_RENT',
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

const isBundleVariantMatchingContractTypes = (
  variant: QuoteBundleVariant,
  contractTypes: Array<TypeOfContract>,
) => {
  const variantContractType = getTypeOfContractFromBundleVariant(variant)
  return (
    variantContractType.sort().join(',') ===
    contractTypes
      .concat()
      .sort()
      .join(',')
  )
}

export const getBundleVariantFromInsuranceTypesWithFallback = (
  variants: Array<QuoteBundleVariant>,
  insuranceTypes: Array<InsuranceType> | Array<TypeOfContract>,
) => {
  // For some insurances (like Car), all insurance types are the same between TRAFFIC, HALF, and FULL.
  // In those cases we need to search on TypeOfContract instead.
  if (allBundleVariantsHaveSameInsuranceType(variants)) {
    const matchingContractType = variants.find((variant) =>
      isBundleVariantMatchingContractTypes(
        variant,
        (insuranceTypes as unknown) as TypeOfContract[],
      ),
    )

    if (matchingContractType) return matchingContractType
  }

  const matchingVariant = variants.find((variant) =>
    isBundleVariantMatchingInsuranceTypes(
      variant,
      (insuranceTypes as unknown) as InsuranceType[],
    ),
  )

  if (matchingVariant) return matchingVariant

  // Fallback to the variant with the fewest quotes
  return [...variants].sort(
    (a, b) => a.bundle.quotes.length - b.bundle.quotes.length,
  )[0]
}

export const getInsuranceTypesFromBundleVariant = (
  bundleVariant: QuoteBundleVariant,
) =>
  bundleVariant.bundle.quotes.map<InsuranceType>(
    (quote) => quote.data.type as InsuranceType,
  )

export const getQuoteIdsFromBundleVariant = (
  bundleVariant: QuoteBundleVariant,
) => bundleVariant.bundle.quotes.map((quote) => quote.id)

export const getTypeOfContractFromBundleVariant = (
  bundleVariant: QuoteBundleVariant,
) => bundleVariant.bundle.quotes.map((quote) => quote.typeOfContract)

const allBundleVariantsHaveSameInsuranceType = (
  bundleVariants: Array<QuoteBundleVariant>,
) => {
  if (bundleVariants.length <= 1) {
    return false
  }

  const insuranceType = getFirstInsuranceType(bundleVariants?.[0].bundle)

  if (!insuranceType) return false

  return bundleVariants.every((bundleVariant) =>
    bundleVariant.bundle.quotes.every(
      (quote) => quote.data.type === insuranceType,
    ),
  )
}

export const SE_CAR_REGISTRATION_NUMBER_REGEX = /^[A-Za-z]{3}[0-9]{2}[A-Za-z0-9]{1}$/

export const parseAddress = (address: Address) => {
  const { street, apartment, floor } = address

  return street.concat(floor ?? '').concat(apartment ?? '')
}

const hasAddress = (quote: BundledQuote) => {
  const interestedInFields = ['street', 'zipCode'] as const
  return interestedInFields.every((field) => quote.data[field] != null)
}

const formatCarInfo = (quote: BundledQuote) => {
  return (
    [
      (quote.quoteDetails as SwedishCarDetails)?.info?.makeAndModel,
      (quote.quoteDetails as SwedishCarDetails)?.info?.model,
    ]
      .filter((x) => x)
      .join(' ')
      // split up every word so that we can remove duplicates between makeAndModel and model
      .split(' ')
      .filter((word, index, allWords) => index === allWords.indexOf(word))
      .join(' ')
      .trim()
  )
}

export const getCarMakeAndOrModel = (quotes: BundledQuote[]) => {
  const quoteWithCarInfo = quotes.find(
    (quote) =>
      (quote.quoteDetails as SwedishCarDetails)?.info?.makeAndModel ||
      (quote.quoteDetails as SwedishCarDetails)?.info?.model,
  )

  return quoteWithCarInfo ? formatCarInfo(quoteWithCarInfo) : ''
}

export const formatCarRegistrationNumberSE = (registrationNumber: string) => {
  if (!SE_CAR_REGISTRATION_NUMBER_REGEX.test(registrationNumber))
    return registrationNumber

  const letters = registrationNumber.match(/[A-Za-z]{3}/)?.[0] || ''

  return registrationNumber.replace(letters, `${letters} `).toUpperCase()
}

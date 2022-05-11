import { QuoteBundle, TypeOfContract, BundledQuote } from 'data/graphql'
import { MarketLabel } from 'shared/clientConfig'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
import { OfferPersonInfo, Address } from '../pages/OfferNew/types'
import * as quoteSelector from './quoteSelector'

export const isMultiQuote = (bundle: QuoteBundle | undefined) => {
  return bundle ? bundle.quotes.length > 1 : false
}

export const isSingleStartDate = (
  bundle: QuoteBundle | undefined,
  marketLabel: MarketLabel,
) => {
  return bundle ? isMultiQuote(bundle) && marketLabel === 'DK' : false
}

export const getQuotes = (bundle: QuoteBundle | undefined) => {
  return bundle?.quotes ?? []
}

export const hasAccident = (bundle: QuoteBundle) =>
  bundle.quotes.some((quote) => quoteSelector.isAccident(quote))

export const hasTravel = (bundle: QuoteBundle) =>
  bundle.quotes.some((quote) => quoteSelector.isTravel(quote))

export const isDanish = (bundle: QuoteBundle) =>
  bundle.quotes.every((quote) => quoteSelector.isDanish(quote))

export const isDanishAccident = (bundle: QuoteBundle) =>
  isDanish(bundle) &&
  bundle.quotes.length === 2 &&
  bundle.quotes.some((quote) => quoteSelector.isDanishAccident(quote))

export const isDanishTravel = (bundle: QuoteBundle) =>
  isDanish(bundle) &&
  bundle.quotes.length === 3 &&
  bundle.quotes.some((quote) => quoteSelector.isDanishTravel(quote))

export const isNorwegian = (bundle: QuoteBundle) =>
  bundle.quotes.every((quote) => quoteSelector.isNorwegian(quote))

export const isStudentOffer = (bundle: QuoteBundle) =>
  bundle.quotes.every((quote) => quoteSelector.isStudent(quote))

export const isYouthOffer = (bundle: QuoteBundle): boolean => {
  // there is no youth accident insurance by itself
  const quotesToBeExcluded = [TypeOfContract.NoAccident]

  return bundle.quotes
    .filter((quote) => !quotesToBeExcluded.includes(quote.typeOfContract))
    .every((quote) => quote.data.isYouth === true)
}

const HOME_HOUSE_INSURANCE_TYPES: Array<InsuranceType> = [
  InsuranceType.DANISH_HOME_CONTENT,
  InsuranceType.NORWEGIAN_HOME_CONTENT,
  InsuranceType.NORWEGIAN_HOUSE,
  InsuranceType.SWEDISH_APARTMENT,
  InsuranceType.SWEDISH_HOUSE,
]

export const getMainQuote = (bundle: QuoteBundle) => {
  if (isMultiQuote(bundle)) {
    const mainQuoteInBundle = bundle.quotes.find((quote) =>
      HOME_HOUSE_INSURANCE_TYPES.includes(quote.data.type),
    )

    if (!mainQuoteInBundle) {
      throw new Error(
        `Bundle offer ${JSON.stringify(
          bundle,
        )} is missing a home/house quote".`,
      )
    }

    return mainQuoteInBundle
  }

  return bundle.quotes[0]
}

export const getDiscountAmount = (bundle: QuoteBundle) => {
  return bundle.bundleCost.monthlyDiscount.amount
}

export const getBundleCurrency = (bundle: QuoteBundle) => {
  return bundle.bundleCost.monthlyNet.currency
}

export const getTotalBundleCost = (bundle: QuoteBundle) => {
  return bundle.bundleCost.monthlyNet.amount
}

export const getOfferPersonInfo = (bundle: QuoteBundle): OfferPersonInfo => {
  const firstQuote = bundle.quotes[0]

  return {
    firstName: firstQuote.firstName,
    lastName: firstQuote.lastName,
    email: firstQuote.email,
    ssn: firstQuote.ssn,
    phoneNumber: firstQuote.phoneNumber,
    birthDate: firstQuote.birthDate,
    householdSize: getHouseholdSizeFromBundledQuotes(bundle.quotes),
    address: getAddressFromBundledQuotes(bundle.quotes),
  }
}

export const includesExactlyAllContracts = (
  bundle: QuoteBundle,
  insuranceTypes: InsuranceType[],
) => {
  const bundleInsuranceTypes = bundle.quotes.map((quote) => quote.data.type)

  return bundleInsuranceTypes.every((type) => insuranceTypes.includes(type))
}

export const getFirstInsuranceType = (bundle: QuoteBundle) => {
  return bundle.quotes?.[0]?.data.type
}

export const hasCar = (bundle: BundledQuote[]) => {
  return bundle.some((quote) => quote.data.type === 'SWEDISH_CAR')
}

const getHouseholdSizeFromBundledQuotes = (
  quotes: ReadonlyArray<BundledQuote>,
): number | undefined => {
  const quotesData = quotes.map((quote) => quote.data)

  for (const data of quotesData) {
    if ('householdSize' in data) return data.householdSize as number
    if ('coInsured' in data) return (data.coInsured + 1) as number
    if ('numberCoInsured' in data) return (data.numberCoInsured + 1) as number
  }

  return
}

type QuoteWithAddress = Omit<BundledQuote, 'data'> & {
  data: { zipCode: string; street: string }
}

const quoteHasAddress = (quote: BundledQuote): quote is QuoteWithAddress => {
  const addressRelatedKeys = ['zipCode', 'street']
  return addressRelatedKeys.every((key) => key in quote.data)
}

const getAddressFromBundledQuotes = (
  quotes: ReadonlyArray<BundledQuote>,
): Address | null => {
  const quoteWithAddress = quotes.find(quoteHasAddress)

  if (quoteWithAddress) {
    return {
      street: quoteWithAddress.data.street,
      zipCode: quoteWithAddress.data.zipCode,
    }
  }

  return null
}

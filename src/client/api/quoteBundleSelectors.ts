import { QuoteBundle } from 'data/graphql'
import { MarketLabel } from 'shared/clientConfig'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
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

export const isYouthOffer = (bundle: QuoteBundle): boolean =>
  bundle.quotes.every((quote) => quote.data.isYouth === true)

const HOME_HOUSE_INSURANCE_TYPES: Array<InsuranceType> = [
  InsuranceType.DANISH_HOME_CONTENT,
  InsuranceType.NORWEGIAN_HOME_CONTENT,
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

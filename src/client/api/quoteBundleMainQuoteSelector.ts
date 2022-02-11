import { QuoteBundle } from 'data/graphql'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
import { quoteBundleIsBundleSelector } from './quoteBundleIsBundleSelector'

const HOME_HOUSE_INSURANCE_TYPES: Array<InsuranceType> = [
  InsuranceType.DANISH_HOME_CONTENT,
  InsuranceType.NORWEGIAN_HOME_CONTENT,
  InsuranceType.SWEDISH_APARTMENT,
  InsuranceType.SWEDISH_HOUSE,
]

export const quoteBundleMainQuoteSelector = (bundle: QuoteBundle) => {
  if (quoteBundleIsBundleSelector(bundle)) {
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

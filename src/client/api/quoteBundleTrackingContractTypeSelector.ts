import { QuoteBundle } from 'data/graphql'
import {
  TrackableContractType,
  SeBundleTypes,
  NoComboTypes,
  DkBundleTypes,
} from 'utils/tracking/tracking'
import { quoteBundleIsDanishAccident } from './quoteBundleIsDanishAccident'
import * as quoteSelector from './quoteSelector'
import { quoteBundleIsBundleSelector } from './quoteBundleIsBundleSelector'
import { quoteBundleMainQuoteSelector } from './quoteBundleMainQuoteSelector'
import { quoteBundleIsStudentOffer } from './quoteBundleIsStudentOffer'
import { quoteBundleIsisYouthOffer } from './quoteBundleIsYouthOffer'
import { quoteBundleIsDanishTravel } from './quoteBundleIsDanishTravel'

export const quoteBundleTrackingContractType = (
  bundle: QuoteBundle,
): TrackableContractType => {
  const mainQuote = quoteBundleMainQuoteSelector(bundle)

  if (quoteBundleIsBundleSelector(bundle)) {
    if (quoteSelector.isSwedishHouse(mainQuote)) {
      return SeBundleTypes.SeHomeAccidentBundleHouse
    }

    if (quoteSelector.isSwedishApartment(mainQuote)) {
      if (quoteSelector.isSwedishBRF(mainQuote)) {
        return quoteBundleIsStudentOffer(bundle)
          ? SeBundleTypes.SeHomeAccidentBundleStudentBrf
          : SeBundleTypes.SeHomeAccidentBundleBrf
      } else {
        return quoteBundleIsStudentOffer(bundle)
          ? SeBundleTypes.SeHomeAccidentBundleStudentRent
          : SeBundleTypes.SeHomeAccidentBundleRent
      }
    }
    if (quoteSelector.isNorwegianHomeContents(mainQuote)) {
      return quoteBundleIsisYouthOffer(bundle)
        ? NoComboTypes.NoComboYouth
        : NoComboTypes.NoCombo
    }

    if (quoteBundleIsDanishAccident(bundle)) {
      return quoteBundleIsStudentOffer(bundle)
        ? DkBundleTypes.DkAccidentBundleStudent
        : DkBundleTypes.DkAccidentBundle
    }

    if (quoteBundleIsDanishTravel(bundle)) {
      return quoteBundleIsStudentOffer(bundle)
        ? DkBundleTypes.DkTravelBundleStudent
        : DkBundleTypes.DkTravelBundle
    }
  }

  return mainQuote.typeOfContract
}

import { QuoteBundle } from 'data/graphql'
import {
  TrackableContractType,
  SeBundleTypes,
  NoComboTypes,
  DkBundleTypes,
} from 'utils/tracking/tracking'
import * as quoteSelector from './quoteSelector'
import * as bundleSelecor from './quoteBundleSelectors'

export const quoteBundleTrackingContractType = (
  bundle: QuoteBundle,
): TrackableContractType => {
  const mainQuote = bundleSelecor.getMainQuote(bundle)

  if (bundleSelecor.isMultiQuote(bundle)) {
    if (quoteSelector.isSwedishHouse(mainQuote)) {
      return SeBundleTypes.SeHomeAccidentBundleHouse
    }

    if (quoteSelector.isSwedishApartment(mainQuote)) {
      if (quoteSelector.isSwedishBRF(mainQuote)) {
        return bundleSelecor.isStudentOffer(bundle)
          ? SeBundleTypes.SeHomeAccidentBundleStudentBrf
          : SeBundleTypes.SeHomeAccidentBundleBrf
      } else {
        return bundleSelecor.isStudentOffer(bundle)
          ? SeBundleTypes.SeHomeAccidentBundleStudentRent
          : SeBundleTypes.SeHomeAccidentBundleRent
      }
    }
    if (quoteSelector.isNorwegianHomeContents(mainQuote)) {
      return bundleSelecor.isYouthOffer(bundle)
        ? NoComboTypes.NoComboYouth
        : NoComboTypes.NoCombo
    }

    if (bundleSelecor.isDanishAccident(bundle)) {
      return bundleSelecor.isStudentOffer(bundle)
        ? DkBundleTypes.DkAccidentBundleStudent
        : DkBundleTypes.DkAccidentBundle
    }

    if (bundleSelecor.isDanishTravel(bundle)) {
      return bundleSelecor.isStudentOffer(bundle)
        ? DkBundleTypes.DkTravelBundleStudent
        : DkBundleTypes.DkTravelBundle
    }
  }

  return mainQuote.typeOfContract
}

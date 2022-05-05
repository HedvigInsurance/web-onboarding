import { QuoteBundle } from 'data/graphql'
import {
  TrackableContractType,
  SeBundleTypes,
  NoBundleTypes,
  DkBundleTypes,
} from 'utils/tracking/gtm/tracking'
import { InsuranceType } from '../utils/hooks/useSelectedInsuranceTypes'
import * as quoteSelector from './quoteSelector'
import * as bundleSelector from './quoteBundleSelectors'

export const quoteBundleTrackingContractType = (
  bundle: QuoteBundle,
): TrackableContractType => {
  const mainQuote = bundleSelector.getMainQuote(bundle)

  if (bundleSelector.isMultiQuote(bundle)) {
    if (quoteSelector.isSwedishHouse(mainQuote)) {
      return SeBundleTypes.SeHomeAccidentBundleHouse
    }

    if (quoteSelector.isSwedishApartment(mainQuote)) {
      if (quoteSelector.isSwedishBRF(mainQuote)) {
        return bundleSelector.isStudentOffer(bundle)
          ? SeBundleTypes.SeHomeAccidentBundleStudentBrf
          : SeBundleTypes.SeHomeAccidentBundleBrf
      } else {
        return bundleSelector.isStudentOffer(bundle)
          ? SeBundleTypes.SeHomeAccidentBundleStudentRent
          : SeBundleTypes.SeHomeAccidentBundleRent
      }
    }

    if (
      bundleSelector.includesExactlyAllContracts(bundle, [
        InsuranceType.NORWEGIAN_HOME_CONTENT,
        InsuranceType.NORWEGIAN_TRAVEL,
      ])
    ) {
      return bundleSelector.isYouthOffer(bundle)
        ? NoBundleTypes.NoHomeTravelBundleYouth
        : NoBundleTypes.NoHomeTravelBundle
    }

    if (
      bundleSelector.includesExactlyAllContracts(bundle, [
        InsuranceType.NORWEGIAN_HOME_CONTENT,
        InsuranceType.NORWEGIAN_ACCIDENT,
      ])
    ) {
      return bundleSelector.isYouthOffer(bundle)
        ? NoBundleTypes.NoHomeAccidentBundleYouth
        : NoBundleTypes.NoHomeAccidentBundle
    }

    if (
      bundleSelector.includesExactlyAllContracts(bundle, [
        InsuranceType.NORWEGIAN_HOME_CONTENT,
        InsuranceType.NORWEGIAN_ACCIDENT,
        InsuranceType.NORWEGIAN_TRAVEL,
      ])
    ) {
      return bundleSelector.isYouthOffer(bundle)
        ? NoBundleTypes.NoHomeTravelAccidentBundleYouth
        : NoBundleTypes.NoHomeTravelAccidentBundle
    }

    if (
      bundleSelector.includesExactlyAllContracts(bundle, [
        InsuranceType.DANISH_HOME_CONTENT,
        InsuranceType.DANISH_ACCIDENT,
      ])
    ) {
      return bundleSelector.isStudentOffer(bundle)
        ? DkBundleTypes.DkAccidentBundleStudent
        : DkBundleTypes.DkAccidentBundle
    }

    if (
      bundleSelector.includesExactlyAllContracts(bundle, [
        InsuranceType.DANISH_HOME_CONTENT,
        InsuranceType.DANISH_ACCIDENT,
        InsuranceType.DANISH_TRAVEL,
      ])
    ) {
      return bundleSelector.isStudentOffer(bundle)
        ? DkBundleTypes.DkTravelBundleStudent
        : DkBundleTypes.DkTravelBundle
    }
  }

  return mainQuote.typeOfContract
}

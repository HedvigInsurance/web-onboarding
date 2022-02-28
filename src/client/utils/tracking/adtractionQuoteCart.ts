import md5 from 'md5'
import { QuoteBundle } from 'data/graphql'
import * as quoteSelector from 'api/quoteSelector'
import * as quoteBundleSelector from 'api/quoteBundleSelectors'
import {
  ADTRACTION_CONTRACT_VALUES,
  TypeOfContractExcludedUnused,
} from './adtraction'
import { NoComboTypes, DkBundleTypes, SeBundleTypes } from './tracking'

const getBundleAdtractionProductValue = (bundle: QuoteBundle) => {
  const mainQuote = quoteBundleSelector.getMainQuote(bundle)

  if (quoteBundleSelector.isMultiQuote(bundle)) {
    if (quoteSelector.isSwedishHouse(mainQuote)) {
      return ADTRACTION_CONTRACT_VALUES[SeBundleTypes.SeHomeAccidentBundleHouse]
    }

    if (quoteSelector.isSwedishApartment(mainQuote)) {
      if (quoteSelector.isSwedishBRF(mainQuote)) {
        return quoteBundleSelector.isStudentOffer(bundle)
          ? ADTRACTION_CONTRACT_VALUES[
              SeBundleTypes.SeHomeAccidentBundleStudentBrf
            ]
          : ADTRACTION_CONTRACT_VALUES[SeBundleTypes.SeHomeAccidentBundleBrf]
      } else {
        return quoteBundleSelector.isStudentOffer(bundle)
          ? ADTRACTION_CONTRACT_VALUES[
              SeBundleTypes.SeHomeAccidentBundleStudentRent
            ]
          : ADTRACTION_CONTRACT_VALUES[SeBundleTypes.SeHomeAccidentBundleRent]
      }
    }

    if (quoteBundleSelector.isNorwegian(bundle)) {
      return quoteBundleSelector.isYouthOffer(bundle)
        ? ADTRACTION_CONTRACT_VALUES[NoComboTypes.NoComboYouth]
        : ADTRACTION_CONTRACT_VALUES[NoComboTypes.NoCombo]
    }

    if (quoteBundleSelector.isDanishAccident(bundle)) {
      return quoteBundleSelector.isStudentOffer(bundle)
        ? ADTRACTION_CONTRACT_VALUES[DkBundleTypes.DkAccidentBundleStudent]
        : ADTRACTION_CONTRACT_VALUES[DkBundleTypes.DkAccidentBundle]
    }

    if (quoteBundleSelector.isDanishTravel(bundle)) {
      return quoteBundleSelector.isStudentOffer(bundle)
        ? ADTRACTION_CONTRACT_VALUES[DkBundleTypes.DkTravelBundleStudent]
        : ADTRACTION_CONTRACT_VALUES[DkBundleTypes.DkTravelBundle]
    }
  }

  return ADTRACTION_CONTRACT_VALUES[
    (mainQuote.typeOfContract as unknown) as TypeOfContractExcludedUnused
  ]
}

export const adtractionQuoteCart = (
  orderValue: number,
  orderId: string,
  emailAddress: string,
  bundle: QuoteBundle,
  couponCode?: string,
) => {
  try {
    const adt = ADT
    adt.Tag = adt.Tag || {}
    adt.Tag.t = 3
    adt.Tag.c = bundle.bundleCost.monthlyGross.currency
    adt.Tag.am = orderValue
    adt.Tag.ti = orderId
    adt.Tag.xd = md5(emailAddress)

    if (couponCode) {
      adt.Tag.cpn = couponCode
    }

    adt.Tag.tp = getBundleAdtractionProductValue(bundle)
    adt.Tag.doEvent()
  } catch (e) {
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      ;(window as any).Sentry.captureMessage(e)
    }
  }
}

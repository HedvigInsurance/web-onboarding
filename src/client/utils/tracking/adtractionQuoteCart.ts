import md5 from 'md5'
import { quoteBundleIsisYouthOffer } from 'api/quoteBundleIsYouthOffer'
import { quoteBundleIsNorwegian } from 'api/quoteBundleIsNorwegian'
import { quoteBundleIsStudentOffer } from 'api/quoteBundleIsStudentOffer'
import { quoteBundleMainQuoteSelector } from 'api/quoteBundleMainQuoteSelector'
import { QuoteBundle } from 'data/graphql'
import { quoteBundleIsBundleSelector } from 'api/quoteBundleIsBundleSelector'
import * as quoteSelector from 'api/quoteSelector'
import { quoteBundleIsDanishAccident } from 'api/quoteBundleIsDanishAccident'
import { quoteBundleIsDanishTravel } from './../../api/quoteBundleIsDanishTravel'
import {
  ADTRACTION_CONTRACT_VALUES,
  TypeOfContractExcludedUnused,
} from './adtraction'
import { NoComboTypes, DkBundleTypes, SeBundleTypes } from './tracking'

const getBundleAdtractionProductValue = (bundle: QuoteBundle) => {
  const mainQuote = quoteBundleMainQuoteSelector(bundle)

  if (quoteBundleIsBundleSelector(bundle)) {
    if (quoteSelector.isSwedishHouse(mainQuote)) {
      return ADTRACTION_CONTRACT_VALUES[SeBundleTypes.SeHomeAccidentBundleHouse]
    }

    if (quoteSelector.isSwedishApartment(mainQuote)) {
      if (quoteSelector.isSwedishBRF(mainQuote)) {
        return quoteBundleIsStudentOffer(bundle)
          ? ADTRACTION_CONTRACT_VALUES[
              SeBundleTypes.SeHomeAccidentBundleStudentBrf
            ]
          : ADTRACTION_CONTRACT_VALUES[SeBundleTypes.SeHomeAccidentBundleBrf]
      } else {
        return quoteBundleIsStudentOffer(bundle)
          ? ADTRACTION_CONTRACT_VALUES[
              SeBundleTypes.SeHomeAccidentBundleStudentRent
            ]
          : ADTRACTION_CONTRACT_VALUES[SeBundleTypes.SeHomeAccidentBundleRent]
      }
    }

    if (quoteBundleIsNorwegian(bundle)) {
      return quoteBundleIsisYouthOffer(bundle)
        ? ADTRACTION_CONTRACT_VALUES[NoComboTypes.NoComboYouth]
        : ADTRACTION_CONTRACT_VALUES[NoComboTypes.NoCombo]
    }

    if (quoteBundleIsDanishAccident(bundle)) {
      return quoteBundleIsStudentOffer(bundle)
        ? ADTRACTION_CONTRACT_VALUES[DkBundleTypes.DkAccidentBundleStudent]
        : ADTRACTION_CONTRACT_VALUES[DkBundleTypes.DkAccidentBundle]
    }

    if (quoteBundleIsDanishTravel(bundle)) {
      return quoteBundleIsStudentOffer(bundle)
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

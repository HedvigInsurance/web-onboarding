import md5 from 'md5'
import { TypeOfContract } from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import {
  isBundle,
  isNorwegian,
  isYouth,
  isDanishAccidentBundle,
  isStudentOffer,
  isDanishTravelBundle,
  getMainQuote,
  isSwedishHouse,
  isSwedishApartment,
  isSwedishBRF,
} from 'pages/OfferNew/utils'
import { NoComboTypes, DkBundleTypes, SeBundleTypes } from './tracking'

// Exclude single contract types that are only sold as part of bundles
export type TypeOfContractExcludedUnused = Exclude<
  TypeOfContract | NoComboTypes | DkBundleTypes | SeBundleTypes,
  | TypeOfContract.DkAccident
  | TypeOfContract.DkAccidentStudent
  | TypeOfContract.DkTravel
  | TypeOfContract.DkTravelStudent
  | TypeOfContract.SeAccident
  | TypeOfContract.SeAccidentStudent
>

export const ADTRACTION_CONTRACT_VALUES: Record<
  TypeOfContractExcludedUnused,
  number
> = {
  SE_HOUSE: 1477448913,
  SE_APARTMENT_BRF: 1417356498,
  SE_APARTMENT_STUDENT_BRF: 1423041022,
  SE_APARTMENT_RENT: 1417356528,
  SE_APARTMENT_STUDENT_RENT: 1412601108,
  SE_ACCIDENT_BUNDLE_BRF: 1660489918,
  SE_ACCIDENT_BUNDLE_RENT: 1660489989,
  SE_ACCIDENT_BUNDLE_STUDENT_BRF: 1660489963,
  SE_ACCIDENT_BUNDLE_STUDENT_RENT: 1660490018,
  SE_ACCIDENT_BUNDLE_HOUSE: 1660490052,
  NO_HOME_CONTENT_OWN: 1492623645,
  NO_HOME_CONTENT_RENT: 1492623645,
  NO_HOME_CONTENT_YOUTH_OWN: 1492623719,
  NO_HOME_CONTENT_YOUTH_RENT: 1492623719,
  NO_TRAVEL: 1492623742,
  NO_TRAVEL_YOUTH: 1492623785,
  NO_COMBO: 1492623841,
  NO_COMBO_YOUTH: 1492623841,
  DK_HOME_CONTENT_OWN: 1589961514,
  DK_HOME_CONTENT_RENT: 1589961514,
  DK_HOME_CONTENT_STUDENT_OWN: 1589962112,
  DK_HOME_CONTENT_STUDENT_RENT: 1589962112,
  DK_ACCIDENT_BUNDLE: 1589962152,
  DK_ACCIDENT_BUNDLE_STUDENT: 1613410547,
  DK_TRAVEL_BUNDLE: 1589962256,
  DK_TRAVEL_BUNDLE_STUDENT: 1613410728,
}

export const getBundleAdtractionProductValue = (offerData: OfferData) => {
  if (isBundle(offerData)) {
    const { quoteDetails: homeQuoteDetails } = getMainQuote(offerData)

    if (isSwedishHouse(homeQuoteDetails)) {
      return ADTRACTION_CONTRACT_VALUES[SeBundleTypes.SeHomeAccidentBundleHouse]
    }

    if (isSwedishApartment(homeQuoteDetails)) {
      if (isSwedishBRF(homeQuoteDetails)) {
        return isStudentOffer(offerData)
          ? ADTRACTION_CONTRACT_VALUES[
              SeBundleTypes.SeHomeAccidentBundleStudentBrf
            ]
          : ADTRACTION_CONTRACT_VALUES[SeBundleTypes.SeHomeAccidentBundleBrf]
      } else {
        return isStudentOffer(offerData)
          ? ADTRACTION_CONTRACT_VALUES[
              SeBundleTypes.SeHomeAccidentBundleStudentRent
            ]
          : ADTRACTION_CONTRACT_VALUES[SeBundleTypes.SeHomeAccidentBundleRent]
      }
    }

    if (isNorwegian(offerData)) {
      return isYouth(offerData)
        ? ADTRACTION_CONTRACT_VALUES[NoComboTypes.NoComboYouth]
        : ADTRACTION_CONTRACT_VALUES[NoComboTypes.NoCombo]
    }

    if (isDanishAccidentBundle(offerData)) {
      return isStudentOffer(offerData)
        ? ADTRACTION_CONTRACT_VALUES[DkBundleTypes.DkAccidentBundleStudent]
        : ADTRACTION_CONTRACT_VALUES[DkBundleTypes.DkAccidentBundle]
    }

    if (isDanishTravelBundle(offerData)) {
      return isStudentOffer(offerData)
        ? ADTRACTION_CONTRACT_VALUES[DkBundleTypes.DkTravelBundleStudent]
        : ADTRACTION_CONTRACT_VALUES[DkBundleTypes.DkTravelBundle]
    }
  }
  return ADTRACTION_CONTRACT_VALUES[
    getMainQuote(offerData).contractType as TypeOfContractExcludedUnused
  ]
}

export const adtraction = (
  orderValue: number,
  orderId: string,
  emailAddress: string,
  offerData: OfferData,
  couponCode?: string,
) => {
  try {
    const adt = ADT
    adt.Tag = adt.Tag || {}
    adt.Tag.t = 3
    adt.Tag.c = offerData.cost.monthlyGross.currency
    adt.Tag.am = orderValue
    adt.Tag.ti = orderId
    adt.Tag.xd = md5(emailAddress)

    if (couponCode) {
      adt.Tag.cpn = couponCode
    }

    adt.Tag.tp = getBundleAdtractionProductValue(offerData)
    adt.Tag.doEvent()
  } catch (e) {
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      ;(window as any).Sentry.captureMessage(e)
    }
  }
}

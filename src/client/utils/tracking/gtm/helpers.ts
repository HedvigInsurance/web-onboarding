import { CookieStorage } from 'cookie-storage'

import {
  ExternalInsuranceDataQuery,
  ExternalInsuranceDataDocument,
  QuoteBundle,
  BundledQuote,
} from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import {
  isBundle,
  isYouth,
  isNorwegianHomeTravelBundle,
  isNorwegianHomeAccidentBundle,
  isNorwegianHomeTravelAccidentBundle,
  isDanishAccidentBundle,
  isDanishTravelBundle,
  isStudentOffer,
  getMainQuote,
  isSwedishHouse,
  isSwedishApartment,
  isSwedishBRF,
} from 'pages/OfferNew/utils'
import { apolloClient } from 'apolloClient'
import { getExternalInsuranceData } from 'api/externalInsuranceQuerySelector'
import * as quoteSelector from 'api/quoteSelector'
import * as quoteBundleSelector from 'api/quoteBundleSelectors'
import { QuoteCarSubType, QuoteOwnershipType } from 'api/quoteSelector'
import { GTMOfferBase } from './dataLayer'

import {
  SeBundleTypes,
  NoBundleTypes,
  DkBundleTypes,
  TrackableContractType,
  TrackableContractCategory,
} from './types'

const cookie = new CookieStorage()

export interface UtmParams {
  source?: string
  medium?: string
  term?: string
  content?: string
  name?: string
}

export const getContractType = (offerData: OfferData) => {
  if (isBundle(offerData)) {
    const { quoteDetails: homeQuoteDetails } = getMainQuote(offerData)

    if (isSwedishHouse(homeQuoteDetails)) {
      return SeBundleTypes.SeHomeAccidentBundleHouse
    }

    if (isSwedishApartment(homeQuoteDetails)) {
      if (isSwedishBRF(homeQuoteDetails)) {
        return isStudentOffer(offerData)
          ? SeBundleTypes.SeHomeAccidentBundleStudentBrf
          : SeBundleTypes.SeHomeAccidentBundleBrf
      } else {
        return isStudentOffer(offerData)
          ? SeBundleTypes.SeHomeAccidentBundleStudentRent
          : SeBundleTypes.SeHomeAccidentBundleRent
      }
    }

    if (isNorwegianHomeTravelBundle(offerData)) {
      return isYouth(offerData)
        ? NoBundleTypes.NoHomeTravelBundle
        : NoBundleTypes.NoHomeTravelBundleYouth
    }

    if (isNorwegianHomeAccidentBundle(offerData)) {
      return isYouth(offerData)
        ? NoBundleTypes.NoHomeAccidentBundle
        : NoBundleTypes.NoHomeAccidentBundleYouth
    }

    if (isNorwegianHomeTravelAccidentBundle(offerData)) {
      return isYouth(offerData)
        ? NoBundleTypes.NoHomeTravelAccidentBundle
        : NoBundleTypes.NoHomeTravelAccidentBundleYouth
    }

    if (isDanishAccidentBundle(offerData)) {
      return isStudentOffer(offerData)
        ? DkBundleTypes.DkAccidentBundleStudent
        : DkBundleTypes.DkAccidentBundle
    }

    if (isDanishTravelBundle(offerData)) {
      return isStudentOffer(offerData)
        ? DkBundleTypes.DkTravelBundleStudent
        : DkBundleTypes.DkTravelBundle
    }
  }
  return getMainQuote(offerData).contractType
}

export const getTrackableContractCategory = (
  contractType: TrackableContractType,
) => {
  switch (contractType) {
    case SeBundleTypes.SeHomeAccidentBundleBrf:
    case SeBundleTypes.SeHomeAccidentBundleRent:
    case SeBundleTypes.SeHomeAccidentBundleHouse:
    case SeBundleTypes.SeHomeAccidentBundleStudentBrf:
    case SeBundleTypes.SeHomeAccidentBundleStudentRent:
    case DkBundleTypes.DkAccidentBundle:
    case DkBundleTypes.DkAccidentBundleStudent:
    case NoBundleTypes.NoHomeAccidentBundle:
    case NoBundleTypes.NoHomeAccidentBundleYouth:
      return TrackableContractCategory.HomeAccident

    case NoBundleTypes.NoHomeTravelBundle:
    case NoBundleTypes.NoHomeTravelBundleYouth:
      return TrackableContractCategory.HomeTravel

    case DkBundleTypes.DkTravelBundle:
    case DkBundleTypes.DkTravelBundleStudent:
    case NoBundleTypes.NoHomeTravelAccidentBundle:
    case NoBundleTypes.NoHomeTravelAccidentBundleYouth:
      return TrackableContractCategory.HomeAccidentTravel
    default:
      return TrackableContractCategory.Home
  }
}

export const getInitialOfferFromSessionStorage = () => {
  return sessionStorage.getItem('initial_offer')
}

export const setInitialOfferToSessionStorage = (
  contractCategory: TrackableContractCategory,
) => {
  sessionStorage.setItem('initial_offer', contractCategory)
}

export const getExternalInsuranceDataFromGQLCache = (
  dataCollectionId: string,
) => {
  if (apolloClient) {
    const cachedExternalInsuranceQuery: ExternalInsuranceDataQuery | null = apolloClient!.client.readQuery(
      {
        query: ExternalInsuranceDataDocument,
        variables: { reference: dataCollectionId },
      },
    )
    const { currentPrice, currentCurrency } = getExternalInsuranceData(
      cachedExternalInsuranceQuery,
    )
    return {
      current_insurance_price: currentPrice,
      current_insurance_currency: currentCurrency,
      insurely_correctly_fetched:
        currentPrice !== undefined && currentCurrency !== undefined,
    }
  } else return {}
}

type OwnershipType = 'rent' | 'own'
export const getOwnershipType = (
  quote: BundledQuote,
): OwnershipType | undefined => {
  const subType = quoteSelector.getSubType(quote) as QuoteOwnershipType

  if (subType && ['RENT', 'STUDENT_RENT'].includes(subType)) {
    return 'rent'
  } else return 'own'
}

type CarSubtype = 'traffic_insurance' | 'half_insurance' | 'full_insurance'
export const getCarSubType = (quote: BundledQuote): CarSubtype => {
  const subType = quoteSelector.getSubType(quote) as QuoteCarSubType
  switch (subType) {
    case 'TRAFFIC':
      return 'traffic_insurance'
    case 'HALF':
      return 'half_insurance'
    case 'FULL':
      return 'full_insurance'
  }
}

export const getBundleSubTypes = (bundle: QuoteBundle) => {
  const carInsurance = bundle.quotes.find(quoteSelector.isCar)
  const homeInsurance = bundle.quotes.find(quoteSelector.isHomeContentsOrHouse)

  const carSubType = carInsurance && getCarSubType(carInsurance)
  const ownershipType = homeInsurance && getOwnershipType(homeInsurance)
  return {
    car_sub_type: carSubType,
    ownership_type: ownershipType,
  }
}

export const getGTMOfferBase = (bundle: QuoteBundle): GTMOfferBase => ({
  is_student:
    quoteBundleSelector.isStudentOffer(bundle) ||
    quoteBundleSelector.isYouthOffer(bundle),
  has_home: quoteBundleSelector.hasHomeContents(bundle),
  has_house: quoteBundleSelector.hasHouse(bundle),
  has_accident: quoteBundleSelector.hasAccident(bundle),
  has_travel: quoteBundleSelector.hasTravel(bundle),
  has_car: quoteBundleSelector.hasCar(bundle.quotes),
  ...getBundleSubTypes(bundle),
})

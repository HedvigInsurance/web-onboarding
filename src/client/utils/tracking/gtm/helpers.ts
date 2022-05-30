import { QuoteBundle, BundledQuote } from 'data/graphql'
import * as quoteSelector from 'api/quoteSelector'
import * as quoteBundleSelector from 'api/quoteBundleSelectors'
import { QuoteCarSubType, QuoteOwnershipType } from 'api/quoteSelector'
import { GTMOfferBase } from './dataLayer'

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

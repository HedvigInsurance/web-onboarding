import { QuoteBundleVariant, BundledQuote } from 'data/graphql'
import { isStudent } from 'api/quoteSelector'
import { captureSentryError } from '../sentry-client'
import { DetailsGroup } from '../getQuoteDetails'
import { EmbarkStory } from '../embarkStory'
import { EventName, pushToGTMDataLayer } from './gtm'
import {
  getTrackableContractCategory,
  getInitialOfferFromSessionStorage,
  setInitialOfferToSessionStorage,
} from './tracking'

type OfferData = {
  priceData: {
    prices: {
      displayName: string
      price: string
    }[]
    discount: string
    currency: string
    totalBundleCost: string
    campaignName: string | null | undefined
  }
  quoteDetails: DetailsGroup[]
  quoteCartId: string
  quoteIds: string[]
  bundleVariants: QuoteBundleVariant[]
  mainQuote: BundledQuote
}

export const trackCheckoutEvent = (
  eventName: EventName,
  offerData: OfferData,
) => {
  const netPrice = Math.round(Number(offerData.priceData.totalBundleCost))
  const discount = Math.round(Number(offerData.priceData.discount))
  const contractCategory = getTrackableContractCategory(
    offerData.mainQuote.typeOfContract,
  )

  const initialOffer = getInitialOfferFromSessionStorage()
  if (!initialOffer) {
    setInitialOfferToSessionStorage(contractCategory)
  }

  try {
    console.log('offerData', offerData)
    pushToGTMDataLayer({
      event: eventName,
      offerData: {
        insurance_type: offerData.mainQuote.typeOfContract,
        referral_code: offerData.priceData.discount ? 'yes' : 'no',
        number_of_people: offerData.mainQuote.data.numberCoInsured + 1,
        insurance_price: netPrice + discount,
        discounted_premium: netPrice,
        currency: offerData.priceData.currency,
        is_student: isStudent(offerData.mainQuote),
        has_home: offerData.mainQuote.data.hasHomeQuote,
        has_accident: offerData.mainQuote.data.hasAccidentQuote,
        has_travel: offerData.mainQuote.data.hasTravelQuote,
        initial_offer: initialOffer ?? contractCategory,
        current_offer: contractCategory,
        member_id: undefined,
        quote_cart_id: offerData.quoteCartId,
        flow_type: EmbarkStory.get() ?? undefined,
        current_insurer: offerData.mainQuote.currentInsurer?.displayName,
      },
    })
  } catch (error) {
    captureSentryError(error)
  }
}

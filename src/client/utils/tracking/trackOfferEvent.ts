import { quoteBundleTrackingContractType } from 'api/quoteBundleTrackingContractTypeSelector'
import { QuoteBundle } from 'data/graphql'
import { quoteBundleMainQuoteSelector } from 'api/quoteBundleMainQuoteSelector'
import { quoteBundleIsStudentOffer } from 'api/quoteBundleIsStudentOffer'
import { quoteBundleHasAccident } from 'api/quoteBundleHasAccident'
import { quoteBundleHasTravel } from 'api/quoteBundleHasTravel'
import { EmbarkStory } from '../embarkStory'
import { captureSentryError } from '../sentry-client'
import { EventName, GTMPhoneNumberData, pushToGTMDataLayer } from './gtm'
import {
  getTrackableContractCategory,
  getInitialOfferFromSessionStorage,
  setInitialOfferToSessionStorage,
} from './tracking'

type OptionalParameters = {
  switchedFrom?: QuoteBundle
  phoneNumberData?: GTMPhoneNumberData
  quoteCartId?: string
  memberId?: string
}

export const trackOfferEvent = (
  eventName: EventName,
  bundle: QuoteBundle,
  referralCodeUsed: boolean,
  options: OptionalParameters = {},
) => {
  const { switchedFrom, phoneNumberData, quoteCartId, memberId } = options
  const contractType = quoteBundleTrackingContractType(bundle)
  const contractCategory = getTrackableContractCategory(contractType)
  const grossPrice = Math.round(Number(bundle.bundleCost.monthlyGross.amount))
  const netPrice = Math.round(Number(bundle.bundleCost.monthlyNet.amount))

  const initialOffer = getInitialOfferFromSessionStorage()
  if (!initialOffer) {
    setInitialOfferToSessionStorage(contractCategory)
  }

  const mainQuote = quoteBundleMainQuoteSelector(bundle)

  try {
    pushToGTMDataLayer({
      event: eventName,
      offerData: {
        insurance_type: contractType,
        referral_code: referralCodeUsed ? 'yes' : 'no',
        number_of_people: mainQuote.data.numberCoInsured + 1,
        insurance_price: grossPrice,
        ...(grossPrice !== netPrice && { discounted_premium: netPrice }),
        currency: bundle.bundleCost.monthlyNet.currency,
        is_student: quoteBundleIsStudentOffer(bundle),
        has_home: true,
        has_accident: quoteBundleHasAccident(bundle),
        has_travel: quoteBundleHasTravel(bundle),
        initial_offer: initialOffer ?? contractCategory,
        current_offer: contractCategory,
        quote_cart_id: quoteCartId,
        ...(switchedFrom && {
          switched_from: getTrackableContractCategory(
            quoteBundleTrackingContractType(switchedFrom),
          ),
          switched_to: contractCategory,
        }),
        ...(memberId && { member_id: memberId }),
        flow_type: EmbarkStory.get() ?? undefined,
        current_insurer: mainQuote.currentInsurer?.id ?? undefined,
      },
      ...phoneNumberData,
    })
  } catch (e) {
    captureSentryError(e)
  }
}

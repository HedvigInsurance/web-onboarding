import * as quoteBundleSelector from 'api/quoteBundleSelectors'
import { QuoteBundle } from 'data/graphql'
import { quoteBundleTrackingContractType } from 'api/quoteBundleTrackingContractType'
import { EmbarkStory } from 'utils/embarkStory'
import { captureSentryError } from 'utils/sentry-client'

import { GTMPhoneNumberData, pushToGTMDataLayer } from './dataLayer'
import { ErrorEventType, EventName } from './types'

import {
  getTrackableContractCategory,
  getInitialOfferFromSessionStorage,
  setInitialOfferToSessionStorage,
  getExternalInsuranceDataFromGQLCache,
} from './helpers'

export type OptionalParameters = {
  switchedFrom?: QuoteBundle
  phoneNumberData?: GTMPhoneNumberData
  quoteCartId?: string
  memberId?: string
  buttonId?: string
  error?: Error | unknown
  errorType?: ErrorEventType
}

export type EventParameters = {
  eventName: EventName
  options?: Partial<OptionalParameters>
}

export const trackOfferEvent = (
  eventName: EventName,
  bundle: QuoteBundle,
  referralCodeUsed: boolean,
  options: OptionalParameters = {},
) => {
  const mainQuote = quoteBundleSelector.getMainQuote(bundle)

  const { quoteCartId, ...optionsWithoutId } = options
  const { switchedFrom, phoneNumberData, memberId } = optionsWithoutId
  const contractType = quoteBundleTrackingContractType(bundle)
  const contractCategory = getTrackableContractCategory(contractType)
  const grossPrice = Math.round(Number(bundle.bundleCost.monthlyGross.amount))
  const netPrice = Math.round(Number(bundle.bundleCost.monthlyNet.amount))
  const currentInsurer = mainQuote?.currentInsurer?.id ?? undefined
  const dataCollectionId = mainQuote?.dataCollectionId
  const externalInsuranceData = dataCollectionId
    ? getExternalInsuranceDataFromGQLCache(dataCollectionId)
    : {}

  const initialOffer = getInitialOfferFromSessionStorage()
  if (!initialOffer) {
    setInitialOfferToSessionStorage(contractCategory)
  }

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
        is_student:
          quoteBundleSelector.isStudentOffer(bundle) ||
          quoteBundleSelector.isYouthOffer(bundle),
        has_home: true,
        has_accident: quoteBundleSelector.hasAccident(bundle),
        has_travel: quoteBundleSelector.hasTravel(bundle),
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
        current_insurer: currentInsurer,
        ...(currentInsurer && externalInsuranceData),
      },
      ...phoneNumberData,
      ...optionsWithoutId,
    })
  } catch (error) {
    captureSentryError(error)
  }
}

import * as quoteBundleSelector from 'api/quoteBundleSelectors'
import { QuoteBundle } from 'data/graphql'
import { EmbarkStory } from 'utils/embarkStory'
import { captureSentryError } from 'utils/sentry-client'

import { GTMPhoneNumberData, pushToGTMDataLayer } from './dataLayer'
import { ErrorEventType, EventName } from './types'
import { getBundleOwnershipType } from './helpers'

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
  selectedBundle?: QuoteBundle
  options?: Partial<OptionalParameters>
}

export const trackOfferEvent = (
  eventName: EventName,
  bundle: QuoteBundle,
  referralCodeUsed: boolean,
  options: OptionalParameters = {},
) => {
  const { quoteCartId, ...optionsWithoutId } = options
  const { switchedFrom, phoneNumberData, memberId } = optionsWithoutId
  const grossPrice = Math.round(
    Number(quoteBundleSelector.getGrossPrice(bundle)),
  )
  const netPrice = Math.round(
    Number(quoteBundleSelector.getTotalBundleCost(bundle)),
  )

  try {
    pushToGTMDataLayer({
      event: eventName,
      offerData: {
        referral_code: referralCodeUsed ? 'yes' : 'no',
        number_of_people: quoteBundleSelector.getHouseholdSize(bundle),
        insurance_price: grossPrice,
        ...(grossPrice !== netPrice && { discounted_premium: netPrice }),
        currency: quoteBundleSelector.getBundleCurrency(bundle),
        is_student:
          quoteBundleSelector.isStudentOffer(bundle) ||
          quoteBundleSelector.isYouthOffer(bundle),
        has_home: quoteBundleSelector.hasHomeContents(bundle),
        has_house: quoteBundleSelector.hasHouse(bundle),
        has_accident: quoteBundleSelector.hasAccident(bundle),
        has_travel: quoteBundleSelector.hasTravel(bundle),
        ownership_type: getBundleOwnershipType(bundle),
        quote_cart_id: quoteCartId,
        ...(switchedFrom && {
          switch_from: {
            has_home: quoteBundleSelector.hasHomeContents(switchedFrom),
            has_house: quoteBundleSelector.hasHouse(switchedFrom),
            has_accident: quoteBundleSelector.hasAccident(switchedFrom),
            has_travel: quoteBundleSelector.hasTravel(switchedFrom),
            ownership_type: getBundleOwnershipType(switchedFrom),
            is_student:
              quoteBundleSelector.isStudentOffer(switchedFrom) ||
              quoteBundleSelector.isYouthOffer(switchedFrom),
          },
        }),
        ...(memberId && { member_id: memberId }),
        flow_type: EmbarkStory.get() ?? undefined,
      },
      ...phoneNumberData,
      ...optionsWithoutId,
    })
  } catch (error) {
    captureSentryError(error)
  }
}

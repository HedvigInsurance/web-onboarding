import { datadogRum } from '@datadog/browser-rum'
import {
  isStudentOffer,
  hasHomeQuote,
  hasAccidentQuote,
  hasTravelQuote,
} from 'pages/Offer/utils'
import { OfferData } from 'pages/Offer/types'
import { EmbarkStory } from 'utils/embarkStory'
import { pushToGTMDataLayer, GTMPhoneNumberData } from './dataLayer'
import { EventName } from './types'

type OptionalParameters = {
  switchedFrom?: OfferData
  phoneNumberData?: GTMPhoneNumberData
  quoteCartId?: string
}

/**
 * @deprecated Will be removed
 */

export const trackOfferGTM = (
  eventName: EventName,
  offerData: OfferData,
  referralCodeUsed: boolean,
  { switchedFrom, phoneNumberData, quoteCartId }: OptionalParameters = {},
) => {
  const grossPrice = Math.round(Number(offerData.cost.monthlyGross.amount))
  const netPrice = Math.round(Number(offerData.cost.monthlyNet.amount))

  try {
    pushToGTMDataLayer({
      event: eventName,
      offerData: {
        referral_code: referralCodeUsed ? 'yes' : 'no',
        number_of_people: offerData.person.householdSize,
        insurance_price: grossPrice,
        ...(grossPrice !== netPrice && { discounted_premium: netPrice }),
        currency: offerData.cost.monthlyNet.currency,
        is_student: isStudentOffer(offerData),
        has_home: hasHomeQuote(offerData),
        has_accident: hasAccidentQuote(offerData),
        has_travel: hasTravelQuote(offerData),
        has_house: false,
        has_car: false,
        quote_cart_id: quoteCartId,
        ...(switchedFrom && {
          switched_from: {
            is_student: isStudentOffer(offerData),
            has_home: hasHomeQuote(offerData),
            has_accident: hasAccidentQuote(offerData),
            has_travel: hasTravelQuote(offerData),
            has_house: false,
            has_car: false,
          },
        }),
        ...(offerData.memberId && { member_id: offerData.memberId }),
        flow_type: EmbarkStory.get() ?? undefined,
      },
      ...phoneNumberData,
    })
  } catch (error) {
    datadogRum.addError(error)
  }
}

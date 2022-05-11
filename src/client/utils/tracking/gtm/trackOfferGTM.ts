import { OfferData } from 'pages/OfferNew/types'
import { captureSentryError } from 'utils/sentry-client'
import {
  isStudentOffer,
  hasHomeQuote,
  hasAccidentQuote,
  hasTravelQuote,
} from 'pages/OfferNew/utils'
import { EmbarkStory } from 'utils/embarkStory'
import {
  getContractType,
  getInitialOfferFromSessionStorage,
  getTrackableContractCategory,
  setInitialOfferToSessionStorage,
  getExternalInsuranceDataFromGQLCache,
} from './helpers'
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
  const contractType = getContractType(offerData)
  const contractCategory = getTrackableContractCategory(contractType)
  const grossPrice = Math.round(Number(offerData.cost.monthlyGross.amount))
  const netPrice = Math.round(Number(offerData.cost.monthlyNet.amount))

  const currentInsurer = offerData.quotes[0].currentInsurer?.id ?? undefined
  const dataCollectionId = offerData.quotes[0]?.dataCollectionId
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
        number_of_people: offerData.person.householdSize,
        insurance_price: grossPrice,
        ...(grossPrice !== netPrice && { discounted_premium: netPrice }),
        currency: offerData.cost.monthlyNet.currency,
        is_student: isStudentOffer(offerData),
        has_home: hasHomeQuote(offerData),
        has_accident: hasAccidentQuote(offerData),
        has_travel: hasTravelQuote(offerData),
        initial_offer: initialOffer ?? contractCategory,
        current_offer: contractCategory,
        quote_cart_id: quoteCartId,
        ...(switchedFrom && {
          switched_from: getTrackableContractCategory(
            getContractType(switchedFrom),
          ),
          switched_to: contractCategory,
        }),
        ...(offerData.memberId && { member_id: offerData.memberId }),
        flow_type: EmbarkStory.get() ?? undefined,
        current_insurer: currentInsurer,
        ...(currentInsurer && externalInsuranceData),
      },
      ...phoneNumberData,
    })
  } catch (e) {
    captureSentryError(e)
  }
}

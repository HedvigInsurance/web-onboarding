import { TypeOfContract } from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import { captureSentryError } from 'utils/sentry-client'
import { getContractType, DkBundleTypes, NoComboTypes } from './tracking'

type GAContractType = NoComboTypes | DkBundleTypes | TypeOfContract

interface GTMOfferData {
  insurance_type: GAContractType
  referral_code: 'yes' | 'no'
  number_of_people: number
  insurance_price: number
  currency: string
  member_id?: string
}

export interface DataLayerObject {
  event: string
  offerData?: GTMOfferData
}

const pushToGTMDataLayer = (obj: DataLayerObject) => {
  const castedWindow = window as any
  castedWindow.dataLayer = castedWindow.dataLayer || []
  castedWindow.dataLayer.push(obj)
}

export const trackOfferGTM = (
  eventName: 'offer_created' | 'signed_customer',
  offerData: OfferData,
  referralCodeUsed: boolean,
) => {
  try {
    pushToGTMDataLayer({
      event: eventName,
      offerData: {
        insurance_type: getContractType(offerData),
        referral_code: referralCodeUsed ? 'yes' : 'no',
        number_of_people: offerData.person.householdSize,
        insurance_price: parseFloat(offerData.cost.monthlyNet.amount),
        currency: offerData.cost.monthlyNet.currency,
        ...(offerData.memberId && { member_id: offerData.memberId }),
      },
    })
  } catch (e) {
    captureSentryError(e)
  }
}

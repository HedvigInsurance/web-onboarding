import { TypeOfContract } from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import { captureSentryError } from 'utils/sentry-client'
import { getContractType, NoComboTypes } from './tracking'

type GAContractType = NoComboTypes | TypeOfContract

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
  const baseOfferData = {
    insurance_type: getContractType(offerData),
    referral_code: referralCodeUsed ? 'yes' : 'no',
    number_of_people: offerData.person.householdSize,
    insurance_price: parseFloat(offerData.cost.monthlyNet.amount),
    currency: offerData.cost.monthlyNet.currency,
  }
  const gmtOfferData = (eventName === 'offer_created' || !offerData.memberId
    ? baseOfferData
    : { ...baseOfferData, member_id: offerData.memberId }) as GTMOfferData
  try {
    pushToGTMDataLayer({
      event: eventName,
      offerData: gmtOfferData,
    })
  } catch (e) {
    captureSentryError(e)
  }
}

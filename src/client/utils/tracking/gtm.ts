import { TypeOfContract } from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import { isBundle, isYouth } from 'pages/OfferNew/utils'
import { captureSentryError } from 'utils/sentry-client'

enum NoComboTypes {
  NoCombo = 'NO_COMBO',
  NoComboYouth = 'NO_COMBO_YOUTH',
}

type GAContractType = NoComboTypes | TypeOfContract

interface GTMOfferData {
  insurance_type: GAContractType
  referral_code: 'yes' | 'no'
  number_of_people: number
  insurance_price: number
  currency: string
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
    const getContractType = () => {
      if (isBundle(offerData)) {
        return isYouth(offerData)
          ? NoComboTypes.NoComboYouth
          : NoComboTypes.NoCombo
      }
      return offerData.quotes[0].contractType
    }

    pushToGTMDataLayer({
      event: eventName,
      offerData: {
        insurance_type: getContractType(),
        referral_code: referralCodeUsed ? 'yes' : 'no',
        number_of_people: offerData.person.householdSize,
        insurance_price: parseFloat(offerData.cost.monthlyNet.amount),
        currency: offerData.cost.monthlyNet.currency,
      },
    })
  } catch (e) {
    captureSentryError(e)
  }
}

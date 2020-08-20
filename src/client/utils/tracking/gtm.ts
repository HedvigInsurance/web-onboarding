import { TypeOfContract } from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import { isBundle, isYouth } from 'pages/OfferNew/utils'

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
  offerData: OfferData,
  referralCodeUsed: boolean,
) => {
  try {
    const contractType = () => {
      if (isBundle(offerData)) {
        return isYouth(offerData)
          ? NoComboTypes.NoComboYouth
          : NoComboTypes.NoCombo
      }
      return offerData.quotes[0].contractType
    }

    pushToGTMDataLayer({
      event: 'signed_customer',
      offerData: {
        insurance_type: contractType(),
        referral_code: referralCodeUsed ? 'yes' : 'no',
        number_of_people: offerData.person.householdSize,
        insurance_price: parseFloat(offerData.cost.monthlyNet.amount),
      },
    })
  } catch (e) {
    ;(window as any).Sentry.captureMessage(e)
  }
}

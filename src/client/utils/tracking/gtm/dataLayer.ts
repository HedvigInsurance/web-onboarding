import { AppEnvironment } from 'shared/clientConfig'
import { TrackableContractType } from './types'

export type GTMUserProperties = {
  market: string
  environment: AppEnvironment
}

export type GTMOfferData = {
  insurance_type: TrackableContractType
  referral_code: 'yes' | 'no'
  number_of_people?: number
  insurance_price: number
  discounted_premium?: number
  currency: string
  is_student: boolean
  has_home: boolean
  has_accident: boolean
  has_travel: boolean
  initial_offer: string
  current_offer: string
  member_id?: string
  quote_cart_id?: string
  flow_type?: string
  current_insurer?: string
}

export type GTMPageData = {
  page: string
  search?: string
  title: string
  market: string
}

export type GTMEventData = {
  type: string
}

export type GTMPhoneNumberData = {
  path: string
  status: 'opened' | 'closed'
}

export type DataLayerObject = {
  event?: string
  userProperties?: GTMUserProperties
  offerData?: GTMOfferData
  pageData?: GTMPageData
  passageData?: Record<string, string | undefined>
  eventData?: GTMEventData
  phoneNumberData?: GTMPhoneNumberData
}

export const pushToGTMDataLayer = (obj: DataLayerObject) => {
  const castedWindow = window as any
  castedWindow.dataLayer = castedWindow.dataLayer || []
  castedWindow.dataLayer.push(obj)
}

import { AppEnvironment } from 'shared/clientConfig'

export type GTMUserProperties = {
  market: string
  environment: AppEnvironment
}

export type GTMOfferBase = {
  is_student: boolean
  has_home: boolean
  has_house: boolean
  has_accident: boolean
  has_travel: boolean
  has_car: boolean
  car_sub_type?: string
  ownership_type?: string
}

export type GTMOfferData = {
  referral_code: 'yes' | 'no'
  number_of_people?: number
  insurance_price: number
  discounted_premium?: number
  currency: string
  member_id?: string
  quote_cart_id?: string
  flow_type?: string
  switched_from?: GTMOfferBase
} & GTMOfferBase

export type GTMPageData = {
  page: string
  search?: string
  title: string
  market: string
}

export type GTMUserData = {
  fn?: string
  ln?: string
  em?: string
  ad?: {
    zp?: string
    ct?: string
    co?: string
  }
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
  eventData?: Record<string, string>
  phoneNumberData?: GTMPhoneNumberData
  userData?: GTMUserData
}

export const pushToGTMDataLayer = (obj: DataLayerObject) => {
  const castedWindow = window as any
  castedWindow.dataLayer = castedWindow.dataLayer || []
  castedWindow.dataLayer.push(obj)
}

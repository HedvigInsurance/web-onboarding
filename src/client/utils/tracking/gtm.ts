import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { OfferData } from 'pages/OfferNew/types'
import { captureSentryError } from 'utils/sentry-client'
import { useMarket } from 'components/utils/CurrentLocale'
import { AppEnvironment } from 'shared/clientConfig'
import {
  isStudentOffer,
  hasHomeQuote,
  hasAccidentQuote,
  hasTravelQuote,
} from 'pages/OfferNew/utils'
import {
  getContractType,
  getInitialOfferFromSessionStorage,
  getTrackableContractCategory,
  setInitialOfferToSessionStorage,
  TrackableContractType,
} from './tracking'

type GTMUserProperties = {
  market: string
  environment: AppEnvironment
}

type GTMOfferData = {
  insurance_type: TrackableContractType
  referral_code: 'yes' | 'no'
  number_of_people: number
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
}

type GTMPageData = {
  page: string
  search?: string
  title: string
  market: string
}

type GTMEventData = {
  type: string
}

type GTMPhoneNumberData = {
  path: string
  status: 'opened' | 'closed'
}

type DataLayerObject = {
  event?: string
  userProperties?: GTMUserProperties
  offerData?: GTMOfferData
  pageData?: GTMPageData
  passageData?: Record<string, string | undefined>
  eventData?: GTMEventData
  phoneNumberData?: GTMPhoneNumberData
}

/**
 * Track user properties
 * Track virtual page view when route changes
 */
export const useGTMTracking = () => {
  const environment = window.hedvigClientConfig.appEnvironment
  const market = useMarket().toLowerCase()
  const location = useLocation()

  useEffect(() => {
    pushToGTMDataLayer({
      userProperties: {
        environment,
        market,
      },
    })
  }, [environment, market])

  useEffect(() => {
    pushToGTMDataLayer({
      event: 'virtual_page_view',
      pageData: {
        page: location.pathname,
        search: location.search,
        title: document.title,
        market,
      },
    })
  }, [location, market])
}

export const pushToGTMDataLayer = (obj: DataLayerObject) => {
  const castedWindow = window as any
  castedWindow.dataLayer = castedWindow.dataLayer || []
  castedWindow.dataLayer.push(obj)
}

export enum EventName {
  OfferCreated = 'offer_created',
  SignedCustomer = 'signed_customer',
  InsuranceSelectionToggle = 'insurance_selection_toggle',
  ClickCallNumber = 'click_call_number',
  OfferCrossSell = 'offer_cross_sell',
  CheckoutOpen = 'checkout_open',
}

type OptionalParameters = {
  switchedFrom?: OfferData
  phoneNumberData?: GTMPhoneNumberData
}

export const trackOfferGTM = (
  eventName: EventName,
  offerData: OfferData,
  referralCodeUsed: boolean,
  { switchedFrom, phoneNumberData }: OptionalParameters = {},
) => {
  const contractType = getContractType(offerData)
  const contractCategory = getTrackableContractCategory(contractType)
  const grossPrice = Math.round(Number(offerData.cost.monthlyGross.amount))
  const netPrice = Math.round(Number(offerData.cost.monthlyNet.amount))

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
        ...(switchedFrom && {
          switched_from: getTrackableContractCategory(
            getContractType(switchedFrom),
          ),
          switched_to: contractCategory,
        }),
        ...(offerData.memberId && { member_id: offerData.memberId }),
      },
      ...phoneNumberData,
    })
  } catch (e) {
    captureSentryError(e)
  }
}

import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { TypeOfContract } from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import { captureSentryError } from 'utils/sentry-client'
import { useMarket } from 'components/utils/CurrentLocale'
import { AppEnvironment } from 'shared/clientConfig'
import { getContractType, DkBundleTypes, NoComboTypes } from './tracking'

type GAContractType = NoComboTypes | DkBundleTypes | TypeOfContract

type GTMUserProperties = {
  market: string
  environment: AppEnvironment
}

type GTMOfferData = {
  insurance_type: GAContractType
  referral_code: 'yes' | 'no'
  number_of_people: number
  insurance_price: number
  currency: string
  member_id?: string
}

type GTMPageData = {
  page: string
  search?: string
  title: string
  market: string
}

type DataLayerObject = {
  event?: string
  userProperties?: GTMUserProperties
  offerData?: GTMOfferData
  pageData?: GTMPageData
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
        environment: environment,
        market: market,
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
        market: market,
      },
    })
  }, [location, market])
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

import { CookieStorage } from 'cookie-storage'
import {
  SignState,
  TypeOfContract,
  useMemberQuery,
  useRedeemedCampaignsQuery,
} from 'data/graphql'
import md5 from 'md5'
import { OfferData } from 'pages/OfferNew/types'
import { isBundle, isYouth } from 'pages/OfferNew/utils'
import { SegmentAnalyticsJs, setupTrackers } from 'quepasa'
import React from 'react'
import { trackOfferGTM } from './gtm'

const cookie = new CookieStorage()

export interface UtmParams {
  source?: string
  medium?: string
  term?: string
  content?: string
  name?: string
}

export const getUtmParamsFromCookie = (): UtmParams | undefined => {
  const params = cookie.getItem('utm-params')
  try {
    return params ? JSON.parse(params) : undefined
  } catch (e) {
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      ;(window as any).Sentry.captureMessage(
        'Error parsing UTM-parameters: ' + params,
      )
    }
    return undefined
  }
}

export enum ApplicationSpecificEvents {
  COMPLETED = 'completed',
}

const NOOP = () => {
  return
}

export const { TrackAction, IdentifyAction } = setupTrackers<
  ApplicationSpecificEvents
>(
  () => {
    if (typeof window !== 'undefined') {
      const castedWindow = window as any
      return castedWindow.analytics as SegmentAnalyticsJs
    }
    return { track: NOOP, identify: NOOP }
  },
  { debug: process.env.NODE_ENV === 'development' },
)

const adtractionProductMap: { [type in TypeOfContract]: number } = {
  SE_HOUSE: 1477448913,
  SE_APARTMENT_BRF: 1417356498,
  SE_APARTMENT_STUDENT_BRF: 1423041022,
  SE_APARTMENT_RENT: 1417356528,
  SE_APARTMENT_STUDENT_RENT: 1412601108,
  NO_HOME_CONTENT_OWN: 1492623645,
  NO_HOME_CONTENT_RENT: 1492623645,
  NO_HOME_CONTENT_YOUTH_OWN: 1492623719,
  NO_HOME_CONTENT_YOUTH_RENT: 1492623719,
  NO_TRAVEL: 1492623742,
  NO_TRAVEL_YOUTH: 1492623785,
}

const getComboAdractionProductValue = (isYouthBundle: boolean) =>
  isYouthBundle ? 1492623841 : 1492623821

export const adtraction = (
  orderValue: number,
  orderId: string,
  emailAddress: string,
  couponCode: string | null,
  offerData: OfferData,
) => {
  try {
    const adt = ADT
    adt.Tag = adt.Tag || {}
    adt.Tag.t = 3
    adt.Tag.c = offerData.cost.monthlyGross.currency
    adt.Tag.am = orderValue
    adt.Tag.ti = orderId
    adt.Tag.xd = md5(emailAddress)

    if (couponCode !== null) {
      adt.Tag.cpn = couponCode
    }

    adt.Tag.tp = isBundle(offerData)
      ? getComboAdractionProductValue(isYouth(offerData))
      : adtractionProductMap[offerData.quotes[0].contractType]
    adt.Tag.doEvent()
  } catch (e) {
    ;(window as any).Sentry.captureMessage(e)
  }
}

export const trackStudentkortet = (memberId: string, amount: string) => {
  const iframe = document.createElement('iframe')
  iframe.src = `https://studentkortet.go2cloud.org/aff_l?offer_id=68&adv_sub=${memberId}&amount=${amount}`
  iframe.scrolling = 'no'
  iframe.frameBorder = '0'
  iframe.width = '1'
  iframe.height = '1'
  document.body.appendChild(iframe)
}

interface TrackProps {
  offerData?: OfferData | null
  signState?: SignState | null
}
export const useTrack = ({ offerData, signState }: TrackProps) => {
  const { data: redeemedCampaignsData } = useRedeemedCampaignsQuery()
  const redeemedCampaigns = redeemedCampaignsData?.redeemedCampaigns ?? []
  const { data: memberData } = useMemberQuery()
  const memberId = memberData?.member.id!

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'test') {
      return
    }

    if (signState !== SignState.Completed) {
      return
    }

    if (!offerData) {
      return
    }

    adtraction(
      parseFloat(offerData.cost.monthlyGross.amount),
      memberId,
      offerData.person.email || '',
      redeemedCampaigns !== null && redeemedCampaigns.length !== 0
        ? redeemedCampaigns[0].code
        : null,
      offerData,
    )

    trackOfferGTM(
      'signed_customer',
      offerData,
      redeemedCampaigns[0]?.incentive?.__typename === 'MonthlyCostDeduction',
    )

    if (
      redeemedCampaigns?.length > 0 &&
      ['studentkortet', 'stuk2'].includes(
        redeemedCampaigns[0].code.toLowerCase(),
      )
    ) {
      trackStudentkortet(memberId, offerData.cost.monthlyGross.amount)
    }
  }, [signState])
}

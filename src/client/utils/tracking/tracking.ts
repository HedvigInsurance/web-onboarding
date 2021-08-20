import { CookieStorage } from 'cookie-storage'
import { SegmentAnalyticsJs, setupTrackers } from 'quepasa'
import React from 'react'
import {
  SignState,
  useMemberQuery,
  useRedeemedCampaignsQuery,
} from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import {
  isBundle,
  isYouth,
  isNorwegian,
  isDanishAccidentBundle,
  isDanishTravelBundle,
  isStudentOffer,
} from 'pages/OfferNew/utils'
import { trackOfferGTM } from './gtm'
import { adtraction } from './adTraction'
import { trackStudentkortet } from './studentkortet'

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

export enum NoComboTypes {
  NoCombo = 'NO_COMBO',
  NoComboYouth = 'NO_COMBO_YOUTH',
}

export enum DkBundleTypes {
  DkAccidentBundle = 'DK_ACCIDENT_BUNDLE',
  DkAccidentBundleStudent = 'DK_ACCIDENT_BUNDLE_STUDENT',
  DkTravelBundle = 'DK_TRAVEL_BUNDLE',
  DkTravelBundleStudent = 'DK_TRAVEL_BUNDLE_STUDENT',
}

export const getContractType = (offerData: OfferData) => {
  if (isBundle(offerData)) {
    if (isNorwegian(offerData)) {
      return isYouth(offerData)
        ? NoComboTypes.NoComboYouth
        : NoComboTypes.NoCombo
    }

    if (isDanishAccidentBundle(offerData)) {
      return isStudentOffer(offerData)
        ? DkBundleTypes.DkAccidentBundleStudent
        : DkBundleTypes.DkAccidentBundle
    }

    if (isDanishTravelBundle(offerData)) {
      return isStudentOffer(offerData)
        ? DkBundleTypes.DkTravelBundleStudent
        : DkBundleTypes.DkTravelBundle
    }
  }
  return offerData.quotes[0].contractType
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
interface TrackProps {
  offerData?: OfferData | null
  signState?: SignState | null
}
export const useTrack = ({ offerData, signState }: TrackProps) => {
  const { data: redeemedCampaignsData } = useRedeemedCampaignsQuery()
  const { data: memberData } = useMemberQuery()
  const memberId = memberData?.member.id

  React.useEffect(() => {
    const redeemedCampaigns = redeemedCampaignsData?.redeemedCampaigns ?? []

    if (process.env.NODE_ENV === 'test') {
      return
    }

    if (signState !== SignState.Completed) {
      return
    }

    if (!offerData) {
      return
    }

    if (memberId) {
      adtraction(
        parseFloat(offerData.cost.monthlyGross.amount),
        memberId,
        offerData.person.email || '',
        redeemedCampaigns !== null && redeemedCampaigns.length !== 0
          ? redeemedCampaigns[0].code
          : null,
        offerData,
      )
    }

    trackOfferGTM(
      'signed_customer',
      { ...offerData, memberId: memberId || '' },
      redeemedCampaigns[0]?.incentive?.__typename === 'MonthlyCostDeduction',
    )
    if (
      redeemedCampaigns?.length > 0 &&
      ['studentkortet', 'stuk2'].includes(
        redeemedCampaigns[0].code.toLowerCase(),
      ) &&
      memberId
    ) {
      trackStudentkortet(memberId)
    }
  }, [redeemedCampaignsData, memberId, offerData, signState])
}

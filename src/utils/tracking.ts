import { CookieStorage } from 'cookie-storage'
import * as md5 from 'md5'
import { SegmentAnalyticsJs, setupTrackers } from 'quepasa'
import { InsuranceType } from './insuranceDomainUtils'

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

export const utmParamsToBranchLinkOptions = (
  utmParams?: Record<string, undefined | string | ReadonlyArray<string>>,
  linkOptions?: Record<string, undefined | string | ReadonlyArray<string>>,
) => {
  // utm-params get set in plugins/utm-params
  // utm params are passed in from ads (fb, adwords, twitter)
  // Object structure:
  // https://github.com/segmentio/utm-params
  // {
  //   "source": "google",
  //   "medium": "medium",
  //   "term": "keyword",
  //   "content": "some content",
  //   "name": "some campaign"
  // }

  // Branch param to UTM param
  // https://bit.ly/2ITMixP
  const mapBranchToUtmParams = {
    channel: 'source',
    feature: 'medium',
    campaign: 'name',
    tags: 'content',
    keywords: 'term',
  }

  const arrayValues = ['keywords', 'tags']
  return ['channel', 'campaign', 'tags', 'feature', 'keywords', 'stage'].reduce(
    (acc, key) => {
      const value = linkOptions && linkOptions[key]
      const utmValue =
        utmParams &&
        utmParams[
          mapBranchToUtmParams[key as keyof typeof mapBranchToUtmParams]
        ]
      // utm param values always take precedent over static values
      // This enables ad attribution in app
      let linkValue = utmValue || value

      if (linkValue) {
        // Branch expects keywords and tags as array
        if (arrayValues.includes(key) && !Array.isArray(linkValue)) {
          linkValue = [linkValue as string]
        }
        return { ...acc, [key]: linkValue }
      }

      return acc
    },
    {},
  )
}

export enum ApplicationSpecificEvents {
  COMPLETED = 'completed',
}

const NOOP = () => {} // tslint:disable-line

export const { Track, TrackAction, Identify, IdentifyAction } = setupTrackers<
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

const adtractionProductMap: { [type in InsuranceType]: number } = {
  BRF: 1417356498,
  STUDENT_BRF: 1423041022,
  RENT: 1417356528,
  STUDENT_RENT: 1412601108,
}

export const adtraction = (
  orderValue: number,
  orderId: string,
  emailAddress: string,
  couponCode: string | null,
  insuranceType: InsuranceType,
) => {
  const adt = ADT
  adt.Tag = adt.Tag || {}
  adt.Tag.t = 3
  adt.Tag.c = 'SEK'
  adt.Tag.am = orderValue
  adt.Tag.ti = orderId
  adt.Tag.xd = md5(emailAddress)

  if (couponCode !== null) {
    adt.Tag.cpn = couponCode
  }

  adt.Tag.tp = adtractionProductMap[insuranceType]
  adt.Tag.doEvent()
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

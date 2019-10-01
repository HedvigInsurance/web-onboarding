import { CookieStorage } from 'cookie-storage'
import { SegmentAnalyticsJs, setupTrackers } from 'quepasa'

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

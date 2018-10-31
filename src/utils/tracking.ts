import { CookieStorage } from 'cookie-storage'
import * as merge from 'deepmerge'

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
  return params ? JSON.parse(params) : undefined
}

export const trackEvent = (
  eventName: string,
  properties?: { [key: string]: any },
  options?: { [key: string]: any },
) => {
  const castedWindow = window as any
  if (castedWindow && castedWindow.analytics) {
    castedWindow.analytics.track(
      eventName,
      merge(properties || {}, { context: { ...getUtmParamsFromCookie() } }),
      options,
    )
  }
}

import { CookieStorage } from 'cookie-storage'
// @ts-ignore
import * as merge from 'deepmerge/dist/umd'
import * as uuid from 'uuid/v4'
import { logInDev } from './log'

const cookie = new CookieStorage()

export interface UtmParams {
  source?: string
  medium?: string
  term?: string
  content?: string
  name?: string
}

export const setTrackingId = (): string => {
  const id = uuid()
  logInDev('[ANALYTICS IDENTIFY] ', id)
  const castedWindow = window as any
  if (castedWindow && castedWindow.analytics) {
    castedWindow.analytics.identify(id)
  }

  return id
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
  const event = [
    eventName,
    merge(properties || {}, { context: { ...getUtmParamsFromCookie() } }),
    options,
  ]
  logInDev('[ANALYTICS TRACK] ', event)
  const castedWindow = window as any
  if (castedWindow && castedWindow.analytics) {
    castedWindow.analytics.track(...event)
  }
}

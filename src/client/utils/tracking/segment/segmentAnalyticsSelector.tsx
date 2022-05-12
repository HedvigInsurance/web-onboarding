import { SegmentAnalyticsJs } from 'quepasa'
import { wrapSegmentAnalyticsWithDebugLogging } from './wrapSegmentAnalyticsWithDebugLogging'

export enum ApplicationSpecificEvents {
  COMPLETED = 'completed',
}

const NOOP = () => {
  return
}

export const segmentAnalyticsSelector = () => {
  const debug = process.env.NODE_ENV === 'development'
  if (typeof window !== 'undefined') {
    const castedWindow = window as any
    const analytics = castedWindow.analytics as SegmentAnalyticsJs
    return debug ? wrapSegmentAnalyticsWithDebugLogging(analytics) : analytics
  }
  return { track: NOOP, identify: NOOP }
}

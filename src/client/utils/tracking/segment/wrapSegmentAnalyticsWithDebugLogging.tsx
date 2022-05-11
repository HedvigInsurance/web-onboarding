import { SegmentAnalyticsJs } from 'quepasa'
// https://github.com/HedvigInsurance/quepasa/blob/master/src/utils/log.ts
const redBold = 'color: #ff0000; font-weight: bold'
const blueBold = 'color: #0000ff; font-weight: bold'
const blackBold = 'color: #000000; font-weight: bold'
// tslint:disable no-console

export const wrapSegmentAnalyticsWithDebugLogging = (
  analytics: SegmentAnalyticsJs,
): SegmentAnalyticsJs => {
  const track: SegmentAnalyticsJs['track'] = (...args) => {
    console.group('%c[TRACK]', redBold)
    console.log(`event: %c${args[0]}`, blackBold)
    console.log('properties: ', args[1])
    console.log('options: ', args[2])
    console.groupEnd()
    analytics.track(...args)
  }
  const identify: SegmentAnalyticsJs['identify'] = (...args) => {
    console.group('%c[IDENTIFY]', blueBold)
    console.log(`userId: %c${args[0]}`, blackBold)
    console.log('traits: ', args[1])
    console.log('options: ', args[2])
    console.groupEnd()
    analytics.identify(...args)
  }
  return {
    track,
    identify,
  }
}

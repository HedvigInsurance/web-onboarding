import { Event, EventCreator } from 'quepasa'
import { segmentAnalyticsSelector } from 'utils/tracking/segment/segmentAnalyticsSelector'

export const useTrackSegmentEvent = () => {
  return (event: Event<string> | EventCreator<string>) => {
    const analytics = segmentAnalyticsSelector()
    if (typeof event === 'function') {
      const unwrappedEvent = event()
      analytics.track(
        unwrappedEvent.name,
        unwrappedEvent.properties,
        unwrappedEvent.options,
      )
      return
    }
    analytics.track(event.name, event.properties, event.options)
  }
}

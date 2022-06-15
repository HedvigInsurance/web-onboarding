import { useCallback, useState } from 'react'
import { pushToGTMDataLayer } from './dataLayer'

type useTrackEventReturnType = [
  (newData?: Record<string, any>) => void,
  { hasTracked: boolean },
]

/**
 * @param event event name
 * @param data initial data
 * @returns An array with a `track` function which can be called when event is triggered, and a data object. The track function supports passing additional data which means that this function can overwrite the initial data. The data object contains `hasTracked` which can be used to make sure that no additional tracking occurs.
 *
 * @example
 * // Set default properties and track event
 * const [trackPageView] = useTrackEvent('begin_onboarding_page', {
 *   begin_from: referer,
 * })
 * useEffect(() => {
 *  trackPageView() // will send eventData: `{ begin_from: <referer> }`
 * }, [trackPageView])
 *
 * @example
 * // Add additional properties when event is tracked
 * const [trackSelectedCard, { hasTracked }] = useTrackEvent('begin_onboarding_insurance_type_selected', {
 *   begin_from: referer,
 * })
 * const handleClick = (type) => {
 *   if (!hasTracked) trackSelectedCard({ type }) // will send eventData: `{ begin_from: <referer>, type: <type> }`
 * }
 */
export const useTrackEvent = (
  event: string,
  data?: Record<string, any>,
): useTrackEventReturnType => {
  const [hasTracked, setHasTracked] = useState(false)

  const track = useCallback(
    (newData?: Record<string, any>) => {
      const eventData = {
        ...data,
        ...newData,
      }

      pushToGTMDataLayer({ event, eventData })
      setHasTracked(true)
    },
    [event, data],
  )

  return [track, { hasTracked }]
}

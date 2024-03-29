import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useMarket } from 'components/utils/CurrentLocale'
import { pushToGTMDataLayer } from 'utils/tracking/gtm/dataLayer'

/**
 * Track user properties
 * Track virtual page view when route changes
 */

export const useTrackPageViewEvent = () => {
  const environment = window.hedvigClientConfig.appEnvironment
  const market = useMarket().toLowerCase()
  const location = useLocation()

  useEffect(() => {
    pushToGTMDataLayer({
      userProperties: {
        environment,
        market,
        siteVersion: 'old',
      },
    })
  }, [environment, market])

  useEffect(() => {
    pushToGTMDataLayer({
      event: 'virtual_page_view',
      pageData: {
        page: location.pathname,
        search: location.search,
        title: document.title,
        market,
      },
    })
  }, [location, market])
}

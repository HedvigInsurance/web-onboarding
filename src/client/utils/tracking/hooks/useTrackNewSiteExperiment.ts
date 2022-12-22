import { CookieStorage } from 'cookie-storage'
import { useEffect } from 'react'
import { trackExperimentImpression } from 'utils/tracking/gtm/trackExperimentImpression'
import { newSiteAbTest } from 'shared/newSiteAbTest'

export const useTrackNewSiteExperiment = () => {
  useEffect(() => {
    const variantCookie = new CookieStorage().getItem(
      newSiteAbTest.cookies.variant.name,
    )
    if (typeof variantCookie === 'string') {
      const variant = parseInt(variantCookie, 10)
      if (variant === 0) {
        trackExperimentImpression(newSiteAbTest.optimizeExperimentId, variant)
      }
    }
  }, [])
}

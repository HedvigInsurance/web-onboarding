import { useRouteMatch } from 'react-router'
import { CookieStorage } from 'cookie-storage'
import { useEffect } from 'react'
import {
  AB_PURCHASE_FLOW_REDIRECTS,
  abExperimentCookieName,
} from 'shared/abPurchaseFlowRedirects'
import { useFeature } from 'utils/hooks/useFeature'
import { Feature } from 'shared/clientConfig'
import { trackExperimentImpression } from 'utils/tracking/gtm/trackExperimentImpression'

export const useTrackAbPurchaseFlowRedirect = () => {
  const [abTestPurchaseFlows] = useFeature([Feature.AB_TEST_PURCHASE_FLOWS])
  const { params } = useRouteMatch<any>()

  useEffect(() => {
    if (!abTestPurchaseFlows) {
      return
    }
    const redirectConfig = AB_PURCHASE_FLOW_REDIRECTS.find(
      (redirect) =>
        redirect.newFlow === params.name ||
        redirect.originalFlow === params.name,
    )
    if (!redirectConfig) {
      return
    }
    const cookieVariant = new CookieStorage().getItem(
      abExperimentCookieName(redirectConfig.optimizeExperimentId),
    )
    if (typeof cookieVariant === 'string') {
      const variant = parseInt(cookieVariant, 10) || 0
      trackExperimentImpression(redirectConfig.optimizeExperimentId, variant)
    }
  }, [abTestPurchaseFlows, params.name])
}

import { useRouteMatch } from 'react-router'
import { CookieStorage } from 'cookie-storage'
import { useEffect } from 'react'
import { AB_PURCHASE_FLOW_REDIRECTS } from 'shared/abPurchaseFlowRedirects'
import { useFeature } from 'utils/hooks/useFeature'
import { Feature } from 'shared/clientConfig'
import { trackExperimentImpression } from 'utils/tracking/gtm/trackExperimentImpression'

export const useTrackAbPurchaseFlowRedirect = () => {
  const [abTestPurchaseFlows] = useFeature([Feature.AB_TEST_PURCHASE_FLOWS])
  const { params } = useRouteMatch<any>()
  const isFirstPage =
    typeof params.name === 'string' && typeof params.id === 'undefined'

  useEffect(() => {
    if (!abTestPurchaseFlows || !isFirstPage) {
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
    const experimentCookieName = `HEDVIG_EXP_${redirectConfig.optimizeExperimentId}`
    const cookieVariant = new CookieStorage().getItem(experimentCookieName)
    if (typeof cookieVariant === 'string') {
      const variant = parseInt(cookieVariant, 10) || 0
      trackExperimentImpression(redirectConfig.optimizeExperimentId, variant)
    }
  }, [abTestPurchaseFlows, isFirstPage, params.name])
}

import { ParameterizedContext } from 'koa'
import { SavingCookieStorage } from 'shared/sessionStorage'

const AB_COOKIE_MAX_AGE = 7 * 24 * 3600 * 1000
type AbPurchaseFlowRedirect = {
  // Use in env variables
  id: string
  // Take this from Google Optimize
  optimizeExperimentId: string
  originalFlow: string
  newFlow: string
}
// Keep short (<15 entries) or refactor to use map lookup
const AB_PURCHASE_FLOW_REDIRECTS: AbPurchaseFlowRedirect[] = [
  {
    id: 'CAR_PRICE_MATCH_V2',
    optimizeExperimentId: 'LUVcuEu7RVaePDiBz-id_g',
    originalFlow: 'car',
    newFlow: 'car.v2',
  },
]

export const abTestPurchaseFlowRedirect = (
  ctx: ParameterizedContext,
  serverCookieStorage: SavingCookieStorage,
): boolean => {
  const isFirstPage = ctx.params.id === undefined
  if (!isFirstPage) {
    return false
  }
  const redirectConfig = AB_PURCHASE_FLOW_REDIRECTS.find(
    (redirect) => redirect.originalFlow === ctx.params.name,
  )
  if (!redirectConfig) {
    return false
  }

  const logger = ctx.state.getLogger('abTestPurchaseFlow')

  const experimentCookieName = `HEDVIG_EXP_${redirectConfig.optimizeExperimentId}`
  const cookie = serverCookieStorage.getItem(experimentCookieName)
  let shouldRedirect
  if (cookie) {
    shouldRedirect = parseInt(cookie, 10) === 1
    logger.info(
      `Found experiment cookie, id=${redirectConfig.optimizeExperimentId} shouldRedirect=${shouldRedirect}`,
    )
  } else {
    const newFlowWeight = getRedirectWeight(redirectConfig.id)
    if (newFlowWeight === 0) {
      logger.info(
        `Skipping experiment id=${redirectConfig.id} for name=${redirectConfig.originalFlow} due to zero weight`,
      )
      return false
    }

    const variant = Math.random() * 100 < newFlowWeight ? 1 : 0
    logger.info(
      `AB redirect id: ${redirectConfig.id} new variant weight: ${newFlowWeight}, selected variant: ${variant}`,
      experimentCookieName,
    )
    shouldRedirect = variant === 1
    serverCookieStorage.setItem(experimentCookieName, String(variant), {
      expires: new Date(Date.now() + AB_COOKIE_MAX_AGE),
    })
  }

  if (shouldRedirect) {
    ctx.redirect(`/${ctx.params.locale}/new-member/${redirectConfig.newFlow}`)
    return true
  }
  return false
}

const getRedirectWeight = (redirectId: string): number => {
  const newSiteWeight = parseInt(
    process.env[`AB_REDIRECT_WEIGHT_${redirectId}`] ?? '0',
    10,
  )
  return isNaN(newSiteWeight) ? 0 : newSiteWeight
}

export type AbPurchaseFlowRedirect = {
  // Use in env variables
  id: string
  // Take this from Google Optimize
  optimizeExperimentId: string
  originalFlow: string
  newFlow: string
}
// Keep short (<15 entries) or refactor to use map lookup
export const AB_PURCHASE_FLOW_REDIRECTS: AbPurchaseFlowRedirect[] = [
  {
    id: 'CAR_PRICE_MATCH_V2',
    optimizeExperimentId: 'p87lZA8ASZaxxknL_9u4AQ',
    originalFlow: 'car',
    newFlow: 'car-v3',
  },
]

export const abExperimentCookieName = (experimentId: string) =>
  `HEDVIG_EXP_${experimentId}`

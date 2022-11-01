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
    optimizeExperimentId: 'LUVcuEu7RVaePDiBz-id_g',
    originalFlow: 'car',
    newFlow: 'car.v2',
  },
]

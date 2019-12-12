import { isMonthlyCostDeduction } from 'containers/types'
import { CompleteOfferData } from 'pages/OfferNew/types'

export const getHasMonthlyCostDeduction = (offer?: CompleteOfferData) =>
  (offer?.redeemedCampaigns.length ?? 0) > 0 &&
  isMonthlyCostDeduction(offer?.redeemedCampaigns[0].incentive)

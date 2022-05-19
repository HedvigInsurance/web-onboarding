import { QuoteBundle } from 'data/graphql'
import { Variation } from 'utils/hooks/useVariation'
import * as quoteBundleSelector from 'api/quoteBundleSelectors'
import { adtractionQuoteCart } from 'utils/tracking/adtraction/adtractionQuoteCart'
import { AdTractionMarketConfig } from 'l10n/adTractionConfigs'
import { handleSignedEvent } from './signing'
import { trackOfferEvent } from './trackOfferEvent'
import { EventName } from './types'

export type TrackSignedEventParams = {
  variation: Variation | null
  quoteCartId: string
  memberId: string
  bundle: QuoteBundle
  campaignCode?: string
  isDiscountMonthlyCostDeduction: boolean
  adTractionConfig: AdTractionMarketConfig
}

export const trackSignedCustomerEvent = ({
  variation,
  quoteCartId,
  memberId,
  bundle,
  campaignCode,
  isDiscountMonthlyCostDeduction,
  adTractionConfig,
}: TrackSignedEventParams) => {
  if (variation === Variation.AVY) {
    handleSignedEvent(memberId)
  }

  adtractionQuoteCart(
    memberId,
    quoteBundleSelector.getEmail(bundle) || '',
    bundle,
    adTractionConfig,
    campaignCode,
  )

  trackOfferEvent(
    EventName.SignedCustomer,
    bundle,
    isDiscountMonthlyCostDeduction,
    { quoteCartId, memberId },
  )
}

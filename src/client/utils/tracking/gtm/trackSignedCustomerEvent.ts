import { QuoteBundle } from 'data/graphql'
import { Variation } from 'utils/hooks/useVariation'
import * as quoteBundleSelector from 'api/quoteBundleSelectors'
import { adtractionQuoteCart } from 'utils/tracking/adtraction/adtractionQuoteCart'
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
}

export const trackSignedCustomerEvent = ({
  variation,
  quoteCartId,
  memberId,
  bundle,
  campaignCode,
  isDiscountMonthlyCostDeduction,
}: TrackSignedEventParams) => {
  const mainQuote = quoteBundleSelector.getMainQuote(bundle)

  if (variation === Variation.AVY) {
    handleSignedEvent(memberId)
  }

  adtractionQuoteCart(
    parseFloat(bundle.bundleCost.monthlyGross.amount),
    memberId,
    mainQuote.data.email || '',
    bundle,
    campaignCode,
  )

  trackOfferEvent(
    EventName.SignedCustomer,
    bundle,
    isDiscountMonthlyCostDeduction,
    { quoteCartId, memberId },
  )
}

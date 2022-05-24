import { useMemo } from 'react'
import { hasCar } from 'api/quoteBundleSelectors'
import { BundledQuote } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'

export const useGetPromotions = (quotes: BundledQuote[]) => {
  const textKeys = useTextKeys()

  const hasCarInBundles = hasCar(quotes)
  const promotions = useMemo(() => {
    return hasCarInBundles
      ? [
          {
            headingText: textKeys.OFFER_APP_PROMOTION_HEADING_CAR(),
            bodyText: textKeys.OFFER_APP_PROMOTION_PARAGRAPH_CAR(),
            imageUrl: '/new-member-assets/offer/app-promotion-car.jpg',
          },
          {
            headingText: textKeys.OFFER_SWITCH_PROMOTION_HEADING_CAR(),
            bodyText: textKeys.OFFER_SWITCH_PROMOTION_PARAGRAPH_CAR(),
            imageUrl: '/new-member-assets/offer/switch-promotion.jpg',
          },
        ]
      : [
          {
            headingText: textKeys.OFFER_APP_PROMOTION_HEADING(),
            bodyText: textKeys.OFFER_APP_PROMOTION_PARAGRAPH(),
            imageUrl: '/new-member-assets/offer/app-promotion.jpg',
          },
        ]
  }, [hasCarInBundles, textKeys])

  return promotions
}

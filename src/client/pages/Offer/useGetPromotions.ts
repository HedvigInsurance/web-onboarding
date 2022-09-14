import { useMemo } from 'react'
import { hasCar } from 'api/quoteBundleSelectors'
import { BundledQuote } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { useFeature } from 'utils/hooks/useFeature'
import { Feature } from 'shared/clientConfig'

export enum PromotionTypes {
  APP = 'promotion-app',
  SWITCH = 'promotion-switch',
}

export type Promotion = {
  headingText: string
  bodyText: string
  imageUrl: string
  id: PromotionTypes
}

export const useGetPromotions = (quotes: BundledQuote[]): Promotion[] => {
  const textKeys = useTextKeys()
  const [isCarCancellationEnbled] = useFeature([Feature.CAR_CANCELLATION])
  const hasCarInBundles = hasCar(quotes)
  const promotions = useMemo(() => {
    return hasCarInBundles
      ? [
          {
            id: PromotionTypes.APP,
            headingText: textKeys.OFFER_APP_PROMOTION_HEADING_CAR(),
            bodyText: textKeys.OFFER_APP_PROMOTION_PARAGRAPH_CAR(),
            imageUrl: '/new-member-assets/offer/app-promotion-car.jpg',
          },
          {
            id: PromotionTypes.SWITCH,
            headingText: textKeys.OFFER_SWITCH_PROMOTION_HEADING_CAR(),
            bodyText: isCarCancellationEnbled
              ? textKeys.OFFER_SWITCH_PROMOTION_PARAGRAPH_CAR_V2()
              : textKeys.OFFER_SWITCH_PROMOTION_PARAGRAPH_CAR(),
            imageUrl: '/new-member-assets/offer/switch-promotion.jpg',
          },
        ]
      : [
          {
            id: PromotionTypes.APP,
            headingText: textKeys.OFFER_APP_PROMOTION_HEADING(),
            bodyText: textKeys.OFFER_APP_PROMOTION_PARAGRAPH(),
            imageUrl: '/new-member-assets/offer/app-promotion.jpg',
          },
        ]
  }, [hasCarInBundles, textKeys, isCarCancellationEnbled])

  return promotions
}

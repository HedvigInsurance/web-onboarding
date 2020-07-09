import {
  FreeMonths,
  Incentive,
  MonthlyCostDeduction,
  NoDiscount,
  PercentageDiscountMonths,
} from 'data/graphql'
import * as React from 'react'
import { CompleteOfferDataForMember } from '../../types'

export const isFreeMonths = (incentive?: Incentive): incentive is FreeMonths =>
  incentive?.__typename === 'FreeMonths'

export const isMonthlyCostDeduction = (
  incentive?: Incentive,
): incentive is MonthlyCostDeduction =>
  incentive?.__typename === 'MonthlyCostDeduction'

export const isNoDiscount = (incentive?: Incentive): incentive is NoDiscount =>
  incentive?.__typename === 'NoDiscount'

export const isVisibleNoDiscount = (
  incentive?: Incentive,
): incentive is NoDiscount => incentive?.__typename === 'VisibleNoDiscount'

export const isPercentageDiscountMonths = (
  incentive?: Incentive,
): incentive is PercentageDiscountMonths =>
  incentive?.__typename === 'PercentageDiscountMonths'

export const getDiscountText = (textKeys: Record<string, any>) => (
  redeemedCampaigns: CompleteOfferDataForMember['redeemedCampaigns'],
): React.ReactNode => {
  const incentive = redeemedCampaigns[0]?.incentive
  if (!incentive || isNoDiscount(incentive)) {
    return null
  }

  if (isVisibleNoDiscount(incentive)) {
    return textKeys.WEB_VISIBLE_NO_DISCOUNT_ADDED_PERK({
      CAMPAIGN_NAME: redeemedCampaigns[0]?.owner?.displayName,
    })
  }

  if (isFreeMonths(incentive)) {
    return textKeys.WEB_VOUCHER_ADDEDPERK({
      FREE_MONTHS: incentive.quantity,
      CAMPAIGN_NAME: redeemedCampaigns[0]?.owner?.displayName,
    })
  }

  if (isMonthlyCostDeduction(incentive)) {
    return textKeys.WEB_REFERRAL_ADDEDPERK({
      REFERRAL_VALUE: `${Number(incentive.amount?.amount)} kr`,
    })
  }

  if (isPercentageDiscountMonths(incentive)) {
    return textKeys.WEB_PERCENTAGE_DISCOUNT_MONTHS_ADDEDPERK({
      PERCENTAGE: incentive.percentageDiscount,
      QUANTITY: ((incentive as unknown) as any).quantityMonths,
    })
  }

  return redeemedCampaigns[0].owner?.displayName ?? null
}

export const gqlDateFormat = 'yyyy-MM-dd'

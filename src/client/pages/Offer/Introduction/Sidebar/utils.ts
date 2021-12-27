import React from 'react'
import {
  FreeMonths,
  Incentive,
  MonthlyCostDeduction,
  NoDiscount,
  PercentageDiscountMonths,
  RedeemedCampaignsQuery,
} from 'data/graphql'

type QueriedIncentive =
  | RedeemedCampaignsQuery['redeemedCampaigns'][0]['incentive']
  | Incentive

export const isFreeMonths = (
  incentive?: QueriedIncentive,
): incentive is FreeMonths => incentive?.__typename === 'FreeMonths'

export const isVisibleNoDiscount = (
  incentive?: QueriedIncentive,
): incentive is NoDiscount => incentive?.__typename === 'VisibleNoDiscount'

export const isMonthlyCostDeduction = (
  incentive?: QueriedIncentive,
): incentive is MonthlyCostDeduction =>
  incentive?.__typename === 'MonthlyCostDeduction'

export const isNoDiscount = (
  incentive?: QueriedIncentive,
): incentive is NoDiscount => incentive?.__typename === 'NoDiscount'

export const isPercentageDiscountMonths = (
  incentive?: QueriedIncentive,
): incentive is PercentageDiscountMonths =>
  incentive?.__typename === 'PercentageDiscountMonths'

export const getDiscountText = (textKeys: Record<string, any>) => (
  redeemedCampaigns: RedeemedCampaignsQuery['redeemedCampaigns'],
  currency: string,
): React.ReactNode => {
  const incentive = redeemedCampaigns[0]?.incentive
  if (!incentive || isNoDiscount(incentive as any)) {
    return null
  }

  if (isVisibleNoDiscount(incentive)) {
    return textKeys.WEB_GENERIC_CAMPAIGN_ADDEDPERK({
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
      REFERRAL_VALUE: `${Number(incentive.amount?.amount)} ${currency}`,
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

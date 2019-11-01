export interface MonetaryAmount {
  amount: string
  currency: string
}

export interface FreeMonths {
  quantity: number
  __typename: string
}

export interface MonthlyCostDeduction {
  amount: MonetaryAmount
  __typename: string
}

export type Incentive = FreeMonths | MonthlyCostDeduction

export const isFreeMonths = (incentive: Incentive): incentive is FreeMonths =>
  incentive.__typename === 'FreeMonths'

export const isMonthlyCostDeduction = (
  incentive: Incentive,
): incentive is MonthlyCostDeduction =>
  incentive.__typename === 'MonthlyCostDeduction'

export const isNoDiscount = (incentive: Incentive) =>
  incentive.__typename === 'NoDiscount'

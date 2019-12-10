import { Incentive } from '../../generated/graphql'

export const isFreeMonths = (incentive: Incentive): boolean =>
  incentive.__typename === 'FreeMonths'

export const isMonthlyCostDeduction = (incentive: Incentive): boolean =>
  incentive.__typename === 'MonthlyCostDeduction'

export const isNoDiscount = (incentive: Incentive): boolean =>
  incentive.__typename === 'NoDiscount'

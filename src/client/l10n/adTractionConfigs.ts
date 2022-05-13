import { MarketLabel } from './locales'

type AdTractionConfigs = Record<MarketLabel, AdTractionMarketConfig>

export type AdTractionMarketConfig = {
  tp: number
}

export const adTractionConfig: AdTractionConfigs = {
  SE: {
    tp: 1719019650,
  },
  NO: {
    tp: 1719022031,
  },
  DK: {
    tp: 1719022373,
  },
}

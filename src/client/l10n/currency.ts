import { MarketLabel } from './locales'

export type CurrencyData = {
  currencySymbol: string
  currencyCode: string
}

type Currency = Record<MarketLabel, CurrencyData>

export const currency: Currency = {
  SE: {
    currencySymbol: 'kr',
    currencyCode: 'SEK',
  },
  NO: {
    currencySymbol: 'kr',
    currencyCode: 'NOK',
  },
  DK: {
    currencySymbol: 'kr.',
    currencyCode: 'DKK',
  },
}

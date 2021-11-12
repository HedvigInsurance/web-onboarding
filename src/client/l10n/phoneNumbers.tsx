import { MarketLabel } from './locales'

type PhoneNumbers = Partial<Record<MarketLabel, PhoneNumberData>>

export type PhoneNumberData = {
  displayNumber: string
  hrefNumber: string
}

export const phoneNumbers: PhoneNumbers = {
  SE: {
    displayNumber: '075-101 20 00',
    hrefNumber: '0751012000',
  },
}

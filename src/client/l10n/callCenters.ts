import { MarketLabel } from './locales'

type CallCenters = Partial<Record<MarketLabel, CallCenterData>>

export type CallCenterData = {
  displayNumber: string
  hrefNumber: string
  opensAt: string
  closesAt: string
  lunchStartsAt: string
  lunchEndsAt: string
}

export const callCenters: CallCenters = {
  SE: {
    displayNumber: '075-101 20 00',
    hrefNumber: 'tel:0751012000',
    opensAt: '09',
    closesAt: '18',
    lunchStartsAt: '12',
    lunchEndsAt: '13',
  },
}

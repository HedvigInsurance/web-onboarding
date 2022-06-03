import { MarketLabel } from './locales'

export type CallCenterVariant = 'callCenter' | 'supportNumber'
type CallCentersPerMarket = Partial<Record<CallCenterVariant, CallCenterData>>
type CallCenters = Partial<Record<MarketLabel, CallCentersPerMarket>>

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
    callCenter: {
      displayNumber: '075-101 20 00',
      hrefNumber: 'tel:0751012000',
      opensAt: '09',
      closesAt: '18',
      lunchStartsAt: '12',
      lunchEndsAt: '13',
    },
    supportNumber: {
      displayNumber: '010-45 99 200',
      hrefNumber: 'tel:+46104599200.',
      opensAt: '09',
      closesAt: '17',
      lunchStartsAt: '12',
      lunchEndsAt: '13',
    },
  },
  NO: {
    callCenter: {
      displayNumber: '38 99 41 11',
      hrefNumber: 'tel:38 99 41 11',
      opensAt: '09',
      closesAt: '16',
      lunchStartsAt: '12',
      lunchEndsAt: '13',
    },
    supportNumber: {
      displayNumber: '38 99 41 11',
      hrefNumber: 'tel:38 99 41 11',
      opensAt: '09',
      closesAt: '16',
      lunchStartsAt: '12',
      lunchEndsAt: '13',
    },
  },
}

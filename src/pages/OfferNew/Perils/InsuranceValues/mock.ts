import { QuoteTextKeyType } from 'pages/OfferNew/utils'

export interface InsuranceValue {
  title: string
  value: string
  tooltipBody: string
  tooltipTitle: string
}

export type InsuranceValues = Record<string, InsuranceValue>

export const insuranceValues = (
  _quoteTextKeyType: QuoteTextKeyType,
): InsuranceValues => ({})

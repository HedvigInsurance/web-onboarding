import { ExtraBuildingType } from 'src/client/data/graphql'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'

export type PriceData = {
  prices: Array<Price>
  totalBundleCost: string
  discount?: string
  currency: string
  campaignName?: string | null
  campaignCode?: string
  isDiscountMonthlyCostDeduction: boolean
}

export type QuoteDetailsInput = {
  street?: string | null
  type: InsuranceType
  subType?: string | null
  floor?: string | null
  apartment?: string | null
  yearOfConstruction?: number | null
  numberOfBathrooms?: number | null
  isSubleted?: boolean | null
  extraBuildings?: Array<ExtraBuildingType> | null
  zipCode?: string | null
  livingSpace?: number | null
  householdSize?: number | null
  coInsured?: number | null
  student?: boolean | null
  ancillarySpace?: number | null
  isStudent?: boolean | null
  phoneNumber?: string | null
}

export type Price = {
  displayName: string
  price: string
}

export type ContactInfoData = {
  firstName?: string | null
  lastName?: string | null
  ssn?: string | null
  email?: string | null
}

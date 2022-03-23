import { ExtraBuildingInput } from 'data/graphql'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'

export type PriceData = {
  prices: Array<Price>
  totalBundleCost: string
  discount?: string
  currency: string
  campaignName?: string | null
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
  extraBuildings?: Array<ExtraBuildingInput> | null
  zipCode?: string | null
  livingSpace?: number | null
  householdSize?: number | null
  youth?: boolean | null
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

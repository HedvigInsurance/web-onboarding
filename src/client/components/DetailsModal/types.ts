import { BundledQuote, ExtraBuilding } from 'src/client/data/graphql'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'

type QuoteHolderInput = Pick<
  BundledQuote,
  | 'firstName'
  | 'lastName'
  | 'birthDate'
  | 'email'
  | 'phoneNumber'
  | 'startDate'
  | 'currentInsurer'
  | 'ssn'
  | 'dataCollectionId'
>
export type QuoteDetailsInput = {
  street?: string | null
  city?: string | null
  type: InsuranceType
  subType?: string | null
  floor?: string | null
  apartment?: string | null
  yearOfConstruction?: number | null
  numberOfBathrooms?: number | null
  isSubleted?: boolean | null
  extraBuildings?: Array<ExtraBuilding> | null
  zipCode?: string | null
  livingSpace?: number | null
  squareMeters?: number | null
  householdSize?: number | null
  coInsured?: number | null
  student?: boolean | null
  ancillarySpace?: number | null
  isStudent?: boolean | null
  phoneNumber?: string | null
}

export type QuoteInput = Partial<QuoteHolderInput> & {
  data: QuoteDetailsInput
}

import { ExtraBuildingInput, CreateQuoteInput } from 'data/graphql'
import { CreateQuoteInsuranceType } from 'utils/insuranceType'

type QuoteHolderInput = Pick<
  CreateQuoteInput,
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
  type: CreateQuoteInsuranceType
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
}

export type QuoteInput = Partial<QuoteHolderInput> & {
  data: QuoteDetailsInput
}

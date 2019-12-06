export interface MonetaryAmount {
  amount: string
  currency: string
}

export interface FreeMonths {
  quantity: number
  __typename: string
}

export interface MonthlyCostDeduction {
  amount: MonetaryAmount
  __typename: string
}

export type Incentive = FreeMonths | MonthlyCostDeduction

export enum ApartmentType {
  RENT = 'RENT',
  BRF = 'BRF',
  STUDENT_RENT = 'STUDENT_RENT',
  STUDENT_BRF = 'STUDENT_BRF',
}

interface ExtraBuildingCore {
  area: number
  displayName: string
  hasWaterConnected: boolean
}

type ExtraBuildingGarage = ExtraBuildingCore
type ExtraBuildingCarport = ExtraBuildingCore
type ExtraBuildingShed = ExtraBuildingCore
type ExtraBuildingStorehouse = ExtraBuildingCore
type ExtraBuildingFriggebod = ExtraBuildingCore
type ExtraBuildingAttefall = ExtraBuildingCore
type ExtraBuildingOuthouse = ExtraBuildingCore
type ExtraBuildingGuesthouse = ExtraBuildingCore
type ExtraBuildingGazebo = ExtraBuildingCore
type ExtraBuildingGreenhouse = ExtraBuildingCore
type ExtraBuildingSauna = ExtraBuildingCore
type ExtraBuildingBarn = ExtraBuildingCore
type ExtraBuildingBoathouse = ExtraBuildingCore
type ExtraBuildingOther = ExtraBuildingCore

type ExtraBuilding =
  | ExtraBuildingGarage
  | ExtraBuildingCarport
  | ExtraBuildingShed
  | ExtraBuildingStorehouse
  | ExtraBuildingFriggebod
  | ExtraBuildingAttefall
  | ExtraBuildingOuthouse
  | ExtraBuildingGuesthouse
  | ExtraBuildingGazebo
  | ExtraBuildingGreenhouse
  | ExtraBuildingSauna
  | ExtraBuildingBarn
  | ExtraBuildingBoathouse
  | ExtraBuildingOther

interface CompleteApartmentQuoteDetails {
  street: string
  zipCode: string
  householdSize: number
  livingSpace: number
  type: ApartmentType
  __typename: string
}

interface CompleteHouseQuoteDetails {
  street: string
  zipCode: string
  householdSize: number
  livingSpace: number
  ancillarySpace: number
  extraBuildings: ExtraBuilding[]
  __typename: string
}

type CompleteQuoteDetails =
  | CompleteApartmentQuoteDetails
  | CompleteHouseQuoteDetails

interface IncompleteApartmentQuoteDetails {
  street?: string
  zipCode?: string
  householdSize?: number
  livingSpace?: number
  type?: ApartmentType
  __typename: string
}

interface IncompleteHouseQuoteDetails {
  street?: string
  zipCode?: string
  householdSize?: number
  livingSpace?: number
  ancillarySpace?: number
  extraBuildings?: ExtraBuilding[]
  __typename: string
}

type IncompleteQuoteDetails =
  | IncompleteApartmentQuoteDetails
  | IncompleteHouseQuoteDetails

interface CompleteQuote {
  id: string
  currentInsurer?: string
  price: MonetaryAmount
  details: CompleteQuoteDetails
  __typename: string
}

interface IncompleteQuote {
  id: string
  currentInsurer?: string
  details: IncompleteQuoteDetails
  __typename: string
}

type Quote = CompleteQuote | IncompleteQuote

export interface OfferData {
  quote: Quote
  redeemedCampaigns: Array<{
    incentive: Incentive
    code: string
    owner: {
      displayName: string
    }
  }>
  member: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

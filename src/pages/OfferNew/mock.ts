enum ApartmentType {
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

interface MonetaryAmount {
  amount: string
  currency: string
}

interface CompleteApartmentQuoteDetails {
  street: string
  zipCode: string
  householdSize: number
  livingSpace: number
  type: ApartmentType
}

interface CompleteHouseQuoteDetails {
  street: string
  zipCode: string
  householdSize: number
  livingSpace: number
  ancillarySpace: number
  extraBuildings: ExtraBuilding[]
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
}

interface IncompleteHouseQuoteDetails {
  street?: string
  zipCode?: string
  householdSize?: number
  livingSpace?: number
  ancillarySpace?: number
  extraBuildings?: ExtraBuilding[]
}

type IncompleteQuoteDetails =
  | IncompleteApartmentQuoteDetails
  | IncompleteHouseQuoteDetails

interface CompleteQuote {
  id: string
  currentInsurer?: string
  price: MonetaryAmount
  details: CompleteQuoteDetails
}

interface IncompleteQuote {
  id: string
  currentInsurer?: string
  details: IncompleteQuoteDetails
}

export type QuoteData = CompleteQuote | IncompleteQuote

export const mockedQuote: QuoteData = {
  id: '123',
  currentInsurer: 'Länsförsäkringar',
  price: {
    amount: '99.0',
    currency: 'SEK',
  },
  details: {
    street: 'Strandvägen 1',
    zipCode: '123 45',
    householdSize: 49,
    livingSpace: 49,
    type: ApartmentType.STUDENT_BRF,
  },
}

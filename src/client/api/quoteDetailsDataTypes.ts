import { TypeOfContract, ExtraBuilding } from 'data/graphql'

type QuoteDataCommon = {
  typeOfContract: TypeOfContract
  numberCoInsured: number
}

type StudentData = {
  isStudent?: boolean
}

type YouthData = {
  isYouth?: boolean
}

type QuoteDataHome = QuoteDataCommon & {
  street: string
  zipCode: string
  livingSpace: number
}

type QuoteDataSEApartment = QuoteDataHome & StudentData

type QuoteDataSEHouse = QuoteDataHome &
  StudentData & {
    ancillaryArea: number
    yearOfConstruction: number
    numberOfBathrooms: number
    extraBuildings: ExtraBuilding[]
    isSubleted: boolean
  }

type QuoteDataNOHomeContents = QuoteDataHome & YouthData

type QuoteDataDKHomeContents = QuoteDataHome & StudentData

export type MainQuoteDetails =
  | QuoteDataSEApartment
  | QuoteDataSEHouse
  | QuoteDataSEApartment
  | QuoteDataNOHomeContents
  | QuoteDataDKHomeContents

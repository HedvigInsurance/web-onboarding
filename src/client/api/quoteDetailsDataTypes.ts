import { TypeOfContract, ExtraBuilding } from 'data/graphql'

type QuoteDataCommon = {
  typeOfContract: TypeOfContract
  numberCoInsured: number
  id: string
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

type QuoteDataSeApartment = QuoteDataHome & StudentData

type QuoteDataSeHouse = QuoteDataHome &
  StudentData & {
    ancillaryArea: number
    yearOfConstruction: number
    numberOfBathrooms: number
    extraBuildings: ExtraBuilding[]
    isSubleted: boolean
  }

type QuoteDataSeAccident = QuoteDataCommon & StudentData

type QuoteDataNoHomeContents = QuoteDataHome & YouthData

type QuoteDataNoTravel = QuoteDataCommon & YouthData

type QuoteDataDkHomeContents = QuoteDataHome & StudentData

type QuoteDataDkAccident = QuoteDataCommon & StudentData

type QuoteDataDkTravel = QuoteDataCommon & StudentData

export type QuoteDetails =
  | QuoteDataSeApartment
  | QuoteDataSeHouse
  | QuoteDataSeApartment
  | QuoteDataSeAccident
  | QuoteDataNoHomeContents
  | QuoteDataNoTravel
  | QuoteDataDkHomeContents
  | QuoteDataDkAccident
  | QuoteDataDkTravel

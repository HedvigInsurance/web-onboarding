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
    isSubleted: boolean
    extraBuildings?: ExtraBuilding[]
  }

type QuoteDataSeAccident = QuoteDataCommon & StudentData

type QuoteDataNoHomeContents = QuoteDataHome & YouthData

type QuoteDataNoTravel = QuoteDataCommon & YouthData

type QuoteDataDkHomeContents = QuoteDataHome &
  StudentData & {
    floor?: string | null
    apartment?: string | null
  }

type QuoteDataDkAccident = QuoteDataCommon & StudentData

type QuoteDataDkTravel = QuoteDataCommon & StudentData

export type QuoteDetails =
  | QuoteDataSeApartment
  | QuoteDataSeHouse
  | QuoteDataSeAccident
  | QuoteDataNoHomeContents
  | QuoteDataNoTravel
  | QuoteDataDkHomeContents
  | QuoteDataDkAccident
  | QuoteDataDkTravel

export type QuoteDetailsData = QuoteDetails[]

export type HomeQuoteDetails =
  | QuoteDataSeApartment
  | QuoteDataSeHouse
  | QuoteDataNoHomeContents
  | QuoteDataDkHomeContents

export type HouseQuoteDetails = QuoteDataSeHouse

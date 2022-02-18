import { TypeOfContract, ExtraBuildingType } from 'data/graphql'
import { QuoteDetailsData } from 'api/quoteDetailsDataTypes'

export const quoteDetailsDataMockRentalSE: QuoteDetailsData = [
  {
    id: 'QUOTE_ID_SE_APARTMENT_RENT',
    typeOfContract: TypeOfContract.SeApartmentRent,
    street: 'Hyresvägen 1',
    zipCode: '12345',
    numberCoInsured: 1,
    livingSpace: 45,
    isStudent: false,
  },
]

export const quoteDetailsDataMockBrfAccidentSE: QuoteDetailsData = [
  {
    id: 'QUOTE_ID_SE_APARTMENT_BRF',
    typeOfContract: TypeOfContract.SeApartmentBrf,
    street: 'Bostadsrättsvägen 1',
    zipCode: '12345',
    livingSpace: 45,
    numberCoInsured: 1,
    isStudent: false,
  },
  {
    id: 'QUOTE_ID_SE_ACCIDENT',
    typeOfContract: TypeOfContract.SeAccident,
    numberCoInsured: 1,
    isStudent: false,
  },
]

export const quoteDetailsDataMockHouseSE: QuoteDetailsData = [
  {
    id: 'QUOTE_ID_SE_HOUSE',
    typeOfContract: TypeOfContract.SeHouse,
    street: 'Husvägen 1',
    zipCode: '12649',
    livingSpace: 145,
    numberCoInsured: 2,
    isStudent: false,
    numberOfBathrooms: 2,
    yearOfConstruction: 1977,
    ancillaryArea: 60,
    isSubleted: false,
    extraBuildings: [
      {
        type: ExtraBuildingType.Garage,
        displayName: 'Garage',
        area: 10,
        hasWaterConnected: false,
      },
    ],
  },
]

import { TypeOfContract, ExtraBuildingType } from 'data/graphql'
import { HomeQuoteDetails, QuoteDetails } from 'api/quoteDetailsDataTypes'

export const mockedQuoteCartId = 'abc123'

export const quoteDetailsDataMockRentalSe: HomeQuoteDetails[] = [
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

export const quoteDetailsDataMockBrfAccidentSe: [
  HomeQuoteDetails,
  QuoteDetails,
] = [
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

export const quoteDetailsDataMockHouseSe: HomeQuoteDetails[] = [
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

export const quoteDetailsDataMockHomeContentStudentOwnDk: HomeQuoteDetails[] = [
  {
    id: 'QUOTE_ID_DK_HOME_CONTENT_STUDENT_OWN',
    typeOfContract: TypeOfContract.DkHomeContentStudentOwn,
    street: 'Theodore Roosevelts Vej 3',
    zipCode: '2100',
    apartment: 'tv',
    floor: '2',
    livingSpace: 34,
    numberCoInsured: 0,
    isStudent: true,
  },
]

export const mockedQuoteDetailsDataQueryResponseSeHouse = {
  data: {
    quoteCart: {
      id: mockedQuoteCartId,
      bundle: {
        quotes: [
          {
            id: '92952f88-d245-4f63-a128-91aa7d4927c3',
            data: {
              type: 'SWEDISH_HOUSE',
              id: 'cd7d54f9-747a-416f-8f5d-fffc23d7174b',
              ssn: '199006081234',
              birthDate: '1990-06-08',
              firstName: 'Ellen',
              lastName: 'Ellengren',
              email: 'test@test.test',
              phoneNumber: null,
              street: 'Villavägen 1',
              zipCode: '12345',
              city: null,
              livingSpace: 120,
              numberCoInsured: 1,
              ancillaryArea: 60,
              yearOfConstruction: 1977,
              numberOfBathrooms: 2,
              extraBuildings: [],
              isSubleted: false,
              floor: 0,
              typeOfContract: 'SE_HOUSE',
            },
            __typename: 'BundledQuote',
          },
        ],
        __typename: 'QuoteBundle',
      },
      __typename: 'QuoteCart',
    },
  },
}

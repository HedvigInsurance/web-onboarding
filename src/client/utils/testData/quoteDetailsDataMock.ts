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

export const mockedQuoteDetailsDataQueryResponseNoCombo = {
  data: {
    quoteCart: {
      id: mockedQuoteCartId,
      bundle: {
        quotes: [
          {
            id: 'f2fb8c71-f22f-4e2e-8d16-7a65296ea7ca',
            data: {
              type: 'NORWEGIAN_HOME_CONTENT',
              id: '727d1b22-eddc-4556-9656-c1790caeb89b',
              ssn: null,
              birthDate: '1990-09-09',
              firstName: 'Test',
              lastName: 'Testsen',
              email: 'test@testsen.no',
              phoneNumber: null,
              street: 'Testveien 1',
              city: null,
              zipCode: '1111',
              livingSpace: 50,
              numberCoInsured: 2,
              isYouth: false,
              subType: 'RENT',
              complete: true,
              typeOfContract: 'NO_HOME_CONTENT_RENT',
            },
            __typename: 'BundledQuote',
          },
          {
            id: 'be21ef31-c851-4f7b-9dc6-802d633b7544',
            data: {
              type: 'NORWEGIAN_TRAVEL',
              id: '41f305c6-284c-46b1-9f71-da57cbabbcdd',
              ssn: null,
              birthDate: '1990-09-09',
              firstName: 'Test',
              lastName: 'Testsen',
              email: 'test@testsen.no',
              phoneNumber: null,
              numberCoInsured: 2,
              isYouth: false,
              complete: true,
              typeOfContract: 'NO_TRAVEL',
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

export const mockedQuoteDetailsDataQueryResponseDKHomeOwnerStudent = {
  data: {
    quoteCart: {
      id: mockedQuoteCartId,
      bundle: {
        quotes: [
          {
            id: 'aefe6c90-ff57-44fd-8ccf-776585a2deb4',
            data: {
              type: 'DANISH_HOME_CONTENT',
              id: '99537816-91b9-4cc8-9e5f-2b1b169acf16',
              ssn: null,
              birthDate: '1999-08-08',
              firstName: 'Dansk',
              lastName: 'Dansksen',
              email: 'sven.svensson.cihrf@hedvig.com',
              phoneNumber: null,
              street: 'Theodore Roosevelts Vej 3',
              zipCode: '2100',
              bbrId: null,
              city: null,
              apartment: 'tv',
              floor: '2',
              livingSpace: 34,
              numberCoInsured: 0,
              isStudent: true,
              subType: 'OWN',
              typeOfContract: 'DK_HOME_CONTENT_STUDENT_OWN',
              complete: true,
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

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

export const mockedQuoteDetailsDataQueryResponseSeHouse = [
  [
    {
      label: 'CHECKOUT_DETAILS_ADDRESS',
      value: {
        value: 'Storgatan 5',
      },
    },
    {
      label: 'CHECKOUT_DETAILS_ZIPCODE',
      value: {
        value: '123 45',
      },
    },
    {
      label: 'CHECKOUT_DETAILS_LIVING_SPACE',
      value: { value: 23, suffix: 'CHECKOUT_DETAILS_SQM_SUFFIX' },
    },
    {
      label: 'CHECKOUT_DETAILS_RESIDENCE_TYPE',
      value: {
        textKey: 'CHECKOUT_DETAILS_RESIDENCE_TYPE_OWN_HOUSE',
      },
    },
    {
      label: 'CHECKOUT_DETAILS_ANCILLARY_SPACE',
      value: {
        suffix: 'CHECKOUT_DETAILS_SQM_SUFFIX',
        value: 0,
      },
    },
    {
      label: 'CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS',
      value: {
        value: 2,
        suffix: 'CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS_SUFFIX_MANY',
      },
    },
    { label: 'CHECKOUT_DETAILS_YEAR_OF_CONSTRUCTION', value: { value: 1977 } },
    { label: 'CHECKOUT_DETAILS_IS_PARTLY_SUBLET', value: { textKey: 'NO' } },
  ],
  [
    {
      label: 'CHECKOUT_DETAILS_HOUSEHOLD_SIZE',
      value: {
        value: 2,
        suffix: 'CHECKOUT_DETAILS_NUMBER_OF_PEOPLE_SUFFIX_MANY',
      },
    },
  ],
]

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

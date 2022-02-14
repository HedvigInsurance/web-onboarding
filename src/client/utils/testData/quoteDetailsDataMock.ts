import { TypeOfContract } from 'data/graphql'
import { QuoteDetailsData } from '../hooks/useQuoteDetailsData'

export const quoteDetailsDataMockRentalSE = {
  SE_APARTMENT_RENT: {
    id: 'af271e4d-f70c-4e05-ac71-c8b0fd9dee4f',
    ssn: '199006081234',
    birthDate: '1990-06-08',
    firstName: 'Svea',
    lastName: 'Svensson',
    email: 'svea@svensson.se',
    phoneNumber: null,
    street: 'Svenssonvägen 65',
    city: null,
    zipCode: '12649',
    numberCoInsured: 1,
    livingSpace: 45,
    subType: 'RENT',
    typeOfContract: TypeOfContract.SeApartmentRent,
    isStudent: false,
  },
}

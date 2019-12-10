import { ApartmentType } from 'generated/graphql'
import { OfferData } from './types'

export const mockedOffer: OfferData = {
  quote: {
    id: '123',
    currentInsurer: 'Länsförsäkringar',
    price: {
      amount: '99.0',
      currency: 'SEK',
    },
    details: {
      street: 'Strandvägen 1',
      zipCode: '123 45',
      householdSize: 2,
      livingSpace: 49,
      type: ApartmentType.StudentBrf,
      __typename: 'CompleteApartmentQuoteDetails',
    },
    __typename: 'CompleteQuote',
  },
  redeemedCampaigns: [],
  member: {
    id: '1337',
    firstName: 'Test',
    lastName: 'Testerson',
    email: 'test@testerson.se',
  },
}

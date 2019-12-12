import { OfferData } from 'containers/OfferContainer'
import { MockedResponse } from 'react-apollo/test-links'
import { InsuranceType } from 'utils/insuranceDomainUtils'
import {
  CREATE_OFFER_MUTATION,
  CreateOfferMutationVariables,
} from '../containers/CreateOfferContainer'
import { ChatStep, Insurer, State as ChatState } from '../state'

export const mockState = (): ChatState => ({
  nameAge: {
    firstName: 'John',
    lastName: 'Doe',
    age: 22,
  },
  livingSituation: {
    postalNumber: '123 45',
    streetAddress: 'Storgatan 1',
    insuranceType: InsuranceType.Rent,
    size: 37,
    numberOfPeople: 1,
  },
  isStudent: false,
  currentInsurance: {
    currentInsurer: Insurer.FOLKSAM,
    hasCurrentInsurance: true,
  },
  currentStep: ChatStep.SHOW_OFFER,
  initialVisibleSteps: [],
  visibleSteps: [],
})

export const mockOffer: OfferData = {
  insurance: {
    address: 'Testvägen 1',
    cost: {
      monthlyNet: {
        amount: '99.00',
        currency: 'SEK',
      },
      monthlyGross: {
        amount: '99.00',
        currency: 'SEK',
      },
      monthlyDiscount: {
        amount: '0.00',
        currency: 'SEK',
      },
    },
    insuredAtOtherCompany: false,
    type: InsuranceType.Rent,
    postalNumber: '12345',
    personsInHousehold: 1,
    currentInsurerName: Insurer.FOLKSAM,
  },
  redeemedCampaigns: [],
  member: {
    id: '1337',
    firstName: 'Test',
    lastName: 'Testerson',
    email: 'test@testerson.se',
  },
}

export const createCreateOfferMutationMock = (
  isStudent: boolean = false,
): MockedResponse[] => [
  {
    request: {
      query: CREATE_OFFER_MUTATION,
      // tslint:disable-next-line no-object-literal-type-assertion
      variables: {
        firstName: mockState().nameAge.firstName,
        lastName: mockState().nameAge.lastName,
        age: mockState().nameAge.age,
        address: mockState().livingSituation.streetAddress,
        postalNumber: '12345',
        squareMeters: mockState().livingSituation.size,
        insuranceType: isStudent
          ? InsuranceType.StudentRent
          : InsuranceType.Rent,
        personsInHousehold: mockState().livingSituation.numberOfPeople,
        previousInsurer: mockState().currentInsurance.currentInsurer,
      } as CreateOfferMutationVariables,
    },
    result: {
      data: { createOffer: 'abc123' },
    },
  },
]

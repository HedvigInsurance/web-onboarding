import { MockedResponse } from 'react-apollo/test-links'
import {
  CREATE_OFFER_MUTATION,
  CreateOfferMutationVariables,
} from '../containers/CreateOfferContainer'
import { ApartmentType, ChatStep, Insurer, State as ChatState } from '../state'

export const mockState = (): ChatState => ({
  nameAge: {
    firstName: 'John',
    lastName: 'Doe',
    age: 42,
  },
  livingSituation: {
    postalNumber: '12345',
    streetAddress: 'Storgatan 1',
    apartmentType: ApartmentType.RENT,
    size: 37,
    numberOfPeople: 1,
  },
  currentInsurance: {
    currentInsurer: Insurer.FOLKSAM,
    hasCurrentInsurance: true,
  },
  currentStep: ChatStep.SHOW_OFFER,
  initialVisibleSteps: [],
  visibleSteps: [],
})

export const createCreateOfferMutationMock = (): MockedResponse[] => [
  {
    request: {
      query: CREATE_OFFER_MUTATION,
      // tslint:disable-next-line no-object-literal-type-assertion
      variables: {
        firstName: mockState().nameAge.firstName,
        lastName: mockState().nameAge.lastName,
        age: mockState().nameAge.age,
        address: mockState().livingSituation.streetAddress,
        postalNumber: mockState().livingSituation.postalNumber,
        squareMeters: mockState().livingSituation.size,
        insuranceType: mockState().livingSituation.apartmentType,
        personsInHousehold: mockState().livingSituation.numberOfPeople,
        previousInsurer: mockState().currentInsurance.currentInsurer,
      } as CreateOfferMutationVariables,
    },
    result: {
      data: { createOffer: 'abc123' },
    },
  },
]

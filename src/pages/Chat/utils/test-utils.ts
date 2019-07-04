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
    insuranceType: InsuranceType.RENT,
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
    monthlyCost: 99,
    insuredAtOtherCompany: false,
    type: InsuranceType.RENT,
    postalNumber: '12345',
    personsInHousehold: 1,
    currentInsurerName: Insurer.FOLKSAM,
  },
  member: {
    firstName: 'Test',
    lastName: 'Testerson',
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
          ? InsuranceType.STUDENT_RENT
          : InsuranceType.RENT,
        personsInHousehold: mockState().livingSituation.numberOfPeople,
        previousInsurer: mockState().currentInsurance.currentInsurer,
      } as CreateOfferMutationVariables,
    },
    result: {
      data: { createOffer: 'abc123' },
    },
  },
]

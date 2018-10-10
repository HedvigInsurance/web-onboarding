import { ApolloSubscriptionContext } from 'client/ApolloSubscriptionContext'
import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import {
  createSession,
  IsomorphicSessionStorage,
  Session,
  SESSION_KEY,
} from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { mockNetworkWait } from 'utils/test-utils'
import { ApartmentType, ChatStep, Insurer, State as ChatState } from '../state'
import {
  CREATE_OFFER_MUTATION,
  CREATE_SESSION_TOKEN_MUTATION,
  CreateOfferComponent,
  CreateOfferMutationVariables,
} from './createOffer'

const mockState = (): ChatState => ({
  nameAge: {
    firstName: 'John',
    lastName: 'Doe',
    age: 42,
  },
  livingSituation: {
    postalCode: '12345',
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

it('creates a session and an offer', async () => {
  const closeStub = jest.fn()
  const subscriptionClientStub = {
    close: closeStub,
  }

  const mockedRequests: MockedResponse[] = [
    {
      request: {
        query: CREATE_SESSION_TOKEN_MUTATION,
      },
      result: {
        data: { createSession: 'blargh' },
      },
    },
    {
      request: {
        query: CREATE_OFFER_MUTATION,
        // tslint:disable-next-line no-object-literal-type-assertion
        variables: {
          firstName: mockState().nameAge.firstName,
          lastName: mockState().nameAge.lastName,
          age: mockState().nameAge.age,
          address: mockState().livingSituation.streetAddress,
          postalNumber: mockState().livingSituation.postalCode,
          city: 'Storstan',
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
  const wrapper = mount(
    <ApolloSubscriptionContext.Provider
      value={{
        subscriptionClient: (subscriptionClientStub as any) as SubscriptionClient,
      }}
    >
      <MockedProvider mocks={mockedRequests}>
        <Provider<{
          chatConversation: ChatState
          storage: { session: IsomorphicSessionStorage<Session> }
        }>
          initialState={{
            chatConversation: mockState(),
            storage: {
              session: createSession(new MockStorage({})),
            },
          }}
        >
          <CreateOfferComponent />
        </Provider>
      </MockedProvider>
    </ApolloSubscriptionContext.Provider>,
  )

  wrapper.find('button').simulate('click')

  await mockNetworkWait()
  await mockNetworkWait()
  await mockNetworkWait(2)
  wrapper.update()

  expect(wrapper.find('div').contains('success')).toBe(true)
})

it('creates an offer when already has a session token', async () => {
  const mockedRequests: MockedResponse[] = [
    {
      request: {
        query: CREATE_OFFER_MUTATION,
        // tslint:disable-next-line no-object-literal-type-assertion
        variables: {
          firstName: mockState().nameAge.firstName,
          lastName: mockState().nameAge.lastName,
          age: mockState().nameAge.age,
          address: mockState().livingSituation.streetAddress,
          postalNumber: mockState().livingSituation.postalCode,
          city: 'Storstan',
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

  const wrapper = mount(
    <MockedProvider mocks={mockedRequests}>
      <Provider<{
        chatConversation: ChatState
        storage: { session: IsomorphicSessionStorage<Session> }
      }>
        initialState={{
          chatConversation: mockState(),
          storage: {
            session: createSession(
              new MockStorage({ [SESSION_KEY]: '{"token":"blargh"}' }),
            ),
          },
        }}
      >
        <CreateOfferComponent />
      </Provider>
    </MockedProvider>,
  )

  wrapper.find('button').simulate('click')

  await mockNetworkWait()
  await mockNetworkWait(2)
  wrapper.update()

  expect(wrapper.find('div').contains('success')).toBe(true)
})

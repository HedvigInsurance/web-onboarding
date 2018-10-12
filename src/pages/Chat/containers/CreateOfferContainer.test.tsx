import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils'
import { MockStorage } from 'utils/storage/MockStorage'
import { mockNetworkWait } from 'utils/test-utils'
import {
  createSession,
  IsomorphicSessionStorage,
  Session,
  SESSION_KEY,
} from '../../../utils/sessionStorage'
import {
  ApartmentType,
  ChatContainer,
  ChatStep,
  Insurer,
  State as ChatState,
} from '../state'
import {
  CREATE_OFFER_MUTATION,
  CreateOfferContainer,
  CreateOfferMutationVariables,
  getCreateOfferVariablesFromChatState,
} from './CreateOfferContainer'

jest.mock('client/apolloClient', () => ({
  apolloClient: {
    subscriptionClient: { close: jest.fn() },
  },
}))

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

it('creates an offer when HAS initial session', async () => {
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
        storage: { session: IsomorphicSessionStorage<Session> }
      }>
        initialState={{
          storage: {
            session: createSession(
              new MockStorage({
                [SESSION_KEY]: JSON.stringify({
                  chat: mockState(),
                  token: 'abc123',
                }),
              }),
            ),
          },
        }}
      >
        <ChatContainer>
          {(chatState) => (
            <CreateOfferContainer>
              {(mutate, { loading, data }) => {
                if (loading) {
                  return <div>loading</div>
                }
                if (data) {
                  return <div>{data}</div>
                }

                return (
                  <button
                    onClick={() =>
                      mutate(getCreateOfferVariablesFromChatState(chatState))
                    }
                  />
                )
              }}
            </CreateOfferContainer>
          )}
        </ChatContainer>
      </Provider>
    </MockedProvider>,
  )

  wrapper.find('button').simulate('click')
  expect(wrapper.find('div').contains('loading')).toBe(true)
  await mockNetworkWait()
  await mockNetworkWait(2)
  wrapper.update()
  expect(wrapper.find('div').contains('abc123')).toBe(true)
})

it('creates an offer when has NO initial session', async () => {
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
        storage: { session: IsomorphicSessionStorage<Session> }
      }>
        initialState={{
          storage: {
            session: createSession(
              new MockStorage({
                [SESSION_KEY]: JSON.stringify({
                  chat: mockState(),
                }),
              }),
            ),
          },
        }}
      >
        <ChatContainer>
          {(chatState) => (
            <CreateOfferContainer>
              {(mutate, { loading, data }) => {
                if (loading) {
                  return <div>loading</div>
                }
                if (data) {
                  return <div>{data}</div>
                }

                return (
                  <button
                    onClick={() =>
                      mutate(getCreateOfferVariablesFromChatState(chatState))
                    }
                  />
                )
              }}
            </CreateOfferContainer>
          )}
        </ChatContainer>
      </Provider>
    </MockedProvider>,
  )

  wrapper.find('button').simulate('click')
  expect(wrapper.find('div').contains('loading')).toBe(true)
  await mockNetworkWait()
  await mockNetworkWait(2)
  wrapper.update()
  expect(wrapper.find('div').contains('abc123')).toBe(true)
})

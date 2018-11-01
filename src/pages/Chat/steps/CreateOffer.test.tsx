import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { apolloClient } from 'client/apolloClient'
import { Provider } from 'constate'
import { CREATE_SESSION_TOKEN_MUTATION } from 'containers/SessionContainer'
import { mount } from 'enzyme'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { MockedProvider } from 'react-apollo/test-utils'
import {
  MockedResponse,
  MockLink,
  MockSubscriptionLink,
} from 'utils/react-apollo-test-links'
import { createSession, SESSION_KEY } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { StorageState } from 'utils/StorageContainer'
import { mockNetworkWait } from 'utils/test-utils'
import {
  ChatScreenContainer,
  LoadingState,
} from '../containers/ChatScreenContainer'
import { ChatContainer } from '../state'
import { createCreateOfferMutationMock, mockState } from '../utils/test-utils'
import { CreateOffer } from './CreateOffer'

jest.mock('client/apolloClient', () => ({
  apolloClient: {
    subscriptionClient: {
      close: jest.fn(),
    },
  },
}))

const renderCreateOffer = (mockedState: any) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: CREATE_SESSION_TOKEN_MUTATION,
        },
        result: {
          data: { createSession: 'blargh' },
        },
      },
    ]}
  >
    <Provider<{ storage: StorageState }>
      initialState={{
        storage: {
          session: createSession(
            new MockStorage({
              [SESSION_KEY]: JSON.stringify({
                chat: { ...mockedState },
                token: 'abc123',
              }),
            }),
          ),
        },
      }}
    >
      <CreateOffer />
    </Provider>
  </MockedProvider>
)

it('renders student toggler at appropriate times', () => {
  expect(
    mount(
      renderCreateOffer({
        ...mockState(),
        isStudent: undefined,
      }),
    ).find('input[type="checkbox"]').length,
  ).toBe(1)
  expect(
    mount(
      renderCreateOffer({
        ...mockState(),
        nameAge: { age: 42, firstName: 'blarghh', lastName: 'blarghson' },
        isStudent: undefined,
      }),
    ).find('input[type="checkbox"]').length,
  ).toBe(0)
  expect(
    mount(
      renderCreateOffer({
        ...mockState(),
        nameAge: { age: 42, firstName: 'blarghh', lastName: 'blarghson' },
        isStudent: true,
      }),
    )
      .find('input[type="checkbox"]')
      .prop('disabled'),
  ).toBe(true)
})

it('toggles student', () => {
  const wrapper = mount(
    <MockedProvider
      mocks={[
        {
          request: {
            query: CREATE_SESSION_TOKEN_MUTATION,
          },
          result: {
            data: { createSession: 'blargh' },
          },
        },
      ]}
    >
      <Provider<{ storage: StorageState }>
        initialState={{
          storage: {
            session: createSession(
              new MockStorage({
                [SESSION_KEY]: JSON.stringify({
                  chat: { ...mockState(), isStudent: undefined },
                  token: 'abc123',
                }),
              }),
            ),
          },
        }}
      >
        <CreateOffer />
        <ChatContainer>
          {(state) => <div id="is-student">{String(state.isStudent)}</div>}
        </ChatContainer>
      </Provider>
    </MockedProvider>,
  )

  expect(wrapper.find('#is-student').text()).toBe('undefined')
  wrapper
    .find('input[type="checkbox"]')
    .simulate('change', { target: { checked: true } })
  expect(wrapper.find('#is-student').text()).toBe('true')

  wrapper
    .find('input[type="checkbox"]')
    .simulate('change', { target: { checked: false } })
  expect(wrapper.find('#is-student').text()).toBe('false')
})

it('creates an offer without 💥', async () => {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: CREATE_SESSION_TOKEN_MUTATION,
      },
      result: {
        data: {
          createSession: 'abc123',
        },
      },
    },
    ...createCreateOfferMutationMock(),
  ]
  const subscriptionLink = new MockSubscriptionLink()
  const mockLink = new MockLink(mocks)
  const link = split(
    (op) => op.operationName === 'onOfferCreation',
    subscriptionLink,
    mockLink,
  )
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })

  const wrapper = mount(
    <ApolloProvider client={client}>
      <Provider<{ storage: StorageState }>
        initialState={{
          storage: {
            session: createSession(
              new MockStorage({
                [SESSION_KEY]: JSON.stringify({ chat: mockState() }),
              }),
            ),
          },
        }}
      >
        <CreateOffer />
        <ChatScreenContainer>
          {(state) => (
            <div id="loading-state">{state.offerCreationLoadingState}</div>
          )}
        </ChatScreenContainer>
      </Provider>
    </ApolloProvider>,
  )

  expect(
    wrapper
      .find('div')
      .at(0)
      .text(),
  ).toBe('') // session loading state = empty
  await mockNetworkWait()
  await mockNetworkWait(3)
  expect(apolloClient!.subscriptionClient.close).toHaveBeenCalledTimes(1)
  wrapper.update()
  expect(wrapper.find('#loading-state').text()).toBe(
    String(LoadingState.NOT_LOADING),
  )
  wrapper.find('button').simulate('click')
  expect(wrapper.find('button').prop('disabled')).toBe(true)

  await mockNetworkWait()
  wrapper.update()
  expect(wrapper.find('#loading-state').text()).toBe(
    String(LoadingState.LOADING),
  )

  subscriptionLink.simulateResult({
    result: {
      data: {
        offer: {
          __typename: 'OfferEvent',
          status: 'SUCCESS',
          insurance: {
            __typename: 'Insurance',
            status: 'PENDING',
          },
        },
      },
    },
  })
  await mockNetworkWait()
  wrapper.update()
  expect(wrapper.find('#loading-state').text()).toBe(
    String(LoadingState.COMPLETED),
  )
})

it('creates a student offer without 💥‍🎓 when has token', async () => {
  apolloClient!.subscriptionClient.close = jest.fn()
  const mocks: MockedResponse[] = [...createCreateOfferMutationMock(true)]
  const subscriptionLink = new MockSubscriptionLink()
  const mockLink = new MockLink(mocks)
  const link = split(
    (op) => op.operationName === 'onOfferCreation',
    subscriptionLink,
    mockLink,
  )
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })

  const wrapper = mount(
    <ApolloProvider client={client}>
      <Provider<{ storage: StorageState }>
        initialState={{
          storage: {
            session: createSession(
              new MockStorage({
                [SESSION_KEY]: JSON.stringify({
                  chat: { ...mockState(), isStudent: true },
                  token: 'abc123',
                }),
              }),
            ),
          },
        }}
      >
        <CreateOffer />
        <ChatScreenContainer>
          {(state) => (
            <div id="loading-state">{state.offerCreationLoadingState}</div>
          )}
        </ChatScreenContainer>
      </Provider>
    </ApolloProvider>,
  )

  await mockNetworkWait()
  expect(apolloClient!.subscriptionClient.close).not.toHaveBeenCalled()

  expect(wrapper.find('#loading-state').text()).toBe(
    String(LoadingState.NOT_LOADING),
  )
  wrapper.find('button').simulate('click')
  expect(wrapper.find('button').prop('disabled')).toBe(true)

  await mockNetworkWait()
  wrapper.update()
  expect(wrapper.find('#loading-state').text()).toBe(
    String(LoadingState.LOADING),
  )

  subscriptionLink.simulateResult({
    result: {
      data: {
        offer: {
          __typename: 'OfferEvent',
          status: 'SUCCESS',
          insurance: {
            __typename: 'Insurance',
            status: 'PENDING',
          },
        },
      },
    },
  })
  await mockNetworkWait()
  wrapper.update()
  expect(wrapper.find('#loading-state').text()).toBe(
    String(LoadingState.COMPLETED),
  )
})

jest.mock('../apolloClient', () => ({
  apolloClient: {
    subscriptionClient: {},
    client: {},
    httpLink: { options: { headers: {} } },
  },
}))
jest.useFakeTimers()

import { MockedResponse, MockLink } from '@apollo/react-testing'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { Provider } from 'constate'
import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { StaticRouter } from 'react-router'
import { ExchangeTokenDocument } from 'data/graphql'
import { nextTickAsync } from 'utils/misc'
import { MockStorage } from 'utils/storage/MockStorage'
import { StorageContext } from 'utils/StorageContainer'
import possibleTypes from '../../../possibleGraphqlTypes.json'
import { createSession, Session } from '../../shared/sessionStorage'
import { ExchangeTokenRetrieval } from './ExchangeTokenRetrieval'

it("moves to taking too long when location doesn't have exchange-token", async () => {
  const wrapper = mountWithApolloClient([], '')

  expect(wrapper.text()).toBe('Loading')

  await act(nextTickAsync)
  act(() => {
    jest.runTimersToTime(3001)
  })
  await act(nextTickAsync)
  wrapper.update()
  expect(wrapper.text()).toBe('Loading')
  act(() => {
    jest.runTimersToTime(15001)
  })
  wrapper.update()
  expect(wrapper.text()).toBe('TakingTooLong')
})

it('exchanges valid token', async () => {
  const wrapper = mountWithApolloClient(
    [
      {
        request: {
          query: ExchangeTokenDocument,
          variables: { exchangeToken: 'the-token' },
        },
        result: {
          data: {
            exchangeToken: {
              __typename: 'ExchangeTokenSuccessResponse',
              token: 'something',
            },
          },
        },
      },
    ],
    'the-token',
  )

  expect(wrapper.text()).toBe('Loading')
  await act(nextTickAsync)
  wrapper.update()
  expect(wrapper.text()).toBe('Loading') // still fake loading

  act(() => {
    jest.runTimersToTime(3001)
  })
  await act(nextTickAsync)
  wrapper.update()
  expect(wrapper.text()).toBe('Success')
})

it('shows invalid token on invalid token', async () => {
  const wrapper = mountWithApolloClient(
    [
      {
        request: {
          query: ExchangeTokenDocument,
          variables: { exchangeToken: 'invalid-token' },
        },
        result: {
          data: {
            exchangeToken: {
              __typename: 'ExchangeTokenInvalidResponse',
              _: true,
            },
          },
        },
      },
    ],
    'invalid-token',
  )

  expect(wrapper.text()).toBe('Loading')
  await act(nextTickAsync)
  act(() => {
    jest.runTimersToTime(3001)
  })
  await act(nextTickAsync)
  wrapper.update()
  expect(wrapper.text()).toBe('InvalidToken')
})

it('shows expired token on expired token', async () => {
  const wrapper = mountWithApolloClient(
    [
      {
        request: {
          query: ExchangeTokenDocument,
          variables: { exchangeToken: 'expired-token' },
        },
        result: {
          data: {
            exchangeToken: {
              __typename: 'ExchangeTokenExpiredResponse',
              _: true,
            },
          },
        },
      },
    ],
    'expired-token',
  )

  expect(wrapper.text()).toBe('Loading')
  await act(nextTickAsync)
  act(() => {
    jest.runTimersToTime(3001)
  })
  await act(nextTickAsync)
  wrapper.update()
  expect(wrapper.text()).toBe('ExpiredToken')
})

const mountWithApolloClient = (mocks: MockedResponse[], token: string) => {
  const session = createSession<Session>(new MockStorage({}))

  const link = new MockLink(mocks, true)
  const client = new ApolloClient({
    name: 'Web:Onboarding',
    link,
    cache: new InMemoryCache({
      possibleTypes,
    }),
  })
  const subscriptionClient = { close: jest.fn() } as any
  const httpLink = { options: { headers: {} } } as HttpLink

  return mount(
    <StorageContext.Provider value={{ session }}>
      <Provider initialState={{ storage: { session } }}>
        <StaticRouter
          location={`http://localhost8080/se/new-member/connect-payment/direct#exchange-token=${token}`}
          context={{}}
        >
          <ExchangeTokenRetrieval
            apolloClient={{ client, subscriptionClient, httpLink }}
          >
            {({ exchangeTokenState }) => <>{exchangeTokenState.toString()}</>}
          </ExchangeTokenRetrieval>
        </StaticRouter>
      </Provider>
    </StorageContext.Provider>,
  )
}

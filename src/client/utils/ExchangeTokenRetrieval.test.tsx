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
import React from 'react'
import { StaticRouter } from 'react-router'
import { render, act, waitFor } from '@testing-library/react'
import { ExchangeTokenDocument } from 'data/graphql'
import { MockStorage } from 'utils/storage/MockStorage'
import { StorageContext } from 'utils/StorageContainer'
import possibleTypes from '../../../possibleGraphqlTypes.json'
import { createSession, Session } from '../../shared/sessionStorage'
import { ExchangeTokenRetrieval } from './ExchangeTokenRetrieval'

it("moves to taking too long when location doesn't have exchange-token", async () => {
  const { baseElement } = renderWithApolloClient({
    mocks: [],
    token: '',
  })

  expect(baseElement.textContent).toBe('Loading')

  act(() => {
    jest.runTimersToTime(3001)
  })
  expect(baseElement.textContent).toBe('Loading')

  act(() => {
    jest.runTimersToTime(15001)
  })
  expect(baseElement.textContent).toBe('TakingTooLong')
})

it('exchanges valid token', async () => {
  const exchangeToken = 'the-token'

  const { baseElement } = renderWithApolloClient({
    mocks: [
      {
        request: {
          query: ExchangeTokenDocument,
          variables: { exchangeToken },
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
    token: exchangeToken,
  })

  expect(baseElement.textContent).toBe('Loading')
  act(() => {
    jest.runTimersToTime(3001)
  })
  await waitFor(() => baseElement.textContent !== 'Loading')
  expect(baseElement.textContent).toBe('Success')
})

it('shows invalid token on invalid token', async () => {
  const exchangeToken = 'invalid-token'
  const { baseElement } = renderWithApolloClient({
    mocks: [
      {
        request: {
          query: ExchangeTokenDocument,
          variables: { exchangeToken },
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
    token: exchangeToken,
  })

  expect(baseElement.textContent).toBe('Loading')
  act(() => {
    jest.runTimersToTime(3001)
  })
  await waitFor(() => baseElement.textContent !== 'Loading')
  expect(baseElement.textContent).toBe('InvalidToken')
})

it('shows expired token on expired token', async () => {
  const exchangeToken = 'expired-token'
  const { baseElement } = renderWithApolloClient({
    mocks: [
      {
        request: {
          query: ExchangeTokenDocument,
          variables: { exchangeToken },
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
    token: exchangeToken,
  })

  expect(baseElement.textContent).toBe('Loading')
  act(() => {
    jest.runTimersToTime(3001)
  })
  await waitFor(() => baseElement.textContent !== 'Loading')
  expect(baseElement.textContent).toBe('ExpiredToken')
})

const renderWithApolloClient = ({
  mocks,
  token,
}: {
  mocks: MockedResponse[]
  token: string
}) => {
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

  return render(
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

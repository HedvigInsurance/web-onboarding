import { MockedProvider, MockedResponse } from '@apollo/react-testing'

jest.mock('../apolloClient', () => ({
  apolloClient: {
    client: {
      mutate: jest.fn(),
    },
    subscriptionClient: {
      close: jest.fn(),
    },
    httpLink: {
      options: {
        headers: {},
      },
    },
  },
}))

import { Provider } from 'constate'
import React from 'react'

import { Locale, UpdatePickedLocaleDocument } from 'data/graphql'
import {
  createSession,
  IsomorphicSessionStorage,
  Session,
  SESSION_KEY,
} from 'shared/sessionStorage'
import { renderComponent, waitFor } from 'test/utils'
import { apolloClient } from '../apolloClient'
import { MockStorage } from '../utils/storage/MockStorage'
import {
  CREATE_SESSION_TOKEN_MUTATION,
  SessionContainer,
} from './SessionContainer'

it('picks up any stored session token in session without actually creating a new session', () => {
  const token = 'abc123'
  const { baseElement } = renderComponent(
    <MockedProvider>
      <Provider<{
        storage: { session: IsomorphicSessionStorage<Session> }
      }>
        initialState={{
          storage: {
            session: createSession(
              new MockStorage({
                [SESSION_KEY]: JSON.stringify({ token }),
              }),
            ),
          },
        }}
      >
        <SessionContainer>
          {(sessionToken) => <div>{sessionToken}</div>}
        </SessionContainer>
      </Provider>
    </MockedProvider>,
    { wrapperProps: { location: '/se/new-member' } },
  )

  expect(baseElement.textContent).toContain(token)
})

it('creates a new session', async () => {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: CREATE_SESSION_TOKEN_MUTATION,
      },
      result: {
        data: {
          createSessionV2: {
            token: 'abc123',
            memberId: '1',
            __typename: 'SessionInformation',
          },
        },
      },
    },
    {
      request: {
        query: UpdatePickedLocaleDocument,
        variables: { pickedLocale: Locale.SvSe },
      },
      result: {
        data: {
          updatePickedLocale: {
            id: 'abc123',
            __typename: 'Member',
          },
        },
      },
    },
  ]
  const { baseElement } = renderComponent(
    <MockedProvider mocks={mocks}>
      <Provider<{
        storage: { session: IsomorphicSessionStorage<Session> }
      }>
        initialState={{
          storage: {
            session: createSession(
              new MockStorage({
                [SESSION_KEY]: JSON.stringify({}),
              }),
            ),
          },
        }}
      >
        <SessionContainer>
          {(sessionToken) => <div>{sessionToken}</div>}
        </SessionContainer>
      </Provider>
    </MockedProvider>,
    { wrapperProps: { location: '/se/new-member' } },
  )

  expect(baseElement.textContent).not.toContain('abc123')
  await waitFor(() => expect(baseElement.textContent).toContain('abc123'))
  expect(apolloClient!.subscriptionClient.close).toHaveBeenCalledWith(
    true,
    true,
  )
  expect(apolloClient!.httpLink.options.headers.authorization).toBe('abc123')
})

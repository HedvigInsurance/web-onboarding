import { MockedProvider, MockedResponse } from '@apollo/react-testing'

jest.mock('../client/apolloClient', () => ({
  apolloClient: {
    client: {
      mutate: jest.fn(),
    },
    subscriptionClient: {
      close: jest.fn(),
    },
  },
}))

import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'

import { Locale } from 'data/graphql'
import { act } from 'react-dom/test-utils'
import { StaticRouter } from 'react-router-dom'
import { apolloClient } from '../client/apolloClient'
import {
  createSession,
  IsomorphicSessionStorage,
  Session,
  SESSION_KEY,
} from '../utils/sessionStorage'
import { MockStorage } from '../utils/storage/MockStorage'
import { mockNetworkWait } from '../utils/test-utils'
import {
  CREATE_SESSION_TOKEN_MUTATION,
  SessionContainer,
  UPDATE_PICKED_LOCALE_MUTATION,
} from './SessionContainer'

it('picks up any stored session token in session without actually creating a new session', () => {
  const wrapper = mount(
    <StaticRouter location="/se/new-member" context={{}}>
      <MockedProvider>
        <Provider<{
          storage: { session: IsomorphicSessionStorage<Session> }
        }>
          initialState={{
            storage: {
              session: createSession(
                new MockStorage({
                  [SESSION_KEY]: JSON.stringify({ token: 'abc123' }),
                }),
              ),
            },
          }}
        >
          <SessionContainer>
            {(sessionToken) => <div>{sessionToken}</div>}
          </SessionContainer>
        </Provider>
      </MockedProvider>
    </StaticRouter>,
  )

  expect(wrapper.find('div').contains('abc123')).toBe(true)
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
        query: UPDATE_PICKED_LOCALE_MUTATION,
        variables: { pickedLocale: Locale.SvSe },
      },
      result: {
        data: {
          updatePickedLocale: {
            memberId: 'abc123',
          },
        },
      },
    },
  ]
  const wrapper = mount(
    <StaticRouter location="/se/new-member" context={{}}>
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
      </MockedProvider>
    </StaticRouter>,
  )

  expect(wrapper.find('div').contains('abc123')).toBe(false)
  await act(() => mockNetworkWait())
  await act(() => mockNetworkWait(2))
  wrapper.update()
  expect(wrapper.find('div').contains('abc123')).toBe(true)
  expect(apolloClient!.subscriptionClient.close).toHaveBeenCalledWith(
    true,
    true,
  )
})

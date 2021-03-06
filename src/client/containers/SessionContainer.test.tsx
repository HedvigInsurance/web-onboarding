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
import { mount } from 'enzyme'
import React from 'react'

import { act } from 'react-dom/test-utils'
import { StaticRouter } from 'react-router-dom'
import { Locale, UpdatePickedLocaleDocument } from 'data/graphql'
import {
  createSession,
  IsomorphicSessionStorage,
  Session,
  SESSION_KEY,
} from 'shared/sessionStorage'
import { apolloClient } from '../apolloClient'
import { sleep } from '../utils/misc'
import { MockStorage } from '../utils/storage/MockStorage'
import {
  CREATE_SESSION_TOKEN_MUTATION,
  SessionContainer,
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
  await act(() => sleep())
  await act(() => sleep(2))
  wrapper.update()
  expect(wrapper.find('div').contains('abc123')).toBe(true)
  expect(apolloClient!.subscriptionClient.close).toHaveBeenCalledWith(
    true,
    true,
  )
  expect(apolloClient!.httpLink.options.headers.authorization).toBe('abc123')
})

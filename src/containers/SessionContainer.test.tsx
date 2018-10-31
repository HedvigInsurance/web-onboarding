import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils'
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
} from './SessionContainer'

jest.mock('../client/apolloClient', () => ({
  apolloClient: {
    subscriptionClient: {
      close: jest.fn(),
    },
  },
}))
it('picks up any stored session token in session without actually creating a new session', () => {
  const wrapper = mount(
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
    </MockedProvider>,
  )

  expect(wrapper.find('div').contains('abc123')).toBe(true)
})

it('creates a new session', async () => {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: CREATE_SESSION_TOKEN_MUTATION,
        variables: { campaign: undefined },
      },
      result: {
        data: { createSession: 'abc123' },
      },
    },
  ]
  const wrapper = mount(
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
  )

  expect(wrapper.find('div').contains('abc123')).toBe(false)
  await mockNetworkWait()
  await mockNetworkWait(2)
  wrapper.update()
  expect(wrapper.find('div').contains('abc123')).toBe(true)
  expect(apolloClient!.subscriptionClient.close).toHaveBeenCalledWith(
    true,
    true,
  )
})

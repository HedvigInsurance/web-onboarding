import { MockedProvider } from '@apollo/react-testing'
import { Provider } from 'constate'
import { mount } from 'enzyme'
import React from 'react'
import { Redirect, StaticRouter } from 'react-router'
import { createSession, SESSION_KEY } from 'shared/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { SessionTokenGuard } from './SessionTokenGuard'

jest.mock('../apolloClient', () => ({
  apolloClient: {
    subscriptionClient: { close: jest.fn() },
  },
}))

it('redirects when there is no session', () => {
  const wrapper = mount(
    <StaticRouter location={'/se/new-member/blah'} context={{}}>
      <MockedProvider>
        <Provider
          initialState={{
            storage: { session: createSession(new MockStorage()) },
          }}
        >
          <SessionTokenGuard>
            <div />
          </SessionTokenGuard>
        </Provider>
      </MockedProvider>
    </StaticRouter>,
  )

  expect(wrapper.find(Redirect).prop('to')).toBe('/se/new-member')
})

it('does not redirect when there is a session token', () => {
  const wrapper = mount(
    <StaticRouter context={{}}>
      <MockedProvider>
        <Provider
          initialState={{
            storage: {
              session: createSession(
                new MockStorage({
                  [SESSION_KEY]: JSON.stringify({ token: 'blargh' }),
                }),
              ),
            },
          }}
        >
          <SessionTokenGuard>
            <div />
          </SessionTokenGuard>
        </Provider>
      </MockedProvider>
    </StaticRouter>,
  )

  expect(wrapper.find(Redirect)).toHaveLength(0)
})

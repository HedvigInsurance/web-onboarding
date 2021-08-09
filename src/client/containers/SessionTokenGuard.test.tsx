import { MockedProvider } from '@apollo/react-testing'
import { Provider } from 'constate'
import React from 'react'
import { createSession, SESSION_KEY } from 'shared/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { renderComponent } from 'test/utils'
import { SessionTokenGuard } from './SessionTokenGuard'

jest.mock('../apolloClient', () => ({
  apolloClient: {
    subscriptionClient: { close: jest.fn() },
  },
}))

jest.mock('react-router-dom', () => {
  return {
    Redirect: jest.fn(({ to }) => `Redirected to ${to}`),
  }
})

it('redirects when there is no session', () => {
  const { getByText } = renderComponent(
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
    </MockedProvider>,
    { wrapperProps: { location: { pathname: '/se/new-member/blah' } } },
  )

  expect(getByText('Redirected to /se/new-member')).toBeInTheDocument()
})

it('does not redirect when there is a session token', () => {
  const { queryByText } = renderComponent(
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
    </MockedProvider>,
  )

  expect(queryByText(/redirected to .*/i)).toBeNull()
})

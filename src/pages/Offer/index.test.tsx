import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils'
import { Redirect, StaticRouter } from 'react-router-dom'
import { createSession, SESSION_KEY } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { mockNetworkWait } from 'utils/test-utils'
import { Offering } from '.'
import { Offer } from './sections/Offer'

jest.mock('client/apolloClient', () => ({
  apolloClient: {
    subscriptionClient: { close: jest.fn() },
  },
}))

it('Redirects when there is no session', () => {
  const wrapper = mount(
    <StaticRouter context={{}}>
      <MockedProvider>
        <Provider
          initialState={{
            storage: { session: createSession(new MockStorage()) },
          }}
        >
          <Offering />
        </Provider>
      </MockedProvider>
    </StaticRouter>,
  )

  expect(wrapper.find(Redirect).prop('to')).toBe('/hedvig')
})

it('Queries when it has a session', async () => {
  const mocks: MockedResponse[] = [
    {
      request: {
        query,
      },
    },
  ]
  const wrapper = mount(
    <StaticRouter context={{}}>
      <MockedProvider>
        <Provider
          initialState={{
            storage: {
              session: createSession(
                new MockStorage({
                  [SESSION_KEY]: JSON.stringify({ token: 'test-token' }),
                }),
              ),
            },
          }}
        >
          <Offering />
        </Provider>
      </MockedProvider>
    </StaticRouter>,
  )

  await mockNetworkWait()
  wrapper.update()
  console.log(wrapper.debug())
  expect(wrapper.find(Redirect)).toHaveLength(0)
  expect(wrapper.find(Offer)).toHaveLength(0)
})

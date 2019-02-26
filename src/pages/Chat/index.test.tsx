import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router'
import { Chat } from '.'
import { createSession } from '../../utils/sessionStorage'
import { MockStorage } from '../../utils/storage/MockStorage'
import { TrafficSourceProvider } from '../../utils/storage/trafficSource'

jest.mock('client/apolloClient', () => ({ apolloClient: {} }))

it('renders without 💥', () => {
  mount(
    <StaticRouter location="/new-member/hedvig" context={{}}>
      <HelmetProvider>
        <Provider
          initialState={{
            storage: { session: createSession(new MockStorage()) },
          }}
        >
          <TrafficSourceProvider
            value={{ trafficSourceStorage: new MockStorage() }}
          >
            <Chat />
          </TrafficSourceProvider>
        </Provider>
      </HelmetProvider>
    </StaticRouter>,
  )
})

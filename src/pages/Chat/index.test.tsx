import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Chat } from '.'
import { createSession } from '../../utils/sessionStorage'
import { MockStorage } from '../../utils/storage/MockStorage'

it('renders without 💥', () => {
  mount(
    <HelmetProvider>
      <Provider
        initialState={{
          storage: { session: createSession(new MockStorage()) },
        }}
      >
        <Chat />
      </Provider>
    </HelmetProvider>,
  )
})

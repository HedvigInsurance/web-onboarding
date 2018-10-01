import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { Chat } from '.'
import { createSession } from '../../utils/cookieStorage'
import { NoopStorage } from '../../utils/storage/NoopStorage'

it('renders without 💥', () => {
  mount(
    <Provider
      initialState={{ storage: { session: createSession(new NoopStorage()) } }}
    >
      <Chat />
    </Provider>,
  )
})

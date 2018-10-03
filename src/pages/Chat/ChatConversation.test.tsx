import { Message } from 'components/hedvig/conversation'
import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { WithStorageProps } from '../../App'
import { createSession } from '../../utils/sessionStorage'
import { MockStorage } from '../../utils/storage/MockStorage'
import { ChatConversation } from './ChatConversation'

jest.useFakeTimers()
it('shows first messages on initial render', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <ChatConversation />
    </Provider>,
  )

  jest.runAllTimers()
  wrapper.update()

  expect(wrapper.find(Message)).toHaveLength(3)
})

it('shows all messages when initial session is set', () => {
  const initialSession = JSON.stringify({
    chat: {
      nameAge: {
        firstName: 'blargh',
        lastName: 'blarghson',
        age: 12,
      },
      currentStep: 'greet-2',
      visibleSteps: [
        'initial',
        'initial-2',
        'name-age-input',
        'greet-1',
        'greet-2',
      ],
      initialVisibleSteps: [
        'initial',
        'initial-2',
        'name-age-input',
        'greet-1',
        'greet-2',
      ],
    },
  })
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{
        storage: {
          session: createSession(new MockStorage(initialSession)),
        },
      }}
    >
      <ChatConversation />
    </Provider>,
  )

  expect(wrapper.find(Message)).toHaveLength(5)
})

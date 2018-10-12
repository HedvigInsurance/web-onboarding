import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
import { createSession } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { WithStorageProps } from 'utils/StorageContainer'
import { ChatContainer } from '../state'
import { NameInput } from './NameInput'

it('handles form changes', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_NAME_TEXT: '{firstName} {lastName} {age}',
        }}
      >
        <NameInput
          onSubmit={() => {
            /* noop */
          }}
        />
      </MockTextKeyProvider>
    </Provider>,
  )
  wrapper
    .find('input#firstName')
    .simulate('change', { target: { value: 'hello0', id: 'firstName' } })
  expect(wrapper.find('input#firstName').prop('value')).toBe('hello0')
  wrapper
    .find('input#lastName')
    .simulate('change', { target: { value: 'hello1', id: 'lastName' } })
  expect(wrapper.find('input#lastName').prop('value')).toBe('hello1')
})

it("doesn't submit empty forms", () => {
  const handleSubmit = jest.fn()
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_NAME_TEXT: '{firstName} {lastName} {age}',
        }}
      >
        <NameInput onSubmit={handleSubmit} />
      </MockTextKeyProvider>
    </Provider>,
  )

  const preventDefault = jest.fn()
  wrapper.find('form').simulate('submit', { preventDefault })

  expect(preventDefault).toHaveBeenCalledTimes(1)
  expect(handleSubmit).not.toHaveBeenCalled()
})

it('submits form and updates state', (done) => {
  const StateShower = () => (
    <ChatContainer>
      {({ nameAge }) =>
        nameAge ? (
          <div className="test-state-shower">
            <div className="firstName">{nameAge.firstName}</div>
            <div className="lastName">{nameAge.lastName}</div>
          </div>
        ) : null
      }
    </ChatContainer>
  )
  const handleSubmit = jest.fn()
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_NAME_TEXT: '{firstName} {lastName} {age}',
        }}
      >
        <NameInput onSubmit={handleSubmit} />
        <StateShower />
      </MockTextKeyProvider>
    </Provider>,
  )

  wrapper.find('input#firstName').simulate('change', {
    target: { value: 'John', id: 'firstName' },
  })
  wrapper.find('input#lastName').simulate('change', {
    target: { value: 'Doe', id: 'lastName' },
  })

  const preventDefault = jest.fn()
  wrapper.find('form').simulate('submit', { preventDefault })

  expect(preventDefault).toHaveBeenCalled()
  process.nextTick(() => {
    try {
      wrapper.update()
      expect(handleSubmit).toHaveBeenCalled()
      expect(wrapper.find('div.firstName').contains('John')).toBe(true)
      expect(wrapper.find('div.lastName').contains('Doe')).toBe(true)
      done()
    } catch (e) {
      done.fail(e)
    }
  })
})

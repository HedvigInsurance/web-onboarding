import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
import { createSession } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { WithStorageProps } from 'utils/StorageContainer'
import { ChatContainer } from '../state'
import { AgeInput } from './AgeInput'

it('swallows chars in age input', () => {
  const handleSubmit = jest.fn()
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_AGE_TEXT: '{age}',
        }}
      >
        <AgeInput onSubmit={handleSubmit} />
      </MockTextKeyProvider>
    </Provider>,
  )
  wrapper
    .find('input#age')
    .simulate('change', { target: { value: 'characters', id: 'age' } })
  expect(wrapper.find('input#age').prop('value')).toBe('')
  wrapper
    .find('input#age')
    .simulate('change', { target: { value: '12', id: 'age' } })
  expect(wrapper.find('input#age').prop('value')).toBe('12')
})

it('handles form changes', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_AGE_TEXT: '{age}',
        }}
      >
        <AgeInput
          onSubmit={() => {
            /* noop */
          }}
        />
      </MockTextKeyProvider>
    </Provider>,
  )
  wrapper
    .find('input#age')
    .simulate('change', { target: { value: '12', id: 'age' } })
  expect(wrapper.find('input#age').prop('value')).toBe('12')
})

it("doesn't submit empty forms", () => {
  const handleSubmit = jest.fn()
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_AGE_TEXT: '{age}',
        }}
      >
        <AgeInput onSubmit={handleSubmit} />
      </MockTextKeyProvider>
    </Provider>,
  )

  wrapper
    .find('input#age')
    .simulate('change', { target: { value: 1, id: 'age' } })

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
            <div className="age">{nameAge.age}</div>
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
          CHAT_INPUT_AGE_TEXT: '{age}',
        }}
      >
        <AgeInput onSubmit={handleSubmit} />
        <StateShower />
      </MockTextKeyProvider>
    </Provider>,
  )

  wrapper.find('input#age').simulate('change', {
    target: { value: 12, id: 'age' },
  })

  const preventDefault = jest.fn()
  wrapper.find('form').simulate('submit', { preventDefault })

  expect(preventDefault).toHaveBeenCalled()
  process.nextTick(() => {
    try {
      wrapper.update()
      expect(handleSubmit).toHaveBeenCalled()
      expect(wrapper.find('div.age').contains(12 as any)).toBe(true)
      done()
    } catch (e) {
      done.fail(e)
    }
  })
})

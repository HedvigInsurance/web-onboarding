import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { ChatContainer } from '../state'
import { NameAgeInput } from './NameAgeInput'

it('handles form changes', () => {
  const wrapper = mount(
    <NameAgeInput
      onSubmit={() => {
        /* noop */
      }}
    />,
  )
  wrapper
    .find('input#firstName')
    .simulate('change', { target: { value: 'hello0', id: 'firstName' } })
  expect(wrapper.find('input#firstName').prop('value')).toBe('hello0')
  wrapper
    .find('input#lastName')
    .simulate('change', { target: { value: 'hello1', id: 'lastName' } })
  expect(wrapper.find('input#lastName').prop('value')).toBe('hello1')
  wrapper
    .find('input#age')
    .simulate('change', { target: { value: 12, id: 'age' } })
  expect(wrapper.find('input#age').prop('value')).toBe(12)
})

it("doesn't submit empty forms", () => {
  const handleSubmit = jest.fn()
  const wrapper = mount(<NameAgeInput onSubmit={handleSubmit} />)

  wrapper
    .find('input#age')
    .simulate('change', { target: { value: 1, id: 'age' } })

  const preventDefault = jest.fn()
  wrapper.find('form').simulate('submit', { preventDefault })

  expect(preventDefault).toHaveBeenCalledTimes(1)
  expect(handleSubmit).not.toHaveBeenCalled()
})

it('submits form and updates state', () => {
  const StateShower = () => (
    <ChatContainer>
      {({ step1 }) =>
        step1 ? (
          <div className="test-state-shower">
            {step1.firstName} {step1.lastName} {step1.age}
          </div>
        ) : null
      }
    </ChatContainer>
  )
  const handleSubmit = jest.fn()
  const wrapper = mount(
    <Provider initialState={{}}>
      <NameAgeInput onSubmit={handleSubmit} />
      <StateShower />
    </Provider>,
  )

  wrapper.find('input#firstName').simulate('change', {
    target: { value: 'John', id: 'firstName' },
  })
  wrapper.find('input#lastName').simulate('change', {
    target: { value: 'Doe', id: 'lastName' },
  })
  wrapper.find('input#age').simulate('change', {
    target: { value: 12, id: 'age' },
  })

  const preventDefault = jest.fn()
  wrapper.find('form').simulate('submit', { preventDefault })

  expect(preventDefault).toHaveBeenCalled()
  expect(handleSubmit).toHaveBeenCalled()
  expect(wrapper.find('.test-state-shower').contains('John Doe 42')).toBe(true)
})

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
  ;[0, 1].forEach((index) => {
    wrapper
      .find('input')
      .at(index)
      .simulate('change', { target: { value: 'hello' + index } })
    expect(
      wrapper
        .find('input')
        .at(index)
        .prop('value'),
    ).toBe('hello' + index)
  })
  wrapper
    .find('input')
    .at(2)
    .simulate('change', { target: { value: '12' } })
  expect(
    wrapper
      .find('input')
      .at(2)
      .prop('value'),
  ).toBe('12')
  wrapper
    .find('input')
    .at(2)
    .simulate('change', { target: { value: '111111' } })
  expect(
    wrapper
      .find('input')
      .at(2)
      .prop('value'),
  ).toBe('12')
})

it("doesn't submit empty forms", () => {
  const handleSubmit = jest.fn()
  const wrapper = mount(<NameAgeInput onSubmit={handleSubmit} />)

  wrapper
    .find('input')
    .at(2)
    .simulate('change', { target: { value: '1' } })

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

  wrapper
    .find('input')
    .at(0)
    .simulate('change', { target: { value: 'John' } })
  wrapper
    .find('input')
    .at(1)
    .simulate('change', { target: { value: 'Doe' } })
  wrapper
    .find('input')
    .at(2)
    .simulate('change', { target: { value: '42' } })

  const preventDefault = jest.fn()
  wrapper.find('form').simulate('submit', { preventDefault })

  expect(preventDefault).toHaveBeenCalled()
  expect(handleSubmit).toHaveBeenCalled()
  expect(wrapper.find('.test-state-shower').contains('John Doe 42'))
})

import { mount } from 'enzyme'
import * as React from 'react'
import { TimedMount } from './TimedMount'

jest.useFakeTimers()
it('mounts after fire', () => {
  const wrapper = mount(
    <TimedMount duration={100}>
      {({ hasFired }) => (hasFired ? <div>true</div> : <div>false</div>)}
    </TimedMount>,
  )

  expect(wrapper.find('div').contains('false')).toBe(true)
  jest.runAllTimers()
  wrapper.update()
  expect(wrapper.find('div').contains('true')).toBe(true)
})

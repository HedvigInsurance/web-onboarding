import { mount } from 'enzyme'
import * as React from 'react'
import { TimedMount } from './TimedMount'

jest.useFakeTimers()
it('mounts after fire', () => {
  const onFire = jest.fn()
  const wrapper = mount(
    <TimedMount duration={100} onFire={onFire}>
      {({ hasFired }) => (hasFired ? <div>true</div> : <div>false</div>)}
    </TimedMount>,
  )

  expect(wrapper.find('div').contains('false')).toBe(true)
  expect(onFire).not.toHaveBeenCalled()
  jest.runAllTimers()
  wrapper.update()
  expect(wrapper.find('div').contains('true')).toBe(true)
  expect(onFire).toHaveBeenCalled()
})

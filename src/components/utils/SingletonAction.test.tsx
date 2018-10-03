import { mount } from 'enzyme'
import * as React from 'react'
import { SingletonAction } from './SingletonAction'

it('only performs an action once', (done) => {
  const fn = jest.fn()

  const wrapper = mount(
    <SingletonAction>
      {({ isActionDone, doAction }) => {
        if (!isActionDone) {
          doAction()
          fn()
        }
        return null
      }}
    </SingletonAction>,
  )
  // async magic
  setTimeout(() => {
    wrapper.setProps({}) // fonce an update
    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(1)
      done()
    })
  })
})

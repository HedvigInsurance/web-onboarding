import { mount } from 'enzyme'
import * as React from 'react'
import { Mount, Unmount } from 'react-lifecycle-components'
import { PubSubHub } from './PubSubHub'

it('subscribes to and fires events', () => {
  const myFunction = jest.fn()

  const wrapper = mount(
    <PubSubHub>
      {({ addListener, removeListener, fire }) => (
        <>
          <Mount on={() => addListener('foo', myFunction)}>
            <Unmount on={() => removeListener('foo', myFunction)}>
              <button onClick={() => fire('foo', undefined)} />
            </Unmount>
          </Mount>
        </>
      )}
    </PubSubHub>,
  )

  expect(myFunction).not.toHaveBeenCalled()

  wrapper.find('button').simulate('click')
  expect(myFunction).toHaveBeenCalledTimes(1)
  wrapper.unmount()
})

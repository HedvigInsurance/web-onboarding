import { mount } from 'enzyme'
import React from 'react'
import { notNullable } from './nullables'
import { createSession } from './sessionStorage'
import { MockStorage } from './storage/MockStorage'
import { StorageContainer } from './StorageContainer'

it('stores a token in the session', () => {
  const wrapper = mount(
    <StorageContainer
      initialState={{ session: createSession(new MockStorage()) }}
    >
      {(state) => (
        <>
          <div>{notNullable(state.session.getSession()).token || null}</div>
          <button onClick={() => state.setToken('blargh')} />
        </>
      )}
    </StorageContainer>,
  )

  expect(wrapper.find('div').prop('children')).toBe(null)

  wrapper.find('button').simulate('click')

  expect(wrapper.find('div').prop('children')).toBe('blargh')
})

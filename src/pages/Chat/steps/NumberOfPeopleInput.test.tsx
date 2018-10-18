import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
import { createSession } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { WithStorageProps } from 'utils/StorageContainer'
import { NumberOfPeopleInput } from './NumberOfPeopleInput'

it('handles form changes', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_NUMBER_OF_PEOPLE_TEXT: '{numberOfPeople}',
        }}
      >
        <NumberOfPeopleInput isCurrentMessage />
      </MockTextKeyProvider>
    </Provider>,
  )

  expect(wrapper.find('button').prop('disabled')).toBe(true)

  wrapper
    .find('select#numberOfPeople')
    .simulate('change', { target: { value: 3 } })
  expect(wrapper.find('select#numberOfPeople').prop('value')).toBe(3)

  expect(wrapper.find('button').prop('disabled')).toBe(false)
})

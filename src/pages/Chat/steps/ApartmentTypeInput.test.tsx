import { InputValidationError } from 'components/userInput/UserResponse'
import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
import { createSession } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { WithStorageProps } from 'utils/StorageContainer'
import { ApartmentType } from '../state'
import { ApartmentTypeInput } from './ApartmentTypeInput'

it('handles form changes', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_APARTMENT_TYPE_TEXT: '{apartmentType} {size}',
        }}
      >
        <ApartmentTypeInput isCurrentMessage />
      </MockTextKeyProvider>
    </Provider>,
  )

  expect(wrapper.find('button')).toHaveLength(0)

  wrapper
    .find('select#apartmentType')
    .simulate('change', { target: { value: ApartmentType.RENT } })
  expect(wrapper.find('select#apartmentType').prop('value')).toBe(
    ApartmentType.RENT,
  )
  wrapper.find('input#size').simulate('change', { target: { value: 42 } })
  expect(wrapper.find('input#size').prop('value')).toBe(42)

  expect(wrapper.find('button')).toHaveLength(1)
})

it('handles too big apartment', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_APARTMENT_TYPE_TEXT: '{apartmentType} {size}',
        }}
      >
        <ApartmentTypeInput />
      </MockTextKeyProvider>
    </Provider>,
  )

  expect(wrapper.find(InputValidationError)).toHaveLength(0)
  wrapper.find('input#size').simulate('change', { target: { value: 1337 } })
  expect(wrapper.find('input#size').prop('value')).toBe(1337)
  expect(wrapper.find(InputValidationError)).toHaveLength(1)
})

import { WithStorageProps } from 'App'
import { InputValidationError } from 'components/userInput/UserResponse'
import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { createSession } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { MockTextKeyProvider } from '../../../utils/MockTextKeyProvider'
import { ApartmentType } from '../state'
import { LivingSituationInput } from './LivingSituationInput'

it('handles form changes', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_LIVING_SITUATION_TEXT:
            '{streetAddress} {postalCode} {apartmentType} {size} {sizeValidationErrorMaybe} {numberOfPeople}',
        }}
      >
        <LivingSituationInput />
      </MockTextKeyProvider>
    </Provider>,
  )
  wrapper
    .find('input#streetAddress')
    .simulate('change', { target: { value: 'Storgatan 1' } })
  expect(wrapper.find('input#streetAddress').prop('value')).toBe('Storgatan 1')
  wrapper
    .find('input#postalCode')
    .simulate('change', { target: { value: '12345' } })
  expect(wrapper.find('input#postalCode').prop('value')).toBe('12345')
  wrapper
    .find('select#apartmentType')
    .simulate('change', { target: { value: ApartmentType.RENT } })
  expect(wrapper.find('select#apartmentType').prop('value')).toBe(
    ApartmentType.RENT,
  )
  wrapper.find('input#size').simulate('change', { target: { value: 54 } })
  expect(wrapper.find('input#size').prop('value')).toBe(54)
  wrapper
    .find('select#numberOfPeople')
    .simulate('change', { target: { value: 3 } })
  expect(wrapper.find('select#numberOfPeople').prop('value')).toBe(3)
})

it('handles too big apartment', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_LIVING_SITUATION_TEXT:
            '{streetAddress} {postalCode} {apartmentType} {size} {sizeValidationErrorMaybe} {numberOfPeople}',
        }}
      >
        <LivingSituationInput />
      </MockTextKeyProvider>
    </Provider>,
  )

  expect(wrapper.find(InputValidationError)).toHaveLength(0)
  wrapper.find('input#size').simulate('change', { target: { value: 1337 } })
  expect(wrapper.find('input#size').prop('value')).toBe(1337)
  expect(wrapper.find(InputValidationError)).toHaveLength(1)
})

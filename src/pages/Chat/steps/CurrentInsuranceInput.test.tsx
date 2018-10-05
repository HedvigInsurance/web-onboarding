import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { createSession } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { WithStorageProps } from '../../../App'
import { Insurer } from '../state'
import { CurrentInsuranceInput } from './CurrentInsuranceInput'

it('handles form changes', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <CurrentInsuranceInput />,
    </Provider>,
  )
  wrapper
    .find('select#hasCurrentInsurance')
    .simulate('change', { target: { value: 'yes' } })
  expect(wrapper.find('select#hasCurrentInsurance').prop('value')).toBe('yes')
  wrapper
    .find('select#currentInsurer')
    .simulate('change', { target: { value: Insurer.FOLKSAM } })
  expect(wrapper.find('select#currentInsurer').prop('value')).toBe(
    Insurer.FOLKSAM,
  )
})

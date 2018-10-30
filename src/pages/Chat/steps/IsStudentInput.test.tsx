import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
import { createSession } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { WithStorageProps } from 'utils/StorageContainer'
import { ChatStep, State } from '../state'
import { isIsStudentInputDone, IsStudentInput } from './IsStudentInput'

it('checks whether the student input is done', () => {
  const chatState: State = {
    isStudent: '',
    nameAge: { firstName: '', lastName: '', age: '18' },
    livingSituation: {
      size: 12,
      numberOfPeople: 1,
      streetAddress: '',
      postalNumber: '123 45',
    },
    currentInsurance: { hasCurrentInsurance: false },
    currentStep: ChatStep.IS_STUDENT_INPUT,
    visibleSteps: [],
    initialVisibleSteps: [],
  }

  expect(isIsStudentInputDone({ ...chatState })).toBe(false)
  expect(isIsStudentInputDone({ ...chatState, isStudent: 'true' })).toBe(true)
  expect(isIsStudentInputDone({ ...chatState, isStudent: 'false' })).toBe(true)

  expect(
    isIsStudentInputDone({
      ...chatState,
      isStudent: 'true',
      nameAge: { ...chatState.nameAge, age: 42 },
    }),
  ).toBe(false)
  expect(
    isIsStudentInputDone({
      ...chatState,
      isStudent: 'false',
      nameAge: { ...chatState.nameAge, age: 42 },
    }),
  ).toBe(true)
})

it('renders without 💥 and changes form value', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider textKeys={{}}>
        <IsStudentInput />
      </MockTextKeyProvider>
    </Provider>,
  )

  expect(wrapper.find('select').prop('value')).toBe('')
  wrapper.find('select').simulate('change', { target: { value: 'true' } })
  expect(wrapper.find('select').prop('value')).toBe('true')
})

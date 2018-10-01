import { UserResponse, UserTextInput } from 'components/userInput/UserResponse'
import { Container, StateUpdater } from 'constate'
import { Formik } from 'formik'
import * as React from 'react'
import { ChatContainer } from '../state'

interface FormValues {
  firstName: string
  lastName: string
  age: number | string
}
interface State {
  hasFocused: boolean
}

interface Actions {
  setFocused: () => StateUpdater<State>
}

interface Props {
  onSubmit: (state?: FormValues) => void
}

const isDone = (values: FormValues) =>
  values.firstName.length > 0 &&
  values.lastName.length > 0 &&
  String(values.age).length >= 2 &&
  values.age > 0

export const NameAgeInput: React.SFC<Props> = ({ onSubmit }) => (
  <ChatContainer>
    {({ setStep1 }) => (
      <Container<State, Actions>
        initialState={{ hasFocused: false }}
        actions={{ setFocused: () => (_) => ({ hasFocused: true }) }}
      >
        {(state) => (
          <Formik<FormValues>
            initialValues={{ firstName: '', lastName: '', age: '' }}
            onSubmit={({ firstName, lastName, age }) => {
              setStep1(firstName, lastName, Number(age))
              onSubmit({ firstName, lastName, age })
            }}
          >
            {(props) => (
              <UserResponse>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!isDone(props.values)) {
                      return
                    }
                    props.handleSubmit(e)
                  }}
                >
                  <div>
                    Jag heter{' '}
                    <UserTextInput
                      type="text"
                      id="firstName"
                      value={props.values.firstName}
                      onChange={props.handleChange}
                      maxWidth={Math.max(props.values.firstName.length, 10)}
                      innerRef={(ref) => {
                        if (state.hasFocused || !ref) {
                          return
                        }
                        ref.focus()
                        state.setFocused()
                      }}
                    />{' '}
                    <UserTextInput
                      type="text"
                      id="lastName"
                      value={props.values.lastName}
                      onChange={props.handleChange}
                      maxWidth={Math.max(props.values.lastName.length, 15)}
                    />
                  </div>
                  <div>
                    och är{' '}
                    <UserTextInput
                      type="number"
                      id="age"
                      step={1}
                      value={props.values.age}
                      onChange={props.handleChange}
                      maxWidth={4.5}
                    />{' '}
                    år gammal
                    {isDone(props.values) && (
                      <div>
                        <button type="submit">Ok</button>
                      </div>
                    )}
                  </div>
                </form>
              </UserResponse>
            )}
          </Formik>
        )}
      </Container>
    )}
  </ChatContainer>
)

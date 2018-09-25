import { Container, StateUpdater } from 'constate'
import * as React from 'react'
import {
  UserResponse,
  UserTextInput,
} from '../../../components/userInput/UserResponse'
import { ChatContainer } from '../state'

interface State {
  firstName: string
  lastName: string
  age: string
  hasFocused: boolean
}

interface Actions {
  setFirstName: (firstName: string) => StateUpdater<State>
  setLastName: (lastName: string) => StateUpdater<State>
  setAge: (age: string) => StateUpdater<State>
  setFocused: () => StateUpdater<State>
}

interface Props {
  onSubmit: (state?: State) => void
}

const isDone = (state: State) =>
  state.firstName.length > 0 &&
  state.lastName.length > 0 &&
  state.age.length >= 2

export const NameAgeInput: React.SFC<Props> = ({ onSubmit }) => (
  <ChatContainer>
    {({ setStep1 }) => (
      <Container<State, Actions>
        initialState={{
          firstName: '',
          lastName: '',
          age: '',
          hasFocused: false,
        }}
        actions={{
          setFirstName: (firstName) => (_) => ({ firstName }),
          setLastName: (lastName) => (_) => ({ lastName }),
          setAge: (age) => (_) => {
            if (/^\d{0,3}$/.test(age)) {
              return { age }
            }
            return {}
          },
          setFocused: () => (_) => ({ hasFocused: true }),
        }}
      >
        {(state) => (
          <UserResponse>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!isDone(state)) {
                  return
                }
                setStep1(state.firstName, state.lastName, Number(state.age))
                onSubmit()
              }}
            >
              <div>
                Jag heter{' '}
                <UserTextInput
                  type="text"
                  value={state.firstName}
                  onChange={(e) => {
                    state.setFirstName(e.target.value)
                  }}
                  maxWidth={Math.max(state.firstName.length, 10)}
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
                  value={state.lastName}
                  onChange={(e) => {
                    state.setLastName(e.target.value)
                  }}
                  maxWidth={Math.max(state.lastName.length, 15)}
                />
              </div>
              <div>
                och är{' '}
                <UserTextInput
                  type="number"
                  step={1}
                  value={state.age}
                  onChange={(e) => {
                    state.setAge(e.target.value)
                  }}
                  maxWidth={4.5}
                />{' '}
                år gammal
                {isDone(state) && (
                  <div>
                    <button type="submit">Ok</button>
                  </div>
                )}
              </div>
            </form>
          </UserResponse>
        )}
      </Container>
    )}
  </ChatContainer>
)

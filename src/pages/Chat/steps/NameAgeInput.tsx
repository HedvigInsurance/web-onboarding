import { UserResponse, UserTextInput } from 'components/userInput/UserResponse'
import { Container, StateUpdater } from 'constate'
import { pathOr, pipe } from 'ramda'
import * as React from 'react'
import {
  ChatContainer,
  Effects as ChatActions,
  State as ChatState,
  Step1State,
} from '../state'

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
  appear?: boolean
  onSubmit: (state?: FormValues) => void
}

const handleChange = <K extends keyof Step1State>(
  field: K,
  chatState: ChatActions,
) =>
  pipe<React.ChangeEvent<HTMLInputElement>, Step1State[K], void>(
    pathOr<string>('', ['target', 'value']),
    (val: string | number) => chatState.setStep1Prop(field, val),
  )

const isDone = (
  values: FormValues = { firstName: '', lastName: '', age: '' },
) =>
  pathOr(0, ['firstName', 'length'], values) > 0 &&
  pathOr(0, ['lastName', 'length'], values) > 0 &&
  String(pathOr(0, ['age'], values)).length >= 2 &&
  pathOr(0, ['age'], values) > 0

export const NameAgeInput: React.SFC<Props> = ({ onSubmit, appear }) => (
  <ChatContainer>
    {(chatState: ChatState & ChatActions) => (
      <Container<State, Actions>
        initialState={{ hasFocused: false }}
        actions={{ setFocused: () => (_) => ({ hasFocused: true }) }}
      >
        {(state) => (
          <UserResponse appear={appear}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!isDone(chatState.step1)) {
                  return
                }
                if (onSubmit) {
                  onSubmit(chatState.step1)
                }
              }}
            >
              <div>
                Jag heter{' '}
                <UserTextInput
                  type="text"
                  id="firstName"
                  value={pathOr('', ['step1', 'firstName'], chatState)}
                  onChange={handleChange('firstName', chatState)}
                  maxWidth={Math.max(
                    pathOr(0, ['step1', 'firstName', 'length'], chatState),
                    10,
                  )}
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
                  value={pathOr('', ['step1', 'lastName'], chatState)}
                  onChange={handleChange('lastName', chatState)}
                  maxWidth={Math.max(
                    pathOr(0, ['step1', 'lastName', 'length'], chatState),
                    15,
                  )}
                />
              </div>
              <div>
                och är{' '}
                <UserTextInput
                  type="number"
                  id="age"
                  step={1}
                  value={pathOr('', ['step1', 'age'], chatState)}
                  onChange={handleChange('age', chatState)}
                  maxWidth={4.5}
                />{' '}
                år gammal
                {isDone(chatState.step1) && (
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

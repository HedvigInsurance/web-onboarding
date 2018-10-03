import { UserResponse, UserTextInput } from 'components/userInput/UserResponse'
import { Container, StateUpdater } from 'constate'
import { pathOr, pipe } from 'ramda'
import * as React from 'react'
import * as yup from 'yup'
import {
  ChatContainer,
  Effects as ChatActions,
  NameAgeState,
  State as ChatState,
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

const handleChange = <K extends keyof NameAgeState>(
  field: K,
  chatState: ChatActions,
) =>
  pipe<React.ChangeEvent<HTMLInputElement>, NameAgeState[K], void>(
    pathOr<string>('', ['target', 'value']),
    (val: string | number) => chatState.setNameAgeProp(field, val),
  )

const validationSchema = () =>
  yup
    .object<Partial<NameAgeState>>({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      age: yup
        .number()
        .positive()
        .moreThan(10)
        .lessThan(199)
        .required(),
    })
    .required()

const isDone = (values: Partial<NameAgeState> = {}) =>
  validationSchema().isValidSync(values)

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
                if (!isDone(chatState.nameAge)) {
                  return
                }
                if (onSubmit) {
                  onSubmit(chatState.nameAge)
                }
              }}
            >
              <div>
                Jag heter{' '}
                <UserTextInput
                  type="text"
                  id="firstName"
                  value={pathOr('', ['nameAge', 'firstName'], chatState)}
                  onChange={handleChange('firstName', chatState)}
                  maxWidth={Math.max(
                    pathOr(0, ['nameAge', 'firstName', 'length'], chatState),
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
                  value={pathOr('', ['nameAge', 'lastName'], chatState)}
                  onChange={handleChange('lastName', chatState)}
                  maxWidth={Math.max(
                    pathOr(0, ['nameAge', 'lastName', 'length'], chatState),
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
                  value={pathOr('', ['nameAge', 'age'], chatState)}
                  onChange={handleChange('age', chatState)}
                  maxWidth={4.5}
                />{' '}
                år gammal
                {isDone(chatState.nameAge) && (
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

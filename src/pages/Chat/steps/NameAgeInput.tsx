import { UserResponse, UserTextInput } from 'components/userInput/UserResponse'
import { SingletonAction } from 'components/utils/SingletonAction'
import * as React from 'react'
import * as yup from 'yup'
import {
  ChatContainer,
  Effects as ChatActions,
  NameAgeState,
  State as ChatState,
} from '../state'
import { ChangeEvent } from 'react'

interface FormValues {
  firstName: string
  lastName: string
  age: number | string
}

interface Props {
  appear?: boolean
  isCurrentMessage?: boolean
  onSubmit: (state?: FormValues) => void
}

const handleChange = <K extends keyof NameAgeState>(
  field: K,
  chatState: ChatActions,
) => (event: ChangeEvent<HTMLInputElement>) => {
  chatState.setNameAgeProp(field, event.target.value)
}

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

export const NameAgeInput: React.SFC<Props> = ({
  onSubmit,
  appear,
  isCurrentMessage = false,
}) => (
  <UserResponse appear={appear}>
    <SingletonAction>
      {(focusState) => (
        <ChatContainer>
          {(chatState: ChatState & ChatActions) => (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!isDone(chatState.nameAge)) {
                  return
                }
                if (onSubmit) {
                  onSubmit(chatState.nameAge)
                }
                // JSDOM weirdness writes to console.error if one runs window.blur
                if (process.env.NODE_ENV !== 'test') {
                  window.blur()
                }
              }}
            >
              <div>
                Jag heter{' '}
                <UserTextInput
                  type="text"
                  id="firstName"
                  value={chatState.nameAge.firstName}
                  onChange={handleChange('firstName', chatState)}
                  maxWidth={Math.max(
                    chatState.nameAge.firstName.length || 0,
                    10,
                  )}
                  innerRef={(ref) => {
                    if (!ref || focusState.isActionDone || !isCurrentMessage) {
                      return
                    }
                    ref.focus()
                    focusState.doAction()
                  }}
                />{' '}
                <UserTextInput
                  type="text"
                  id="lastName"
                  value={chatState.nameAge.lastName}
                  onChange={handleChange('lastName', chatState)}
                  maxWidth={Math.max(
                    chatState.nameAge.lastName.length || 0,

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
                  value={chatState.nameAge.age}
                  onChange={handleChange('age', chatState)}
                  maxWidth={4.5}
                  pattern="[0-9]*"
                />{' '}
                år gammal
                {isDone(chatState.nameAge) && (
                  <div>
                    <button type="submit">Ok</button>
                  </div>
                )}
              </div>
            </form>
          )}
        </ChatContainer>
      )}
    </SingletonAction>
  </UserResponse>
)

import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { UserResponse, UserTextInput } from 'components/userInput/UserResponse'
import { SingletonAction } from 'components/utils/SingletonAction'
import * as React from 'react'
import * as yup from 'yup'
import { NextButton } from '../components/NextButton'
import {
  ChatContainer,
  Effects as ChatActions,
  NameAgeState,
  State as ChatState,
} from '../state'

interface FormValues {
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
) => (event: React.ChangeEvent<HTMLInputElement>) => {
  chatState.setNameAgeProp(field, event.target.value)
}

const validationSchema = () =>
  yup
    .object<Partial<NameAgeState>>({
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

export const AgeInput: React.SFC<Props> = ({
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
                <TranslationsPlaceholderConsumer
                  textKey="CHAT_INPUT_AGE_TEXT"
                  replacements={{
                    age: (
                      <TranslationsConsumer textKey="CHAT_INPUT_AGE_AGE_PLACEHOLDER">
                        {(placeholder) => (
                          <UserTextInput
                            type="number"
                            id="age"
                            placeholder={placeholder}
                            step={1}
                            value={chatState.nameAge.age}
                            onChange={handleChange('age', chatState)}
                            maxWidth={4.5}
                            pattern="[0-9]*"
                            innerRef={(ref) => {
                              if (
                                !ref ||
                                focusState.isActionDone ||
                                !isCurrentMessage
                              ) {
                                return
                              }
                              ref.focus()
                              focusState.doAction()
                            }}
                          />
                        )}
                      </TranslationsConsumer>
                    ),
                  }}
                >
                  {(nodes) => nodes}
                </TranslationsPlaceholderConsumer>
              </div>
              {isDone(chatState.nameAge) && isCurrentMessage && <NextButton />}
            </form>
          )}
        </ChatContainer>
      )}
    </SingletonAction>
  </UserResponse>
)

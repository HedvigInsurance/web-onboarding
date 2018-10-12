import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
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

interface FormValues {
  firstName: string
  lastName: string
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
      firstName: yup.string().required(),
      lastName: yup.string().required(),
    })
    .required()

const isDone = (values: Partial<NameAgeState> = {}) =>
  validationSchema().isValidSync(values)

export const NameInput: React.SFC<Props> = ({
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
                  textKey="CHAT_INPUT_NAME_TEXT"
                  replacements={{
                    firstName: (
                      <TranslationsConsumer textKey="CHAT_INPUT_NAME_FIRST_NAME_PLACEHOLDER">
                        {(placeholder) => (
                          <UserTextInput
                            type="text"
                            id="firstName"
                            placeholder={placeholder}
                            value={chatState.nameAge.firstName}
                            onChange={handleChange('firstName', chatState)}
                            maxWidth={Math.max(
                              chatState.nameAge.firstName.length || 0,
                              10,
                            )}
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
                    lastName: (
                      <TranslationsConsumer textKey="CHAT_INPUT_NAME_LAST_NAME_PLACEHOLDER">
                        {(placeholder) => (
                          <UserTextInput
                            type="text"
                            id="lastName"
                            value={chatState.nameAge.lastName}
                            placeholder={placeholder}
                            onChange={handleChange('lastName', chatState)}
                            maxWidth={Math.max(
                              chatState.nameAge.lastName.length || 0,
                              15,
                            )}
                          />
                        )}
                      </TranslationsConsumer>
                    ),
                  }}
                >
                  {(nodes) => nodes}
                </TranslationsPlaceholderConsumer>
              </div>
              {isDone(chatState.nameAge) &&
                isCurrentMessage && (
                  <div>
                    <button type="submit">
                      <TranslationsConsumer textKey="CHAT_INPUT_NEXT_LABEL">
                        {(text) => text}
                      </TranslationsConsumer>
                    </button>
                  </div>
                )}
            </form>
          )}
        </ChatContainer>
      )}
    </SingletonAction>
  </UserResponse>
)

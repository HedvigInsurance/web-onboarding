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
import { Focusable } from './base'

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

export const isNameDone = (values: Partial<NameAgeState> = {}) =>
  validationSchema().isValidSync(values)

export const NameInput: React.SFC<Props & Focusable> = ({
  onSubmit,
  appear,
  onFocus = () => {}, // tslint:disable-line no-empty
  onBlur = () => {}, // tslint:disable-line no-empty
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
                if (!isNameDone(chatState.nameAge)) {
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
                            autoComplete="given-name"
                            autoFocus
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
                            onFocus={onFocus}
                            onBlur={onBlur}
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
                            autoComplete="family-name"
                            value={chatState.nameAge.lastName}
                            placeholder={placeholder}
                            onChange={handleChange('lastName', chatState)}
                            maxWidth={Math.max(
                              chatState.nameAge.lastName.length || 0,
                              15,
                            )}
                            onFocus={onFocus}
                            onBlur={onBlur}
                          />
                        )}
                      </TranslationsConsumer>
                    ),
                  }}
                >
                  {(nodes) => nodes}
                </TranslationsPlaceholderConsumer>
              </div>
              <NextButton
                disabled={!isNameDone(chatState.nameAge)}
                hidden={!isCurrentMessage || !isNameDone(chatState.nameAge)}
              />
            </form>
          )}
        </ChatContainer>
      )}
    </SingletonAction>
  </UserResponse>
)

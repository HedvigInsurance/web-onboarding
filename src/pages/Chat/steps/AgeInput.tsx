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
  format: (val: string | number) => string | number = (value) => value,
) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  chatState.setNameAgeProp(field, format(event.target.value))
}

const validationSchema = () =>
  yup
    .object<Partial<NameAgeState>>({
      age: yup
        .number()
        .integer()
        .positive()
        .moreThan(10)
        .lessThan(117)
        .required(),
    })
    .required()

export const isAgeDone = (values: Partial<NameAgeState> = {}) =>
  validationSchema().isValidSync(values)

export const AgeInput: React.SFC<Props & Focusable> = ({
  onSubmit,
  appear,
  isCurrentMessage = false,
  onFocus = () => {}, // tslint:disable-line no-empty
  onBlur = () => {}, // tslint:disable-line no-empty
}) => (
  <UserResponse appear={appear}>
    <SingletonAction>
      {(focusState) => (
        <ChatContainer>
          {(chatState: ChatState & ChatActions) => (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!isAgeDone(chatState.nameAge)) {
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
                            type="text"
                            id="age"
                            placeholder={placeholder}
                            step={1}
                            value={String(chatState.nameAge.age).replace(
                              /[^\d]/g,
                              '',
                            )}
                            // onChange={handleChange('age', chatState)}
                            onChange={handleChange(
                              'age',
                              chatState,
                              (value) => {
                                return value
                              },
                            )}
                            maxWidth={2}
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
                disabled={!isAgeDone(chatState.nameAge)}
                hidden={!isCurrentMessage || !isAgeDone(chatState.nameAge)}
              />
            </form>
          )}
        </ChatContainer>
      )}
    </SingletonAction>
  </UserResponse>
)

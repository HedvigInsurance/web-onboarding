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
  LivingSituationState,
} from '../state'

const handleChange = <K extends keyof LivingSituationState>(
  field: K,
  chatState: ChatActions,
  format: (val?: string | number) => undefined | string | number = (value) =>
    value,
) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  chatState.setLivingSituationProp(field, format(event.target.value))
}

const validationSchema = yup
  .object<Partial<LivingSituationState>>({
    streetAddress: yup.string().required(),
    postalCode: yup
      .string()
      .matches(/^[0-9]{3}\s?[0-9]{2}$/)
      .required(),
  })

  .required()

const isDone = (values: Partial<LivingSituationState> = {}) => {
  try {
    validationSchema.validateSync(values)
    return true
  } catch (e) {
    return false
  }
}
interface AddressInputProps {
  appear?: boolean
  onSubmit?: () => void
  isCurrentMessage?: boolean
}

export const AddressInput: React.SFC<AddressInputProps> = ({
  appear,
  onSubmit = () => {
    /* noop */
  },
  isCurrentMessage,
}) => (
  <UserResponse appear={appear}>
    <SingletonAction>
      {(focusState) => (
        <ChatContainer>
          {(chatState) => (
            <form
              onSubmit={(e) => {
                e.preventDefault()

                if (!isDone(chatState.livingSituation)) {
                  return
                }

                onSubmit()
                // JSDOM weirdness writes to console.error if one runs window.blur
                if (process.env.NODE_ENV !== 'test') {
                  window.blur()
                }
              }}
            >
              <TranslationsPlaceholderConsumer
                textKey="CHAT_INPUT_ADDRESS_TEXT"
                replacements={{
                  streetAddress: (
                    <TranslationsConsumer textKey="CHAT_INPUT_ADDRESS_STREET_PLACEHOLDER">
                      {(placeholder) => (
                        <UserTextInput
                          type="text"
                          maxWidth={Math.max(
                            chatState.livingSituation.streetAddress.length || 0,
                            20,
                          )}
                          id="streetAddress"
                          placeholder={placeholder}
                          value={chatState.livingSituation.streetAddress}
                          onChange={handleChange('streetAddress', chatState)}
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
                  postalCode: (
                    <TranslationsConsumer textKey="CHAT_INPUT_ADDRESS_POSTAL_CODE_PLACEHOLDER">
                      {(placeholder) => (
                        <UserTextInput
                          type="number"
                          maxWidth={6}
                          id="postalCode"
                          placeholder={placeholder}
                          value={chatState.livingSituation.postalCode}
                          onChange={handleChange(
                            'postalCode',
                            chatState,
                            (value) => String(value).replace(/[^\d\s]/g, ''),
                          )}
                          maxLength={6}
                          pattern="[0-9]*"
                        />
                      )}
                    </TranslationsConsumer>
                  ),
                }}
              >
                {(nodes) => nodes}
              </TranslationsPlaceholderConsumer>
              <NextButton
                disabled={
                  !isDone(chatState.livingSituation) || !isCurrentMessage
                }
              />
            </form>
          )}
        </ChatContainer>
      )}
    </SingletonAction>
  </UserResponse>
)

import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { UserResponse, UserTextInput } from 'components/userInput/UserResponse'
import { SingletonAction } from 'components/utils/SingletonAction'
import * as React from 'react'
import { formatPostalNumber } from 'utils/postalNumbers'
import * as yup from 'yup'
import { NextButton } from '../components/NextButton'
import {
  ChatContainer,
  Effects as ChatActions,
  LivingSituationState,
} from '../state'
import { Focusable } from './base'

const handleChange = <K extends keyof LivingSituationState>(
  field: K,
  chatState: ChatActions,
  format: (val?: string | number) => LivingSituationState[K] = (value) =>
    value as LivingSituationState[K],
) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  chatState.setLivingSituationProp(field, format(event.target.value))
}

const POSTAL_NUMBER_REGEX = '^[0-9]{3}[\\s]?[0-9]{2}$'

const validationSchema = yup
  .object<Partial<LivingSituationState>>({
    streetAddress: yup.string().required(),
    postalNumber: yup
      .string()
      .matches(RegExp(POSTAL_NUMBER_REGEX))
      .required(),
  })
  .required()

export const isAddressDone = (values: Partial<LivingSituationState> = {}) => {
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

export const AddressInput: React.SFC<AddressInputProps & Focusable> = ({
  appear,
  onSubmit = () => {
    /* noop */
  },
  isCurrentMessage,
  onFocus = () => {}, // tslint:disable-line no-empty
  onBlur = () => {}, // tslint:disable-line no-empty
}) => (
  <UserResponse appear={appear}>
    <SingletonAction>
      {(focusState) => (
        <ChatContainer>
          {(chatState) => (
            <form
              onSubmit={(e) => {
                e.preventDefault()

                if (!isAddressDone(chatState.livingSituation)) {
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
                            15,
                          )}
                          id="streetAddress"
                          autoComplete="street-address"
                          autoFocus
                          placeholder={placeholder}
                          value={chatState.livingSituation.streetAddress}
                          onChange={handleChange('streetAddress', chatState)}
                          ref={(ref) => {
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
                  postalNumber: (
                    <TranslationsConsumer textKey="CHAT_INPUT_ADDRESS_POSTAL_NUMBER_PLACEHOLDER">
                      {(placeholder) => (
                        <UserTextInput
                          type="text"
                          maxWidth={6}
                          id="postalNumber"
                          autoComplete="postal-code"
                          placeholder={placeholder}
                          value={formatPostalNumber(
                            chatState.livingSituation.postalNumber,
                          )}
                          onChange={handleChange(
                            'postalNumber',
                            chatState,
                            (value) =>
                              formatPostalNumber(String(value)).replace(
                                /[^\d\s]/g,
                                '',
                              ),
                          )}
                          maxLength={6}
                          pattern={POSTAL_NUMBER_REGEX}
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
              <NextButton
                disabled={!isAddressDone(chatState.livingSituation)}
                hidden={
                  !isCurrentMessage || !isAddressDone(chatState.livingSituation)
                }
              />
            </form>
          )}
        </ChatContainer>
      )}
    </SingletonAction>
  </UserResponse>
)

import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import {
  InputValidationError,
  UserResponse,
  UserSelectInput,
  UserTextInput,
} from 'components/userInput/UserResponse'
import { SingletonAction } from 'components/utils/SingletonAction'
import * as React from 'react'
import * as yup from 'yup'
import {
  ApartmentType,
  ChatContainer,
  Effects as ChatActions,
  LivingSituationState,
} from '../state'

interface LivingSituationInputProps {
  appear?: boolean
  onSubmit?: () => void
  isCurrentMessage?: boolean
}

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
    numberOfPeople: yup
      .number()
      .moreThan(0)
      .lessThan(7, 'UNKNOWN_ERROR') // This should never happen since it s a dropdown
      .required(),
    apartmentType: yup
      .mixed()
      .oneOf(Object.keys(ApartmentType))
      .required(),
    size: yup
      .mixed()
      .test({
        name: 'isntTooBig',
        test: (value) => !isNaN(Number(value)) && value < 250,
        message: 'CHAT_INPUT_LIVING_SITUATION_APARTMENT_SIZE_TOO_BIG',
      })
      .test({
        test: (value) =>
          value === '' || (!isNaN(Number(value)) && Number(value) > 0),
        message: 'UNKNOWN_ERROR',
      })
      .test({
        test: (value) => value !== '',
        message: 'noop',
      }),
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
const getValidationError = (
  values: Partial<LivingSituationState> = {},
): [string, string] | null => {
  try {
    validationSchema.validateSync(values)
    return null
  } catch (e) {
    return [e.params.path, e.message]
  }
}

const hasValidationErrorForKey = (
  key: keyof LivingSituationState,
  validationError: [string, string] | null,
) => {
  if (validationError === null || validationError === undefined) {
    return false
  }
  if (validationError[0] !== key) {
    return false
  }

  if (validationError[1] === 'noop') {
    return false
  }

  return true
}

interface ValidationErrorMaybeProps {
  field: keyof LivingSituationState
  values: Partial<LivingSituationState>
}

const ValidationErrorMaybe: React.SFC<ValidationErrorMaybeProps> = ({
  field,
  values,
}) => {
  const validationError = getValidationError(values)
  if (
    validationError !== null &&
    hasValidationErrorForKey(field, validationError)
  ) {
    return (
      <InputValidationError>
        <TranslationsConsumer textKey={validationError[1]}>
          {(t) => t}
        </TranslationsConsumer>
      </InputValidationError>
    )
  }
  return null
}

export const LivingSituationInput: React.SFC<LivingSituationInputProps> = ({
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
                textKey="CHAT_INPUT_LIVING_SITUATION_TEXT"
                replacements={{
                  streetAddress: (
                    <TranslationsConsumer textKey="CHAT_INPUT_LIVING_SITUATION_STREET_ADDRESS_PLACEHOLDER">
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
                    <TranslationsConsumer textKey="CHAT_INPUT_LIVING_SITUATION_POSTAL_CODE_PLACEHOLDER">
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
                  apartmentType: (
                    <TranslationsConsumer textKey="CHAT_INPUT_LIVING_SITUATION_APARTMENT_TYPE_RENT">
                      {(rentLabel) => (
                        <TranslationsConsumer textKey="CHAT_INPUT_LIVING_SITUATION_APARTMENT_TYPE_OWN">
                          {(ownLabel) => (
                            <UserSelectInput
                              id="apartmentType"
                              value={
                                chatState.livingSituation.apartmentType ||
                                'select'
                              }
                              onChange={handleChange(
                                'apartmentType',
                                chatState,
                              )}
                            >
                              <option value="select" disabled>
                                {' '}
                              </option>
                              <option value={ApartmentType.RENT}>
                                {rentLabel}
                              </option>
                              <option value={ApartmentType.OWN}>
                                {ownLabel}
                              </option>
                            </UserSelectInput>
                          )}
                        </TranslationsConsumer>
                      )}
                    </TranslationsConsumer>
                  ),
                  size: (
                    <UserTextInput
                      type="number"
                      id="size"
                      maxWidth={4}
                      placeholder="42"
                      value={chatState.livingSituation.size}
                      onChange={handleChange('size', chatState)}
                      pattern="[0-9]*"
                    />
                  ),
                  sizeValidationErrorMaybe: (
                    <ValidationErrorMaybe
                      field="size"
                      values={chatState.livingSituation}
                    />
                  ),
                  numberOfPeople: (
                    <TranslationsConsumer textKey="CHAT_INPUT_LIVING_SITUATION_NUMBER_OF_PEOPLE_SELF">
                      {(selfLabel) => (
                        <UserSelectInput
                          id="numberOfPeople"
                          value={chatState.livingSituation.numberOfPeople}
                          onChange={handleChange('numberOfPeople', chatState)}
                        >
                          <option value={0} disabled>
                            {' '}
                          </option>
                          <option value={1}>{selfLabel}</option>
                          {[2, 3, 4, 5, 6, 7].map((numberOfPeople) => (
                            <TranslationsConsumer
                              textKey="CHAT_INPUT_LIVING_SITUATION_NUMBER_OF_PEOPLE_MULTIPLE"
                              key={numberOfPeople}
                            >
                              {(label) => (
                                <option value={numberOfPeople}>
                                  {label.replace(
                                    '{numberOfPeople}',
                                    String(numberOfPeople),
                                  )}
                                </option>
                              )}
                            </TranslationsConsumer>
                          ))}
                        </UserSelectInput>
                      )}
                    </TranslationsConsumer>
                  ),
                }}
              >
                {(nodes) => nodes}
              </TranslationsPlaceholderConsumer>
              {isDone(chatState.livingSituation) && (
                <div>
                  <TranslationsConsumer textKey="CHAT_INPUT_NEXT_LABEL">
                    {(text) => <button type="submit">{text}</button>}
                  </TranslationsConsumer>
                </div>
              )}
            </form>
          )}
        </ChatContainer>
      )}
    </SingletonAction>
  </UserResponse>
)

import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { FadeIn } from 'components/animations/appearings'
import {
  InputValidationError,
  UserResponse,
  UserSelectInput,
  UserTextInput,
} from 'components/userInput/UserResponse'
import * as React from 'react'
import * as yup from 'yup'
import { InsuranceType } from '../../Offer'
import { NextButton } from '../components/NextButton'
import {
  ChatContainer,
  Effects as ChatActions,
  LivingSituationState,
} from '../state'

interface InsuranceTypeInputProps {
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
    insuranceType: yup
      .mixed()
      .oneOf(Object.values(InsuranceType))
      .required(),
    size: yup
      .mixed()
      .test({
        name: 'isntTooBig',
        test: (value) => !isNaN(Number(value)) && value < 250,
        message: 'CHAT_INPUT_INSURANCE_TYPE_SIZE_TOO_BIG',
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
      <FadeIn>
        <InputValidationError>
          <TranslationsConsumer textKey={validationError[1]}>
            {(t) => t}
          </TranslationsConsumer>
        </InputValidationError>
      </FadeIn>
    )
  }
  return null
}

export const InsuranceTypeInput: React.SFC<InsuranceTypeInputProps> = ({
  appear,
  onSubmit = () => {
    /* noop */
  },
  isCurrentMessage,
}) => (
  <UserResponse appear={appear}>
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
            textKey="CHAT_INPUT_INSURANCE_TYPE_TEXT"
            replacements={{
              insuranceType: (
                <TranslationsConsumer textKey="CHAT_INPUT_INSURANCE_TYPE_TYPE_RENT">
                  {(rentLabel) => (
                    <TranslationsConsumer textKey="CHAT_INPUT_INSURANCE_TYPE_TYPE_BRF">
                      {(brfLabel) => (
                        <UserSelectInput
                          id="insuranceType"
                          value={
                            chatState.livingSituation.insuranceType || 'select'
                          }
                          onChange={handleChange('insuranceType', chatState)}
                        >
                          <option value="select" disabled>
                            {' '}
                          </option>
                          <option value={InsuranceType.RENT}>
                            {rentLabel}
                          </option>
                          <option value={InsuranceType.BRF}>{brfLabel}</option>
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
                  value={chatState.livingSituation.size}
                  onChange={handleChange('size', chatState)}
                  pattern="[0-9]*"
                  hasError={hasValidationErrorForKey(
                    'size',
                    getValidationError(chatState.livingSituation),
                  )}
                />
              ),
            }}
          >
            {(nodes) => nodes}
          </TranslationsPlaceholderConsumer>
          <ValidationErrorMaybe
            field="size"
            values={chatState.livingSituation}
          />
          <NextButton
            disabled={!isDone(chatState.livingSituation) || !isCurrentMessage}
          />
        </form>
      )}
    </ChatContainer>
  </UserResponse>
)

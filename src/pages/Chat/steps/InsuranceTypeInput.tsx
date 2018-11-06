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
import { InsuranceType } from 'utils/insuranceDomainUtils'
import * as yup from 'yup'
import { NextButton } from '../components/NextButton'
import {
  ChatContainer,
  Effects as ChatActions,
  LivingSituationState,
} from '../state'
import { Focusable } from './base'

interface InsuranceTypeInputProps {
  appear?: boolean
  onSubmit?: () => void
  isCurrentMessage?: boolean
}

const handleChange = <K extends keyof LivingSituationState>(
  field: K,
  chatState: ChatActions,
  format: (val?: string) => undefined | string = (value) => value,
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
      .number()
      .integer('noop')
      .min(5, 'noop')
      .max(250, 'CHAT_INPUT_INSURANCE_TYPE_SIZE_TOO_BIG')
      .required('noop'),
  })
  .required()

export const isInsuranceTypeDone = (
  values: Partial<LivingSituationState> = {},
) => {
  return !getValidationError(values)
}

const getValidationError = (
  values: Partial<LivingSituationState> = {},
): [string, string] | null => {
  try {
    validationSchema.validateSync({
      insuranceType: values.insuranceType,
      size: Number(values.size),
    })
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

const formatSquareMeters = (value?: string): string =>
  String(value).replace(/[^\d]/g, '')

const displaySquareMeters = (value: string | number): string | number =>
  value === 0 ? '' : value

export const InsuranceTypeInput: React.SFC<
  InsuranceTypeInputProps & Focusable
> = ({
  appear,
  onSubmit = () => {
    /* noop */
  },
  isCurrentMessage,
  onFocus = () => {}, // tslint:disable-line no-empty
  onBlur = () => {}, // tslint:disable-line no-empty
}) => (
  <UserResponse appear={appear}>
    <ChatContainer>
      {(chatState) => (
        <form
          onSubmit={(e) => {
            e.preventDefault()

            if (!isInsuranceTypeDone(chatState.livingSituation)) {
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
                          onFocus={onFocus}
                          onBlur={onBlur}
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
                  type="text"
                  id="size"
                  maxWidth={3}
                  value={chatState.livingSituation.size}
                  onChange={handleChange('size', chatState, formatSquareMeters)}
                  pattern="[0-9]*"
                  hasError={hasValidationErrorForKey(
                    'size',
                    getValidationError(chatState.livingSituation),
                  )}
                  onFocus={onFocus}
                  onBlur={onBlur}
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
            disabled={!isInsuranceTypeDone(chatState.livingSituation)}
            hidden={
              !isCurrentMessage ||
              !isInsuranceTypeDone(chatState.livingSituation)
            }
          />
        </form>
      )}
    </ChatContainer>
  </UserResponse>
)

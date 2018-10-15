import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import * as yup from 'yup'
import { InputValidationError } from '../../../components/userInput/UserResponse'
import { LivingSituationState } from '../state'

const getValidationError = (
  schema: yup.Schema<Partial<LivingSituationState>>,
) => (values: Partial<LivingSituationState> = {}): [string, string] | null => {
  try {
    schema.validateSync(values)
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
  schema: yup.Schema<Partial<LivingSituationState>>
}

export const ValidationErrorMaybe: React.SFC<ValidationErrorMaybeProps> = ({
  field,
  values,
  schema,
}) => {
  const validationError = getValidationError(schema)(values)
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

import React, { FormEvent } from 'react'
import { FormikProps, getIn } from 'formik'
import { CoreInputFieldProps, RawInputField } from 'components/inputs'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { QuoteInput } from '../Introduction/DetailsModal/types'

interface CheckoutInputProps {
  field?: CoreInputFieldProps
  formikProps: FormikProps<QuoteInput>
  name: string
  errors?: string
  showErrorIcon?: boolean
}

const CheckoutInput: React.FC<CheckoutInputProps &
  React.InputHTMLAttributes<HTMLInputElement>> = ({
  field,
  formikProps,
  onChange,
  ...props
}) => {
  const textKeys = useTextKeys()

  return field ? (
    <RawInputField
      {...props}
      label={textKeys[field.label]()}
      placeholder={textKeys[field.placeholder ? field.placeholder : '']()}
      type={field.type}
      id={props.id || props.name}
      value={getIn(formikProps.values, props.name)}
      showErrorIcon={getIn(formikProps.errors, props.name)}
      onChange={onChange || formikProps.handleChange}
    />
  ) : null
}

type TextInputProps = {
  name: string
  label: string
  type?: string
  formikProps: FormikProps<QuoteInput>
  placeholder?: string
  onChange?: (e: FormEvent<any>) => void
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  formikProps,
  type = 'text',
  placeholder = '',
  onChange,
}) => (
  <CheckoutInput
    name={name}
    field={{
      label,
      placeholder,
      type,
    }}
    formikProps={formikProps}
    onChange={onChange}
  />
)

type SsnInputProps = {
  name: string
  formikProps: FormikProps<QuoteInput>
  onFocus?: (e: FormEvent<any>) => void
  onChange?: (e: FormEvent<any>) => void
}

export const SsnInput: React.FC<SsnInputProps> = ({
  name,
  formikProps,
  onChange,
  onFocus,
}) => {
  const { ssn } = useCurrentLocale()

  return (
    <CheckoutInput
      name={name}
      field={{
        label: 'CHECKOUT_SSN_LABEL_GLOBAL',
        placeholder: ssn.formatExample,
      }}
      pattern="[0-9]*"
      maxLength={ssn.length}
      formikProps={formikProps}
      onChange={onChange}
      onFocus={onFocus}
    />
  )
}

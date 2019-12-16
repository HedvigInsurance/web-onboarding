import { GenericFieldHTMLAttributes } from 'formik'
import { TextInput } from 'new-components/inputs'
import * as React from 'react'
import { FieldType } from './types'

interface DetailInputProps {
  field?: FieldType
  name: string
  errors?: string
  touched?: boolean
  min?: string | number
  max?: string | number
  setFieldValue: (name: string, value: any) => void
}

export const DetailInput: React.FC<DetailInputProps &
  GenericFieldHTMLAttributes> = ({
  field,
  name,
  errors,
  touched,
  min,
  max,
  setFieldValue,
}) =>
  field ? (
    <TextInput
      label={field.label}
      placeholder={field.placeholder}
      name={name}
      mask={field.mask}
      type={field.type}
      options={field.options}
      showErrorMessage={false}
      errors={errors}
      touched={touched}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (!field.mask) {
          setFieldValue(name, e.target.value || '')
        } else {
          setFieldValue(name, field.mask.sanitize(e.target.value || ''))
        }
      }}
      autoComplete="off"
      min={min}
      max={max}
    />
  ) : null

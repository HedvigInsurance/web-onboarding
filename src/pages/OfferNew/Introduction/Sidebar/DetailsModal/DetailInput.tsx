import { FormikProps, GenericFieldHTMLAttributes, getIn } from 'formik'
import { EditQuoteInput } from 'generated/graphql'
import { TextInput } from 'new-components/inputs'
import * as React from 'react'
import { FieldType } from './types'

interface DetailInputProps {
  field?: FieldType
  formikProps: FormikProps<EditQuoteInput>
  nameRoot: 'apartment' | 'house'
  name: string
}

export const DetailInput: React.FC<DetailInputProps &
  GenericFieldHTMLAttributes> = ({ field, formikProps, nameRoot, name }) => {
  const formikName = `${nameRoot}.${name}`

  return field ? (
    <TextInput
      label={field.label}
      placeholder={field.placeholder}
      name={formikName}
      mask={field.mask}
      type={field.type}
      options={field.options}
      showErrorMessage={false}
      errors={getIn(formikProps.errors[nameRoot], name)}
      touched={getIn(formikProps.touched[nameRoot], name)}
      autoComplete="off"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const value = field.mask
          ? field.mask.sanitize(e.target.value)
          : e.target.value

        if (field.type === 'number') {
          formikProps.setFieldValue(formikName, parseInt(value, 10))
        } else {
          formikProps.setFieldValue(
            formikName,
            /^(true|false)$/.test(value) ? JSON.parse(value) : value,
          )
        }
      }}
    />
  ) : null
}

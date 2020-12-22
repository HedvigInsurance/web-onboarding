import { FormikProps, GenericFieldHTMLAttributes, getIn } from 'formik'
import React from 'react'
import { InputField } from 'components/inputs'
import { EditQuoteInput } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { RegularFieldType } from '../../types'

interface DetailInputProps {
  field?: RegularFieldType
  formikProps: FormikProps<EditQuoteInput>
  nameRoot?:
    | 'swedishApartment'
    | 'swedishHouse'
    | 'norwegianHomeContents'
    | 'norwegianTravel'
    | 'danishHomeContents'
  name: string
}

export const DetailInput: React.FC<DetailInputProps &
  GenericFieldHTMLAttributes> = ({ field, formikProps, nameRoot, name }) => {
  const textKeys = useTextKeys()
  const formikName = nameRoot ? `${nameRoot}.${name}` : name
  return field ? (
    <InputField
      label={textKeys[field.label]()}
      placeholder={textKeys[field.placeholder ? field.placeholder : '']()}
      name={formikName}
      mask={field.mask}
      type={field.type}
      options={field.options?.map((o) => ({
        label: textKeys[o.label](),
        value: o.value,
      }))}
      showErrorMessage={false}
      errors={getIn(formikProps.errors, formikName)}
      touched={getIn(formikProps.touched, formikName)}
      autoComplete="off"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const value = field.mask
          ? field.mask.sanitize(e.target.value)
          : e.target.value

        if (field.type === 'number') {
          formikProps.setFieldValue(formikName, value && parseInt(value, 10))
        } else {
          formikProps.setFieldValue(
            formikName,
            /^(true|false)/.test(value) ? JSON.parse(value) : value,
          )
        }
      }}
    />
  ) : null
}

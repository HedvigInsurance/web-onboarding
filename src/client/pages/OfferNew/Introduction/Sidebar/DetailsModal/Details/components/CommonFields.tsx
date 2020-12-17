import React from 'react'
import { FormikProps } from 'formik'
import { InputGroup } from 'components/inputs'
import { EditQuoteInput } from 'src/client/data/graphql'
import { FieldSchema } from '../../types'
import { DetailInput } from './DetailInput'

type CommonFieldsProps = {
  fieldSchema: FieldSchema
  formikProps: FormikProps<EditQuoteInput>
}

export const CommonFields: React.FC<CommonFieldsProps> = ({
  fieldSchema,
  formikProps,
}) => (
  <InputGroup>
    <DetailInput
      field={fieldSchema.firstName}
      formikProps={formikProps}
      nameRoot=""
      name="firstName"
    />
    <DetailInput
      field={fieldSchema.lastName}
      formikProps={formikProps}
      nameRoot=""
      name="lastName"
    />
    <DetailInput
      field={fieldSchema.birthDate}
      formikProps={formikProps}
      nameRoot=""
      name="birthDate"
    />
  </InputGroup>
)

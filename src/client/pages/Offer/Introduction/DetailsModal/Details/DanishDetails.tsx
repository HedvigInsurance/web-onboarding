import React from 'react'
import * as Yup from 'yup'
import { FormikProps } from 'formik'
import { InputGroup, inputTypes } from 'components/inputs'
import { birthDateFormats } from 'l10n/birthDateAndSsnFormats'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

import { QuoteInput } from '../types'
import {
  DetailInput,
  TextInput,
  AreaInput,
  BooleanInput,
  HomeOwnershipTypeInput,
} from './components/DetailInput'
import { Content, ContentColumn } from './components/Details.styles'

export const DanishValidationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  birthDate: Yup.string()
    .matches(birthDateFormats.backEndDefault)
    .required(),
  data: Yup.object({
    livingSpace: Yup.number()
      .min(1)
      .required(),
    householdSize: Yup.number()
      .min(1)
      .required(),
    isStudent: Yup.boolean(),
    subType: Yup.string().required(),
  }).required(),
})

export const DanishDetails: React.FC<{
  formikProps: FormikProps<QuoteInput>
}> = ({ formikProps }) => {
  const { birthDate } = useCurrentLocale()
  return (
    <Content>
      <ContentColumn>
        <InputGroup>
          <TextInput
            name="firstName"
            label="DETAILS_MODULE_TABLE_FIRSTNAME_CELL_LABEL"
            formikProps={formikProps}
          />
          <TextInput
            name="lastName"
            label="DETAILS_MODULE_TABLE_LASTNAME_CELL_LABEL"
            formikProps={formikProps}
          />
          <DetailInput
            name="birthDate"
            field={{
              label: 'DETAILS_MODULE_TABLE_BIRTHDATE_CELL_LABEL',
              placeholder: birthDate.backendFormatExample,
            }}
            formikProps={formikProps}
          />
        </InputGroup>
      </ContentColumn>
      <ContentColumn>
        <InputGroup>
          <AreaInput
            name="data.livingSpace"
            label="DETAILS_MODULE_TABLE_SIZE_CELL_LABEL_APARTMENT"
            formikProps={formikProps}
          />
          <DetailInput
            name="data.householdSize"
            field={{
              label: 'DETAILS_MODULE_TABLE_HOUSEHOLD_SIZE_CELL_LABEL',
              placeholder: '',
              type: inputTypes.number,
            }}
            formikProps={formikProps}
          />
          <BooleanInput
            name="data.isStudent"
            label="DETAILS_MODULE_TABLE_STUDENT_CELL_LABEL"
            formikProps={formikProps}
          />
          <HomeOwnershipTypeInput
            name="data.subType"
            formikProps={formikProps}
          />
        </InputGroup>
      </ContentColumn>
    </Content>
  )
}

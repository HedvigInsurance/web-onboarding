import React from 'react'
import * as Yup from 'yup'
import { FormikProps } from 'formik'
import { InputGroup, inputTypes } from 'components/inputs'
import { birthDateFormats } from 'l10n/inputFormats'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { TextKeyMap } from 'utils/textKeys'

import { QuoteInput } from '../types'
import {
  DetailInput,
  TextInput,
  BooleanInput,
  BirthDateInput,
} from './components/DetailInput'
import { Content, ContentColumn } from './components/Details.styles'

export const getDanishValidationSchema = (textKeys: TextKeyMap) => {
  return Yup.object().shape({
    firstName: Yup.string().nullable(true),
    lastName: Yup.string().nullable(true),
    birthDate: Yup.string()
      .matches(
        birthDateFormats.backEndDefault,
        textKeys.GENERIC_ERROR_INPUT_FORMAT(),
      )
      .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    data: Yup.object({
      householdSize: Yup.number()
        .min(1, textKeys.INVALID_FIELD())
        .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      isStudent: Yup.boolean(),
    }).required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
  })
}

type DanishHomeDetailsProps = {
  formikProps: FormikProps<QuoteInput>
}

export const DanishDetails = ({ formikProps }: DanishHomeDetailsProps) => {
  const { birthDate: birthDateFormat } = useCurrentLocale()

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
          <BirthDateInput
            name="birthDate"
            placeholder={birthDateFormat.backendFormatExample}
            formikProps={formikProps}
          />
        </InputGroup>
      </ContentColumn>
      <ContentColumn>
        <InputGroup>
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
        </InputGroup>
      </ContentColumn>
    </Content>
  )
}

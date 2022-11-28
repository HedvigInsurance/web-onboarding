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
  ZipcodeInput,
} from './components/DetailInput'
import { Content, ContentColumn } from './components/Details.styles'

export const getNorwegianValidationSchema = (textKeys: TextKeyMap) => {
  return Yup.object().shape({
    firstName: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    lastName: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    birthDate: Yup.string()
      .matches(
        birthDateFormats.backEndDefault,
        textKeys.GENERIC_ERROR_INPUT_FORMAT(),
      )
      .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    data: Yup.object({
      street: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      zipCode: Yup.string().matches(
        /^[0-9]{4}$/,
        textKeys.GENERIC_ERROR_INPUT_FORMAT(),
      ),
      householdSize: Yup.number()
        .min(1, textKeys.GENERIC_ERROR_INPUT_FORMAT())
        .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      isStudent: Yup.boolean(),
    }).required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
  })
}

type NorwegianDetailsProps = {
  formikProps: FormikProps<QuoteInput>
}

export const NorwegianDetails = ({ formikProps }: NorwegianDetailsProps) => {
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
          <TextInput
            name="data.street"
            label="DETAILS_MODULE_TABLE_ADDRESS_CELL_LABEL"
            formikProps={formikProps}
          />
          <ZipcodeInput
            name="data.zipCode"
            market="NO"
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
        </InputGroup>
      </ContentColumn>
    </Content>
  )
}

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
  AreaInput,
  ZipcodeInput,
  BooleanInput,
  HomeOwnershipTypeInput,
  BirthDateInput,
} from './components/DetailInput'
import { Content, ContentColumn } from './components/Details.styles'

export const getNorwegianValidationSchema = (textKeys: TextKeyMap) => {
  return Yup.object().shape({
    firstName: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    lastName: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    birthDate: Yup.string()
      .matches(birthDateFormats.backEndDefault)
      .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    data: Yup.object({
      street: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      zipCode: Yup.string().matches(/^[0-9]{4}$/),
      livingSpace: Yup.number()
        .min(1, textKeys.GENERIC_ERROR_INPUT_FORMAT())
        .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      householdSize: Yup.number()
        .min(1, textKeys.GENERIC_ERROR_INPUT_FORMAT())
        .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      isYouth: Yup.boolean(),
      subType: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    }).required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
  })
}

export const NorwegianDetails: React.FC<{
  formikProps: FormikProps<QuoteInput>
}> = ({ formikProps }) => {
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
            name="data.isYouth"
            label="DETAILS_MODULE_TABLE_YOUTH_CELL_LABEL"
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

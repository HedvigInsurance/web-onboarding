import React from 'react'
import * as Yup from 'yup'
import { FormikProps } from 'formik'
import { InputGroup, inputTypes } from 'components/inputs'
import { TextKeyMap } from 'utils/textKeys'

import { QuoteInput } from '../types'
import {
  DetailInput,
  TextInput,
  AreaInput,
  SwedishApartmentOwnershipTypeInput,
  ZipcodeInput,
} from './components/DetailInput'
import { Content, ContentColumn } from './components/Details.styles'

export const getSwedishApartmentValidationSchema = (textKeys: TextKeyMap) => {
  return Yup.object().shape({
    firstName: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    lastName: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    data: Yup.object({
      street: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      zipCode: Yup.string()
        .matches(/^[0-9]{3}[0-9]{2}$/, textKeys.GENERIC_ERROR_INPUT_FORMAT())
        .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      livingSpace: Yup.number()
        .typeError(textKeys.GENERIC_ERROR_INPUT_REQUIRED())
        .min(1, textKeys.GENERIC_ERROR_INPUT_FORMAT())
        .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      householdSize: Yup.number()
        .min(1, textKeys.GENERIC_ERROR_INPUT_FORMAT())
        .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      subType: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    }).required(),
  })
}

export const SwedishApartmentDetails: React.FC<{
  formikProps: FormikProps<QuoteInput>
}> = ({ formikProps }) => {
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
            market="SE"
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
          <SwedishApartmentOwnershipTypeInput
            name="data.subType"
            formikProps={formikProps}
          />
        </InputGroup>
      </ContentColumn>
    </Content>
  )
}

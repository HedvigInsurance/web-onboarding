import React from 'react'
import * as Yup from 'yup'
import { FormikProps } from 'formik'
import { InputGroup } from 'components/inputs'
import { TextKeyMap } from 'utils/textKeys'

import { SE_CAR_REGISTRATION_NUMBER_REGEX } from 'pages/Offer/utils'
import { QuoteInput } from '../types'
import { MileageInput, TextInput, ZipcodeInput } from './components/DetailInput'

import { Content, ContentColumn } from './components/Details.styles'

export const getSwedishCarValidationSchema = (textKeys: TextKeyMap) => {
  return Yup.object().shape({
    firstName: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    lastName: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    data: Yup.object({
      street: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      zipCode: Yup.string()
        .matches(/^[0-9]{3}[0-9]{2}$/, textKeys.GENERIC_ERROR_INPUT_FORMAT())
        .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      city: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      registrationNumber: Yup.string()
        .matches(
          SE_CAR_REGISTRATION_NUMBER_REGEX,
          textKeys.GENERIC_ERROR_INPUT_FORMAT(),
        )
        .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
      mileage: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    }).required(),
  })
}

export const SwedishCarDetails = ({
  formikProps,
}: {
  formikProps: FormikProps<QuoteInput>
}) => {
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
          <TextInput
            name="data.registrationNumber"
            label="DETAILS_MODULE_TABLE_REGISTRATION_NUMBER_CELL_LABEL"
            formikProps={formikProps}
          />
          <MileageInput
            name="data.mileage"
            label="DETAILS_MODULE_TABLE_ANNUAL_MILEAGE_CELL_LABEL"
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
          <TextInput
            name="data.city"
            label="DETAILS_MODULE_TABLE_CITY_CELL_LABEL"
            formikProps={formikProps}
          />
        </InputGroup>
      </ContentColumn>
    </Content>
  )
}

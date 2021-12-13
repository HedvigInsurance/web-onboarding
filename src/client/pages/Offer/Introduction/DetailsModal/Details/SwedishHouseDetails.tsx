import React from 'react'
import * as Yup from 'yup'
import { FormikProps } from 'formik'
import { InputGroup, InputGroupRow, inputTypes } from 'components/inputs'

import { QuoteInput } from '../types'
import {
  DetailInput,
  TextInput,
  AreaInput,
  ZipcodeInput,
  YearInput,
  ExtraBuildingsInput,
  BooleanInput,
} from './components/DetailInput'
import { Content, ContentColumn, ContentRow } from './components/Details.styles'

export const SwedishHouseValidationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  data: Yup.object({
    street: Yup.string().required(),
    zipCode: Yup.string()
      .matches(/^[0-9]{3}[0-9]{2}$/)
      .required(),
    livingSpace: Yup.number()
      .min(1)
      .required(),
    householdSize: Yup.number()
      .min(1)
      .required(),

    ancillaryArea: Yup.number()
      .min(1)
      .required(),
    numberOfBathrooms: Yup.number()
      .min(0)
      .required(),
    yearOfConstruction: Yup.number().required(),
    isSubleted: Yup.boolean().required(),
    extraBuildings: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required(),
        area: Yup.number()
          .min(1)
          .required(),
        hasWaterConnected: Yup.boolean().required(),
      }),
    ),
  }).required(),
})

export const SwedishHouseDetails: React.FC<{
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
          <AreaInput
            name="data.ancillaryArea"
            label="DETAILS_MODULE_TABLE_ANCILLARYAREA_CELL_LABEL_HOUSE"
            formikProps={formikProps}
          />

          <InputGroupRow>
            <DetailInput
              field={{
                label: 'DETAILS_MODULE_TABLE_BATHROOMS_CELL_LABEL_HOUSE',
                placeholder: '',
                type: inputTypes.number,
              }}
              formikProps={formikProps}
              name="data.numberOfBathrooms"
            />
            <YearInput
              name="data.yearOfConstruction"
              label="DETAILS_MODULE_TABLE_YEARBUILT_CELL_LABEL_HOUSE"
              formikProps={formikProps}
            />
          </InputGroupRow>
          <BooleanInput
            name="data.isSubleted"
            label="DETAILS_MODULE_TABLE_SUBLETTING_CELL_LABEL_HOUSE"
            formikProps={formikProps}
          />
        </InputGroup>
      </ContentColumn>
      <ContentRow>
        <ExtraBuildingsInput formikProps={formikProps} />
      </ContentRow>
    </Content>
  )
}

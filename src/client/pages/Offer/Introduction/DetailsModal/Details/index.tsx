import React from 'react'
import { FormikProps } from 'formik'
import { InputGroup, InputGroupRow, inputTypes } from 'components/inputs'
import { CreateQuoteInsuranceType } from 'utils/insuranceType'

import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { QuoteInput } from '../types'
import {
  DetailInput,
  TextInput,
  BooleanInput,
  HomeOwnershipTypeInput,
  AreaInput,
  YearInput,
  SwedishApartmentOwnershipTypeInput,
  ExtraBuildingsInput,
  ZipcodeInput,
} from './components/DetailInput'
import { Content, ContentColumn, ContentRow } from './components/Details.styles'

export type DetailsProps = {
  formikProps: FormikProps<QuoteInput>
}

export const Details: React.FC<DetailsProps> = ({ formikProps }) => {
  const { birthDate, marketLabel } = useCurrentLocale()
  const {
    values: {
      data: { type },
    },
  } = formikProps
  console.log(formikProps.values)
  console.log(formikProps.errors)
  const isNorway = marketLabel === 'NO'
  const isDanmark = marketLabel === 'DK'
  const isSwedishHouse = type === CreateQuoteInsuranceType.SwedishHouse
  const isSwedishApartment = type === CreateQuoteInsuranceType.SwedishApartment

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
          {(isNorway || isDanmark) && (
            <DetailInput
              name="birthDate"
              field={{
                label: 'DETAILS_MODULE_TABLE_BIRTHDATE_CELL_LABEL',
                placeholder: birthDate.backendFormatExample,
              }}
              formikProps={formikProps}
            />
          )}
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
            market={marketLabel}
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
          {isNorway && (
            <BooleanInput
              name="data.isYouth"
              label="DETAILS_MODULE_TABLE_YOUTH_CELL_LABEL"
              formikProps={formikProps}
            />
          )}
          {isDanmark && (
            <BooleanInput
              name="data.isStudent"
              label="DETAILS_MODULE_TABLE_STUDENT_CELL_LABEL"
              formikProps={formikProps}
            />
          )}
          {isSwedishApartment && (
            <SwedishApartmentOwnershipTypeInput
              name="data.subType"
              formikProps={formikProps}
            />
          )}
          {(isNorway || isDanmark) && (
            <HomeOwnershipTypeInput
              name="data.subType"
              formikProps={formikProps}
            />
          )}
          {isSwedishHouse && (
            <>
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
            </>
          )}
        </InputGroup>
      </ContentColumn>
      {isSwedishHouse && (
        <ContentRow>
          <ExtraBuildingsInput formikProps={formikProps} />
        </ContentRow>
      )}
    </Content>
  )
}

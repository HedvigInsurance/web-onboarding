import React from 'react'
import { NorwegianHomeContentsType } from 'data/graphql'
import { InputField } from 'components/inputs'
import { WithFormikProps } from './QuoteData'

const initialBaseValues = {
  firstName: 'Ole',
  lastName: 'Olsen',
  currentInsurer: '',
  birthDate: '1959-11-23',
  startDate: '',
  email: 'ole.olsen@hedvig.com',
}

export const initialNoHomeValues = {
  ...initialBaseValues,
  data: {
    isYouth: false,
    numberCoInsured: 0,
    livingSpace: 44,
    street: 'Gulebøjsveien 1',
    zipCode: '1234',
    subType: NorwegianHomeContentsType.Rent,
  },
}

export const initialNoTravelValues = {
  ...initialBaseValues,
  data: {
    numberCoInsured: 0,
    isYouth: false,
  },
}

const NorwegianCommon: React.FC<WithFormikProps> = ({ formik }) => (
  <>
    <InputField
      label="Co-insured"
      placeholder="1"
      type="number"
      {...formik.getFieldProps('data.numberCoInsured')}
    />
    <InputField
      label="Current Insurer (optional)"
      placeholder=""
      {...formik.getFieldProps('currentInsurer')}
    />
  </>
)

export const NorwegianHome: React.FC<WithFormikProps> = ({ formik }) => {
  return (
    <>
      <NorwegianCommon formik={formik} />
      <InputField
        label="Living space"
        placeholder="23"
        type="number"
        {...formik.getFieldProps('data.livingSpace')}
      />
      <InputField
        label="Street"
        placeholder="Gulebøjsveien 1"
        {...formik.getFieldProps('data.street')}
      />
      <InputField
        label="Zip code"
        placeholder="1234"
        {...formik.getFieldProps('data.zipCode')}
      />
      <InputField
        label="Type"
        options={[
          { label: 'Own', value: 'OWN' },
          { label: 'Rent', value: 'RENT' },
        ]}
        {...formik.getFieldProps('data.subType')}
      />
    </>
  )
}

export const NorwegianTravel: React.FC<WithFormikProps> = ({ formik }) => {
  return <NorwegianCommon formik={formik} />
}

import React from 'react'
import { ApartmentType } from 'data/graphql'
import { InputField } from 'components/inputs'
import { WithFormikProps } from './QuoteData'

export const initialSeApartmentValues = {
  firstName: 'Sven',
  lastName: 'Svensson',
  currentInsurer: '',
  birthDate: '1995-09-29',
  ssn: '199509291234',
  startDate: '',
  email: 'sven.svensson@hedvig.com',
  data: {
    street: 'Storgatan 1',
    zipCode: '12345',
    livingSpace: 23,
    numberCoInsured: 1,
    subType: ApartmentType.Rent,
  },
}

export const SwedishApartment: React.FC<WithFormikProps> = ({ formik }) => {
  return (
    <>
      <InputField
        label="Number of co-insured"
        placeholder="0"
        type="number"
        {...formik.getFieldProps('data.numberCoInsured')}
      />
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
        placeholder="12345"
        {...formik.getFieldProps('data.zipCode')}
      />
      <InputField
        label="Type"
        options={[
          { label: 'Brf', value: ApartmentType.Brf },
          { label: 'Rent', value: ApartmentType.Rent },
          { label: 'Brf (student)', value: ApartmentType.StudentBrf },
          { label: 'Rent (student)', value: ApartmentType.StudentRent },
        ]}
        {...formik.getFieldProps('data.subType')}
      />
      <InputField
        label="Current Insurer (optional)"
        placeholder=""
        {...formik.getFieldProps('currentInsurer')}
      />
    </>
  )
}

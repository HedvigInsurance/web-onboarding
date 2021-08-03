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
  swedishApartment: {
    street: 'Storgatan 1',
    zipCode: '12345',
    livingSpace: 23,
    householdSize: 1,
    type: ApartmentType.Rent,
  },
}

export const SwedishApartment: React.FC<WithFormikProps> = ({ formik }) => {
  return (
    <>
      <InputField
        label="Household size"
        placeholder="1"
        type="number"
        {...formik.getFieldProps('swedishApartment.householdSize')}
      />
      <InputField
        label="Living space"
        placeholder="23"
        type="number"
        {...formik.getFieldProps('swedishApartment.livingSpace')}
      />
      <InputField
        label="Street"
        placeholder="Gulebøjsveien 1"
        {...formik.getFieldProps('swedishApartment.street')}
      />
      <InputField
        label="Zip code"
        placeholder="12345"
        {...formik.getFieldProps('swedishApartment.zipCode')}
      />
      <InputField
        label="Type"
        options={[
          { label: 'Brf', value: ApartmentType.Brf },
          { label: 'Rent', value: ApartmentType.Rent },
          { label: 'Brf (student)', value: ApartmentType.StudentBrf },
          { label: 'Rent (student)', value: ApartmentType.StudentRent },
        ]}
        {...formik.getFieldProps('swedishApartment.type')}
      />
      <InputField
        label="Current Insurer (optional)"
        placeholder=""
        {...formik.getFieldProps('currentInsurer')}
      />
    </>
  )
}

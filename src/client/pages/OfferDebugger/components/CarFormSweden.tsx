import React from 'react'
import { InputField } from 'components/inputs'
import { WithFormikProps } from './QuoteData'

export const initialSeCarValues = {
  firstName: 'Sven',
  lastName: 'Svensson',
  birthDate: '1995-09-29',
  ssn: '199509291234',
  startDate: '',
  email: 'sven.svensson@hedvig.com',
  data: {
    registrationNumber: 'ABC001',
    mileage: 1000,
    street: 'Malmskillnadsgtan 32',
    zipCode: '11151',
    city: 'Stockholm',
  },
}

export const SwedishCar = ({ formik }: WithFormikProps) => {
  return (
    <>
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
        label="City"
        placeholder="Stockholm"
        {...formik.getFieldProps('data.city')}
      />
      <InputField
        label="Registration number"
        placeholder="ABC123"
        {...formik.getFieldProps('data.registrationNumber')}
      />
      <InputField
        label="Mileage"
        placeholder="1000"
        type="number"
        {...formik.getFieldProps('data.mileage')}
      />
    </>
  )
}

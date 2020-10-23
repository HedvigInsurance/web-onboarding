import React from 'react'
import { InputField } from 'components/inputs'
import { WithFormikProps } from './Offer'

export const initialDkHomeValues = {
  firstName: 'Helle',
  lastName: 'Hansen',
  currentInsurer: '',
  birthDate: '1988-08-08',
  ssn: '8808081234',
  startDate: '',
  email: 'helle.hansen@hedvig.com',
  danishHomeContents: {
    coInsured: 0,
    livingSpace: 34,
    street: 'Nørrebrogade 50',
    zipCode: '1234',
  },
}

export const DanishHome: React.FC<WithFormikProps> = ({ formik }) => {
  return (
    <>
      <InputField
        label="Co-insured"
        placeholder="1"
        type="number"
        {...formik.getFieldProps('danishHomeContents.coInsured')}
      />
      <InputField
        label="Living space"
        placeholder="34"
        type="number"
        {...formik.getFieldProps('danishHomeContents.livingSpace')}
      />
      <InputField
        label="Street"
        placeholder="Nørrebrogade 50"
        {...formik.getFieldProps('danishHomeContents.street')}
      />
      <InputField
        label="Zip code"
        placeholder="2200"
        {...formik.getFieldProps('danishHomeContents.zipCode')}
      />
    </>
  )
}

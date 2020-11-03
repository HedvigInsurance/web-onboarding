import React from 'react'
import { Field } from 'formik'
import { DanishHomeContentsType } from 'data/graphql'
import { InputField } from 'components/inputs'
import { WithFormikProps } from './Offer'

export const initialDkHomeValues = {
  firstName: 'Helle',
  lastName: 'Hansen',
  currentInsurer: '',
  birthDate: '1988-08-08',
  ssn: '1408300921',
  startDate: '',
  email: 'helle.hansen@hedvig.com',
  danishHomeContents: {
    coInsured: 0,
    livingSpace: 34,
    street: 'Nørrebrogade 50',
    zipCode: '1234',
    type: DanishHomeContentsType.Rent,
    isStudent: false,
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
      <InputField
        label="Type"
        options={[
          { label: 'Own', value: DanishHomeContentsType['Rent'] },
          { label: 'Rent', value: DanishHomeContentsType['Own'] },
        ]}
        {...formik.getFieldProps('danishHomeContents.type')}
      />
      <div style={{ paddingBottom: '2rem', fontSize: '1.25rem' }}>
        <label>
          <Field type="checkbox" name="danishHomeContents.isStudent" />
          {"I'm a student"}
        </label>
      </div>
    </>
  )
}

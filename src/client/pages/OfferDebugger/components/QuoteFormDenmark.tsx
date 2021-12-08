import React from 'react'
import { Field } from 'formik'
import { DanishHomeContentsType } from 'data/graphql'
import { InputField } from 'components/inputs'
import { WithFormikProps } from './QuoteData'

export const initialDkHomeValues = {
  firstName: 'Helle',
  lastName: 'Hansen',
  birthDate: '1988-08-08',
  startDate: '',
  email: 'helle.hansen@hedvig.com',
  data: {
    numberCoInsured: 0,
    livingSpace: 34,
    street: 'Theodore Roosevelts Vej 1',
    floor: '2',
    apartment: 'tv',
    zipCode: '2100',
    subType: DanishHomeContentsType.Own,
    isStudent: false,
  },
}

export const DanishQuote: React.FC<WithFormikProps> = ({ formik }) => {
  return (
    <>
      <InputField
        label="Co-insured"
        placeholder="1"
        type="number"
        {...formik.getFieldProps('data.numberCoInsured')}
      />
      <InputField
        label="Living space"
        placeholder="34"
        type="number"
        {...formik.getFieldProps('data.livingSpace')}
      />
      <InputField
        label="Street"
        placeholder="Theodore Roosevelts Vej 1"
        {...formik.getFieldProps('data.street')}
      />
      <InputField
        label="Floor"
        placeholder="2"
        {...formik.getFieldProps('data.floor')}
      />
      <InputField
        label="Apartment"
        placeholder="tv"
        {...formik.getFieldProps('data.apartment')}
      />
      <InputField
        label="Zip code"
        placeholder="2100"
        {...formik.getFieldProps('data.zipCode')}
      />
      <InputField
        label="Type"
        options={[
          { label: 'Own', value: DanishHomeContentsType['Own'] },
          { label: 'Rent', value: DanishHomeContentsType['Rent'] },
        ]}
        {...formik.getFieldProps('data.subType')}
      />
      <div style={{ paddingBottom: '2rem', fontSize: '1.25rem' }}>
        <label>
          <Field type="checkbox" name="data.isStudent" />
          {"I'm a student"}
        </label>
      </div>
    </>
  )
}

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
  danishHomeContents: {
    coInsured: 0,
    livingSpace: 34,
    street: 'Willemoesgade 4, 5. th',
    zipCode: '2100',
    type: DanishHomeContentsType.Own,
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
        placeholder="Willemoesgade 4, 5. th"
        {...formik.getFieldProps('danishHomeContents.street')}
      />
      <InputField
        label="Zip code"
        placeholder="2100"
        {...formik.getFieldProps('danishHomeContents.zipCode')}
      />
      <InputField
        label="Type"
        options={[
          { label: 'Own', value: DanishHomeContentsType['Own'] },
          { label: 'Rent', value: DanishHomeContentsType['Rent'] },
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

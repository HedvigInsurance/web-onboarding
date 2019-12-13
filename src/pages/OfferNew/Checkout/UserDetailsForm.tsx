import { Form, Formik } from 'formik'
import { TextInput } from 'new-components/inputs/index'
import React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'

interface FormProps {
  email: string
}
export const UserDetailsForm: React.FC = () => {
  const textKeys = useTextKeys()

  return (
    <Formik<FormProps>
      initialValues={{ email: '' }}
      onSubmit={() => {
        // todo
      }}
    >
      {({ values }) => (
        <Form>
          <TextInput
            label={textKeys.CHECKOUT_EMAIL_LABEL()}
            placeholder={textKeys.CHECKOUT_EMAIL_PLACEHOLDER()}
            name="email"
            value={values.email}
            type="email"
          />
        </Form>
      )}
    </Formik>
  )
}

import { Form, Formik } from 'formik'
import { TextInput } from 'new-components/inputs'
import React from 'react'

interface FormProps {
  email: string
}
export const UserDetailsForm: React.FC = () => (
  <Formik<FormProps>
    initialValues={{ email: '' }}
    onSubmit={() => {
      // todo
    }}
  >
    {({ values }) => (
      <Form>
        <TextInput
          label="E-mail"
          placeholder="din.epost@här.nu"
          name="email"
          value={values.email}
        />
      </Form>
    )}
  </Formik>
)

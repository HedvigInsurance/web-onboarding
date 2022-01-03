import React from 'react'
import { withFormik } from 'storybook-formik'
import { InputField } from './index'

const mockInputData = [
  {
    label: 'Email',
    name: 'Email',
    type: 'text',
    autoComplete: 'off',
    placeholder: 'email@email.com',
    touched: false,
    helperText: 'Helper Text',
  },
  {
    label: 'Name',
    name: 'Name',
    type: 'text',
    autoComplete: 'off',
    placeholder: 'Error Input',
    touched: false,
    errors: 'Error Message',
  },
  {
    label: 'Test input',
    name: 'Test Input',
    type: 'text',
    autoComplete: 'off',
    placeholder: 'Disabled input',
    touched: false,
    disabled: true,
    helperText: 'Helper Text',
  },
]

export default {
  title: 'Components/InputField/InputCollection',
  component: InputField,
  decorators: [withFormik],
  parameters: {
    backgrounds: { default: 'gray100' },
    formik: {
      initialValues: {
        foo: 'Some value',
      },
    },
  },
}

export const Default = () => (
  <div style={{ maxWidth: '320px' }}>
    {mockInputData.map((item, index) => (
      <InputField key={index} {...item} />
    ))}
  </div>
)

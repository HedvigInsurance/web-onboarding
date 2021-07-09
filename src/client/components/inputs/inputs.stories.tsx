import React from 'react'
import { withFormik } from 'storybook-formik'
import { Story } from '@storybook/react'
import { InputField, TextInputProps } from './index'

export default {
  title: 'Components/InputField',
  component: InputField,
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        foo: 'Some value',
      },
    },
  },
  args: {
    label: '',
    name: 'foo',
    type: 'text',
    autoComplete: 'off',
    placeholder: 'Some placeholder',
    touched: false,
    errors: '',
  },
}

const Template: Story<TextInputProps> = (args) => (
  <div style={{ maxWidth: '320px' }}>
    <InputField {...args} />
  </div>
)

export const Light = Template.bind({})
Light.parameters = {
  backgrounds: {
    default: 'gray100',
  },
}

export const Dark = Template.bind({})
Dark.args = {
  variant: 'dark',
}

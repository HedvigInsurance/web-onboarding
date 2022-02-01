import React from 'react'
import { withFormik } from 'storybook-formik'
import { Story } from '@storybook/react'
import { InputField, TextInputProps } from './index'

export default {
  title: 'Components/InputField',
  component: InputField,
  decorators: [withFormik],
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
  args: {
    label: 'Label',
    disabled: false,
    helperText: '',
    errors: '',
    placeholder: 'Placeholder',
    name: 'foo',
    type: 'text',
    autoComplete: 'off',
    touched: false,
  },
}

const Template: Story<TextInputProps> = (args) => (
  <div style={{ maxWidth: '320px' }}>
    <InputField {...args} />
  </div>
)

export const Default = Template.bind({})

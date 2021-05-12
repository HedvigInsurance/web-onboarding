import { text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { withFormik } from 'storybook-formik'
import { InputField } from './index'

export default {
  title: 'Components/InputField',
  component: InputField,
  decorators: [withFormik, withKnobs],
  parameters: {
    formik: {
      initialValues: {
        foo: 'Some value',
      },
    },
  },
}

export const Light = () => (
  <div style={{ maxWidth: '320px', margin: '40px auto' }}>
    <InputField
      label={text('Label', '')}
      name="foo"
      type="text"
      autoComplete="off"
      placeholder=""
      touched={false}
      errors={text('Error text', '')}
    />
  </div>
)

export const Dark = () => (
  <div style={{ maxWidth: '320px', margin: '40px auto' }}>
    <InputField
      label={text('Label', '')}
      name="foo"
      type="text"
      autoComplete="off"
      placeholder=""
      touched={false}
      errors={text('Error text', '')}
      variant="dark"
    />
  </div>
)

Light.story = {
  backgrounds: {
    default: 'gray100',
  },
}

Dark.story = {
  parameters: {
    backgrounds: {
      default: 'gray900',
    },
  },
}

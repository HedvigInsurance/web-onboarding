import { colorsV3 } from '@hedviginsurance/brand'
import { text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { withFormik } from 'storybook-formik'
import { InputField } from './'

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
  parameters: {
    backgrounds: [{ name: 'gray100', value: colorsV3.gray100, default: true }],
  },
}

Dark.story = {
  parameters: {
    backgrounds: [{ name: 'gray900', value: colorsV3.gray900, default: true }],
  },
}

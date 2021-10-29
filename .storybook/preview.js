import React from 'react'
import { GlobalCss } from '../src/client/utils/globalStyles'
import { colorsV3 } from '@hedviginsurance/brand'

export const parameters = {
  backgrounds: {
    default: 'gray900',
    values: [
      { name: 'gray900', value: colorsV3.gray900 },
      { name: 'gray100', value: colorsV3.gray100 },
    ],
  },
  paddings: {
    values: [
      { name: 'Small', value: '16px' },
      { name: 'Medium', value: '32px' },
      { name: 'Large', value: '64px' },
    ],
    default: 'Medium',
  },
  layout: 'centered',
}

export const decorators = [
  (Story) => (
    <>
      <GlobalCss />
      <Story />
    </>
  ),
]

import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { LoadingDots } from './LoadingDots'

export default {
  title: 'Components/LoadingDots',
  component: LoadingDots,
  parameters: {
    backgrounds: [{ name: 'gray900', value: colorsV3.gray900, default: true }],
    paddings: [{ name: 'Large', value: '64px', default: true }],
  },
}

export const Default = () => <LoadingDots />

import React from 'react'
import { LoadingDots } from './LoadingDots'

export default {
  title: 'Components/LoadingDots',
  component: LoadingDots,
  parameters: {
    paddings: [{ name: 'Large', value: '64px', default: true }],
  },
}

export const Default = () => <LoadingDots />

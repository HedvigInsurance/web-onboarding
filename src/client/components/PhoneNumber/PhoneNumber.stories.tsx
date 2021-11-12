import React from 'react'
import { PhoneNumber } from './PhoneNumber'

export default {
  title: 'Offer/PhoneNumber',
  component: PhoneNumber,
  parameters: {
    paddings: [{ name: 'Large', value: '64px', default: true }],
  },
}

export const Default = () => <PhoneNumber color="white" />

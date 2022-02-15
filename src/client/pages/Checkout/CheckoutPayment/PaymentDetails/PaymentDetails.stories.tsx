import React from 'react'
import { Story } from '@storybook/react'
import { colorsV3 } from '@hedviginsurance/brand'
import { PaymentDetails } from './PaymentDetails'

export default {
  title: 'Checkout Details/Payment Details',
  component: PaymentDetails,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

const Template: Story = () => <PaymentDetails></PaymentDetails>

export const Default = Template.bind({})

import React from 'react'
import { Story } from '@storybook/react'
import { MemoryRouter } from 'react-router'

import { BackButton } from './BackButton'

export default {
  title: 'Components/Checkout/BackButton',
  component: BackButton,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

const Template: Story = () => (
  <MemoryRouter initialEntries={['/se-en/new-member/checkout/details']}>
    <BackButton />
  </MemoryRouter>
)

export const Default = Template.bind({})

import React from 'react'
import { Story, Meta } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import { Footer, Props as FooterProps } from './Footer'

const storyMeta: Meta<FooterProps> = {
  title: 'Components/Checkout/Footer',
  component: Footer,
  args: {
    buttonText: 'Continue to payment',
    buttonOnClick: () => {
      console.log('👉 Click!')
    },
  },
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

export default storyMeta

const Template: Story<FooterProps> = (args) => (
  <MemoryRouter initialEntries={['/se-en/new-member/checkout/details']}>
    <Footer {...args} />
  </MemoryRouter>
)

export const Default = Template.bind({})

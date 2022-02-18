import React from 'react'
import { Meta } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { TextKeyProvider } from 'utils/textKeys'
import { LocaleLabel } from 'l10n/locales'

import { PaymentDetails } from './PaymentDetails'

type StoryProps = {
  localePath: LocaleLabel
}
const storyMeta: Meta<StoryProps> = {
  title: 'Checkout Details/Payment Details',
  component: PaymentDetails,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

export default storyMeta

export const Default = () => (
  <MemoryRouter initialEntries={['/no-en/new-member']}>
    <TextKeyProvider locale="en_NO">
      <PaymentDetails />
    </TextKeyProvider>
  </MemoryRouter>
)

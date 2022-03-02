import React from 'react'
import { Meta } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { TextKeyProvider } from 'utils/textKeys'
import { LocaleLabel } from 'l10n/locales'

import { ContactInformation } from './ContactInformation'

type StoryProps = {
  localePath: LocaleLabel
}
const storyMeta: Meta<StoryProps> = {
  title: 'Checkout Details/Contact Information',
  component: ContactInformation,
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
      <ContactInformation />
    </TextKeyProvider>
  </MemoryRouter>
)

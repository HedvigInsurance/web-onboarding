import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TextKeyProvider } from 'utils/textKeys'
import { PhoneNumber } from './PhoneNumber'

export default {
  title: 'Offer/PhoneNumber',
  component: PhoneNumber,
  parameters: {
    paddings: [{ name: 'Large', value: '64px', default: true }],
  },
}

export const Default = () => (
  <MemoryRouter initialEntries={['/se/new-member']}>
    <TextKeyProvider locale="sv_SE">
      <PhoneNumber color="white" />
    </TextKeyProvider>
  </MemoryRouter>
)

import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TextKeyProvider } from 'utils/textKeys'
import { CallCenterPhoneNumber } from './CallCenterPhoneNumber'

export default {
  title: 'Offer/CallCenterPhoneNumber',
  component: CallCenterPhoneNumber,
  parameters: {
    paddings: [{ name: 'Large', value: '64px', default: true }],
  },
}

export const Default = () => (
  <MemoryRouter initialEntries={['/se/new-member']}>
    <TextKeyProvider locale="sv_SE">
      <CallCenterPhoneNumber color="white" onClick={(status) => status} />
    </TextKeyProvider>
  </MemoryRouter>
)

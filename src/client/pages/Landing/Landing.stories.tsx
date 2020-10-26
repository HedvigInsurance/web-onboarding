import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { TextKeyProvider } from 'utils/textKeys'
import { Landing } from './Landing'

export default {
  title: 'Landing',
  component: Landing,
}

export const Default = () => (
  <MemoryRouter initialEntries={['/se/new-member']}>
    <HelmetProvider>
      <TextKeyProvider locale="sv_SE">
        <Landing language="se" />
      </TextKeyProvider>
    </HelmetProvider>
  </MemoryRouter>
)

import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { TextKeyProvider } from 'utils/textKeys'
import { Landing } from './Landing'

export default {
  title: 'Landing',
  component: Landing,
}

export const SwedenSE = () => (
  <MemoryRouter initialEntries={['/se/new-member']}>
    <HelmetProvider>
      <TextKeyProvider locale="sv_SE">
        <Landing language="se" />
      </TextKeyProvider>
    </HelmetProvider>
  </MemoryRouter>
)

export const SwedenEN = () => (
  <MemoryRouter initialEntries={['/se-en/new-member']}>
    <HelmetProvider>
      <TextKeyProvider locale="en_SE">
        <Landing language="se-en" />
      </TextKeyProvider>
    </HelmetProvider>
  </MemoryRouter>
)

export const NorwayNO = () => (
  <MemoryRouter initialEntries={['/no/new-member']}>
    <HelmetProvider>
      <TextKeyProvider locale="nb_NO">
        <Landing language="no" />
      </TextKeyProvider>
    </HelmetProvider>
  </MemoryRouter>
)

export const NorwayEN = () => (
  <MemoryRouter initialEntries={['/no-en/new-member']}>
    <HelmetProvider>
      <TextKeyProvider locale="en_NO">
        <Landing language="no-en" />
      </TextKeyProvider>
    </HelmetProvider>
  </MemoryRouter>
)

export const DenmarkDK = () => (
  <MemoryRouter initialEntries={['/dk/new-member']}>
    <HelmetProvider>
      <TextKeyProvider locale="da_DK">
        <Landing language="dk" />
      </TextKeyProvider>
    </HelmetProvider>
  </MemoryRouter>
)

export const DenmarkEN = () => (
  <MemoryRouter initialEntries={['/dk-en/new-member']}>
    <HelmetProvider>
      <TextKeyProvider locale="en_DK">
        <Landing language="dk-en" />
      </TextKeyProvider>
    </HelmetProvider>
  </MemoryRouter>
)

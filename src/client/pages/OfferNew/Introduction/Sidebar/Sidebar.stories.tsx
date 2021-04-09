import React from 'react'
import { action } from '@storybook/addon-actions'
import { MemoryRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import {
  dkHomeContentAccident,
  dkHomeContentAccidentTravel,
  dkHomeContentOwn,
  noCombo,
  seApartementBrf,
} from 'utils/testData/offerDataMock'
import { TextKeyProvider } from 'utils/textKeys'
import { Sidebar } from '.'

export default {
  title: 'Offer/Sidebar',
  component: Sidebar,
  parameters: {
    paddings: [{ name: 'Medium', value: '16px', default: true }],
  },
}

export const SEApartmentBrf = () => {
  return (
    <MockedProvider>
      <MemoryRouter initialEntries={['/se/new-member/offer']}>
        <TextKeyProvider locale="sv_SE">
          <Sidebar
            offerData={seApartementBrf}
            onCheckoutOpen={action('onCheckoutOpen')}
            refetchOfferData={(...args: any[]) => {
              action('refetch')(...args)
              return Promise.resolve()
            }}
          />
        </TextKeyProvider>
      </MemoryRouter>
    </MockedProvider>
  )
}

export const NOCombo = () => {
  return (
    <MockedProvider>
      <MemoryRouter initialEntries={['/no/new-member/offer']}>
        <TextKeyProvider locale="nb_NO">
          <Sidebar
            offerData={noCombo}
            onCheckoutOpen={action('onCheckoutOpen')}
            refetchOfferData={(...args: any[]) => {
              action('refetch')(...args)
              return Promise.resolve()
            }}
          />
        </TextKeyProvider>
      </MemoryRouter>
    </MockedProvider>
  )
}

export const DKHomeContent = () => {
  return (
    <MockedProvider>
      <MemoryRouter initialEntries={['/dk/new-member/offer']}>
        <TextKeyProvider locale="da_DK">
          <Sidebar
            offerData={dkHomeContentOwn}
            onCheckoutOpen={action('onCheckoutOpen')}
            refetchOfferData={(...args: any[]) => {
              action('refetch')(...args)
              return Promise.resolve()
            }}
          />
        </TextKeyProvider>
      </MemoryRouter>
    </MockedProvider>
  )
}

export const DKHomeContentAccident = () => {
  return (
    <MockedProvider>
      <MemoryRouter initialEntries={['/dk/new-member/offer']}>
        <TextKeyProvider locale="da_DK">
          <Sidebar
            offerData={dkHomeContentAccident}
            onCheckoutOpen={action('onCheckoutOpen')}
            refetchOfferData={(...args: any[]) => {
              action('refetch')(...args)
              return Promise.resolve()
            }}
          />
        </TextKeyProvider>
      </MemoryRouter>
    </MockedProvider>
  )
}

export const DKHomeContentAccidentTravel = () => {
  return (
    <MockedProvider>
      <MemoryRouter initialEntries={['/dk/new-member/offer']}>
        <TextKeyProvider locale="da_DK">
          <Sidebar
            offerData={dkHomeContentAccidentTravel}
            onCheckoutOpen={action('onCheckoutOpen')}
            refetchOfferData={(...args: any[]) => {
              action('refetch')(...args)
              return Promise.resolve()
            }}
          />
        </TextKeyProvider>
      </MemoryRouter>
    </MockedProvider>
  )
}

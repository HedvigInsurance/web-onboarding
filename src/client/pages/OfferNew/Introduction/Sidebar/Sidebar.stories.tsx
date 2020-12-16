import React, { useRef } from 'react'
import { action } from '@storybook/addon-actions'
import { MemoryRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import {
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
  const ref = useRef<HTMLDivElement>(null)
  return (
    <MockedProvider>
      <MemoryRouter initialEntries={['/se/new-member/offer']}>
        <TextKeyProvider locale="sv_SE">
          <Sidebar
            ref={ref}
            sticky={false}
            offerData={seApartementBrf}
            onCheckoutOpen={action('onCheckoutOpen')}
            refetch={(...args: any[]) => {
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
  const ref = useRef<HTMLDivElement>(null)
  return (
    <MockedProvider>
      <MemoryRouter initialEntries={['/no/new-member/offer']}>
        <TextKeyProvider locale="nb_NO">
          <Sidebar
            ref={ref}
            sticky={false}
            offerData={noCombo}
            onCheckoutOpen={action('onCheckoutOpen')}
            refetch={(...args: any[]) => {
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
  const ref = useRef<HTMLDivElement>(null)
  return (
    <MockedProvider>
      <MemoryRouter initialEntries={['/no/new-member/offer']}>
        <TextKeyProvider locale="nb_NO">
          <Sidebar
            ref={ref}
            sticky={false}
            offerData={dkHomeContentOwn}
            onCheckoutOpen={action('onCheckoutOpen')}
            refetch={(...args: any[]) => {
              action('refetch')(...args)
              return Promise.resolve()
            }}
          />
        </TextKeyProvider>
      </MemoryRouter>
    </MockedProvider>
  )
}

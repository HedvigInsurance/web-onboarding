import React, { useRef } from 'react'
import { action } from '@storybook/addon-actions'
import { MemoryRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { seApartementBrf } from 'utils/testData/offerDataMock'
import { TextKeyProvider } from 'utils/textKeys'
import { Sidebar } from '.'

export default {
  title: 'Offer/Sidebar',
  component: Sidebar,
  parameters: {
    paddings: [{ name: 'Medium', value: '48px', default: true }],
  },
}

export const Defualt = () => {
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

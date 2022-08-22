import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { TextKeyProvider } from 'utils/textKeys'
import { Selector } from './Selector'

export default {
  title: 'Offer/ProductSelector',
  component: Selector,
  parameters: {
    backgrounds: { default: 'gray100' },
  },
} as ComponentMeta<typeof Selector>

export const Default: ComponentStory<typeof Selector> = () => {
  return (
    <BrowserRouter>
      <TextKeyProvider locale="en_NO">
        <Selector
          standaloneProducts={[
            {
              id: 'home-insurance',
              name: 'Home Insurance',
              description: 'Coverage for your house or apartment contents',
              price: '218 NOK/mth',
              image: 'https://via.placeholder.com/400x300.png',
            },
            {
              id: 'house-insurance',
              name: 'House Insurance',
              description: 'Coverage for your house and buildings',
              price: '400 NOK/mth',
              image: 'https://via.placeholder.com/400x300.png',
            },
          ]}
          additionalProducts={[
            {
              id: 'accident-insurance',
              name: 'Accident Insurance',
              description: 'Extra coverage in case of an accident',
              price: '39 NOK/mth',
              image: 'https://via.placeholder.com/400x300.png',
            },
            {
              id: 'travel-insurance',
              name: 'Travel Insurance',
              description: 'Covers you and your family when you are traveling',
              price: '39 NOK/mth',
              image: 'https://via.placeholder.com/400x300.png',
            },
          ]}
        />
      </TextKeyProvider>
    </BrowserRouter>
  )
}

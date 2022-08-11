import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProductSelector } from './ProductSlector'

export default {
  title: 'Offer/ProductSelector',
  component: ProductSelector,
  parameters: {
    backgrounds: { default: 'gray100' },
  },
} as ComponentMeta<typeof ProductSelector>

export const Default: ComponentStory<typeof ProductSelector> = () => {
  return (
    <ProductSelector
      mainProducts={[
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
  )
}

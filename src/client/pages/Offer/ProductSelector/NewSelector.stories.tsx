import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { TextKeyProvider } from 'utils/textKeys'
import { NewSelector } from './NewSelector'

export default {
  title: 'Offer/NewProductSelector',
  component: NewSelector,
  parameters: {
    backgrounds: { default: 'gray100' },
  },
} as ComponentMeta<typeof NewSelector>

export const Default: ComponentStory<typeof NewSelector> = () => {
  return (
    <BrowserRouter>
      <TextKeyProvider locale="en_DK">
        <NewSelector
          products={[
            {
              id: 'home-insurance',
              name: 'Home Insurance',
              description: 'Coverage for your house or apartment contents',
              price: '218 DK/mth',
            },
            {
              id: 'house-insurance',
              name: 'House Insurance',
              description: 'Coverage for your house and buildings',
              price: '400 DK/mth',
            },
            {
              id: 'accident-insurance',
              name: 'Accident Insurance',
              description: 'Extra coverage in case of an accident',
              price: '39 DK/mth',
            },
            {
              id: 'travel-insurance',
              name: 'Travel Insurance',
              description: 'Covers you and your family when you are traveling',
              price: '39 DK/mth',
            },
          ]}
        />
      </TextKeyProvider>
    </BrowserRouter>
  )
}

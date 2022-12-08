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
      <TextKeyProvider locale="en_DK">
        <Selector
          products={[
            {
              id: 'DK_HOME_CONTENT_OWN',
              name: 'Home Insurance',
              description: 'Coverage for your house or apartment contents',
              price: '218 DK/mth',
            },
            {
              id: 'DK_HOUSE',
              name: 'House Insurance',
              description: 'Coverage for your house and buildings',
              price: '400 DK/mth',
            },
            {
              id: 'DK_TRAVEL',
              name: 'Travel Insurance',
              description: 'Covers you and your family when you are traveling',
              price: '39 DK/mth',
            },
            {
              id: 'DK_ACCIDENT',
              name: 'Accident Insurance',
              description: 'Extra coverage in case of an accident',
              price: '39 DK/mth',
            },
          ]}
        />
      </TextKeyProvider>
    </BrowserRouter>
  )
}

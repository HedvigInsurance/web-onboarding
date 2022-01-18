import { Story } from '@storybook/react'
import React from 'react'
import { possibleVariationsApartmentSE } from 'src/client/utils/testData/possibleVariationsMock'
import { OfferQuote } from '../../OfferNew/types'
import { YourHome } from './YourHome'

export default {
  title: 'Components/YourHome',
  component: YourHome,
  parameters: {
    backgrounds: {
      default: 'gray100',
    },
  },
}

type StoryProps = {
  mainQuote: OfferQuote
}

const Template: Story<StoryProps> = (mainQuote) => (
  <YourHome mainQuote={possibleVariationsApartmentSE[1]} />
)

export const Default = Template.bind({})

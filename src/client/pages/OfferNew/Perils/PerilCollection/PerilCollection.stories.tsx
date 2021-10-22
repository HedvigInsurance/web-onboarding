import React from 'react'
import { action } from '@storybook/addon-actions'
import { perilsMock } from 'utils/testData/offerDataMock'
import { PerilCollection } from '.'

export default {
  title: 'Offer/Perils/PerilCollection',
  component: PerilCollection,
  parameters: {
    paddings: [{ name: 'Medium', value: '16px', default: true }],
  },
}

export const Default = () => {
  return (
    <PerilCollection
      perils={perilsMock}
      setCurrentPeril={(args) => action('setCurrentPeril')(args)}
      setIsShowingPeril={(args) => action('setIsShowingPeril')(args)}
    />
  )
}

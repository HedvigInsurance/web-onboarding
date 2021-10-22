import React from 'react'
import { action } from '@storybook/addon-actions'
import { MemoryRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { perilsMock } from 'utils/testData/offerDataMock'
import { TextKeyProvider } from 'utils/textKeys'
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

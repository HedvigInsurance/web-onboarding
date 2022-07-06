import React from 'react'
import { InsuranceCost, InsuranceDataCollection } from 'src/client/data/graphql'
import { TextKeyProvider } from 'utils/textKeys'
import { Compare } from './Compare'

export default {
  title: 'Offer/Compare',
  component: Compare,
  parameters: {
    backgrounds: { default: 'gray900' },
    paddings: [{ name: 'Medium', value: '48px', default: true }],
  },
}

const costMock: InsuranceCost = {
  __typename: 'InsuranceCost',
  monthlyGross: {
    amount: '119.00',
    currency: 'SEK',
  },
  monthlyDiscount: {
    amount: '10.00',
    currency: 'SEK',
  },
  monthlyNet: {
    amount: '109.00',
    currency: 'SEK',
  },
}

const insuranceDataMock: InsuranceDataCollection = {
  insuranceName: 'Trygg Hansa',
  insuranceProvider: 'TRYGGHANSA',
  monthlyPremium: {
    amount: '220',
    currency: 'SEK',
  },
}

export const Default = () => (
  <TextKeyProvider locale="en">
    <div style={{ maxWidth: '770px' }}>
      <Compare insuranceDataCollection={insuranceDataMock} cost={costMock} />
    </div>
  </TextKeyProvider>
)

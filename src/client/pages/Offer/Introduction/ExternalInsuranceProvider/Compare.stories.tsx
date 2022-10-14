import React from 'react'
import { MemoryRouter } from 'react-router'
import { InsuranceCost, InsuranceDataCollection } from 'data/graphql'
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
  insuranceProviderDisplayName: 'Trygg Hansa',
  renewalDate: '2024-10-03',
  monthlyPremium: {
    amount: '220',
    currency: 'SEK',
  },
}

export const Default = () => (
  <MemoryRouter initialEntries={['/se-en/new-member']}>
    <TextKeyProvider locale="en">
      <div style={{ maxWidth: '770px' }}>
        <Compare
          insuranceDataCollection={insuranceDataMock}
          cost={costMock}
          description="Home insurance"
        />
      </div>
    </TextKeyProvider>
  </MemoryRouter>
)

export const CarInsurance = () => (
  <MemoryRouter initialEntries={['/se-en/new-member']}>
    <TextKeyProvider locale="sv_SE">
      <div style={{ maxWidth: '770px' }}>
        <Compare
          insuranceDataCollection={carInsuranceDataMock}
          cost={costMock}
          description="Halvförsäkring"
        />
      </div>
    </TextKeyProvider>
  </MemoryRouter>
)

const carInsuranceDataMock: InsuranceDataCollection = {
  insuranceName: 'Trygg Hansa',
  insuranceProviderDisplayName: 'Trygg Hansa',
  insuranceProvider: 'TRYGGHANSA',
  renewalDate: '2024-10-03',
  coverage: 'SE_CAR_HALF',
  monthlyPremium: {
    amount: '220',
    currency: 'SEK',
  },
}

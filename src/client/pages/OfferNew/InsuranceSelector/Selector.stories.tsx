import React from 'react'
import { Selector } from './Selector'

const mockInsurances = [
  {
    id: '1',
    name: 'Inbo, Ulykke & Rejse',
    price: 329,
    currency: 'kr/md',
    label: '3-in-1',
    selected: true,
  },
  {
    id: '2',
    name: 'Inbo &  Ulykke',
    price: 279,
    currency: 'kr/md',
    label: '2-in-1',
    selected: false,
  },
  {
    id: '3',
    name: 'Inbo',
    price: 189,
    currency: 'kr/md',
    selected: false,
  },
]

export default {
  title: 'Offer/InsuranceSelector',
  component: Selector,
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

export const Default = () => {
  return <Selector insurances={mockInsurances} onChange={(id) => alert(id)} />
}

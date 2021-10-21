import React from 'react'
import AmountCollection, { AmountItemData } from '.'

export default {
  title: 'Offer/AmountCollection/AmountCollection',
  component: AmountCollection,
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

const ITEMS: Array<AmountItemData> = [
  {
    key: '1',
    label: 'Maksimal sum forsikringen',
    value: '1.000.000 kr.',
  },
  {
    key: '2',
    label: 'Egenandel for all-risk skader',
    value: 'kr 2 000',
  },
  {
    key: '3',
    label: 'Egenandel for naturskader',
    value: 'kr 8 000',
  },
]

export const Default = () => {
  return <AmountCollection items={ITEMS} />
}

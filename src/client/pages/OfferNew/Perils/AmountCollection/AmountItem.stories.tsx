import React from 'react'
import AmountItem from './AmountItem'

export default {
  title: 'Offer/AmountCollection/AmountItem',
  component: AmountItem,
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

export const Default = () => {
  return (
    <AmountItem>
      <AmountItem.Label>Dina saker försäkras till</AmountItem.Label>
      <AmountItem.Value>1 000 000 kr</AmountItem.Value>
    </AmountItem>
  )
}

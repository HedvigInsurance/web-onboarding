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
    <AmountItem tooltip="Alle dine eiendeler er samlet forsikret for opptil 1 million kroner.">
      <AmountItem.Label>Tingene dine er forsikret med</AmountItem.Label>
      <AmountItem.Value>1 000 000 kr</AmountItem.Value>
    </AmountItem>
  )
}

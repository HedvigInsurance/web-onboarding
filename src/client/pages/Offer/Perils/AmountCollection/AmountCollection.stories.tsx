import React from 'react'
import { Grid } from './Grid'
import { AmountItem } from './AmountItem'

export default {
  title: 'Offer/AmountCollection/AmountCollection',
  component: Grid,
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

const ITEMS = [
  {
    key: '1',
    label: 'Maksimal sum forsikringen',
    value: '1.000.000 kr.',
  },
  {
    key: '2',
    label: 'Egenandel for all-risk skader',
    value: 'kr 2 000',
    tooltip:
      'Alle dine eiendeler er samlet forsikret for opptil 1 million kroner.',
  },
  {
    key: '3',
    label: 'Egenandel for naturskader',
    value: 'kr 8 000',
  },
]

export const Default = () => {
  return (
    <Grid>
      {ITEMS.map((item) => (
        <AmountItem key={item.key} tooltip={item.tooltip}>
          <AmountItem.Label>{item.label}</AmountItem.Label>
          <AmountItem.Value>{item.value}</AmountItem.Value>
        </AmountItem>
      ))}
    </Grid>
  )
}

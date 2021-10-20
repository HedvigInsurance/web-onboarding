import React from 'react'
import { Tabs } from './Tabs'
const mockInsurances = [
  {
    id: '1',
    name: 'Hemförsäkring',
    selected: true,
    content: 'one',
  },
  {
    id: '2',
    name: 'Olycksfallsförsäkring',
    selected: false,
    content: 'two ',
  },
  {
    id: '3',
    name: 'Inbo',
    selected: false,
    content: 'three',
  },
]

export default {
  title: 'Offer/Tabs',
  component: Tabs,
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

export const Default = () => {
  const [insurances, setInsurances] = React.useState(mockInsurances)

  const handleOnChange = (id: string) =>
    setInsurances((prev) =>
      prev.map((item) => ({ ...item, selected: item.id === id })),
    )

  return <Tabs items={insurances} onChange={handleOnChange} />
}

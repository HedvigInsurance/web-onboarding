import React from 'react'
import { Tabs } from './Tabs'
const mockInsurances = [
  {
    id: '1',
    name: 'Hemförsäkring',
    selected: true,
  },
  {
    id: '2',
    name: 'Olycksfallsförsäkring',
    selected: false,
  },
  {
    id: '3',
    name: 'Inbo',
    selected: false,
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

  return <Tabs insurances={insurances} onChange={handleOnChange}></Tabs>
}

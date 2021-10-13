import React, { useState } from 'react'
import { Tab } from './Tab'
import { colorsV3 } from '@hedviginsurance/brand'
import { AnimateSharedLayout } from 'framer-motion'
import styled from '@emotion/styled'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const TabGroup = styled.div`
  border-bottom: 1px solid ${colorsV3.gray500};
  display: flex;
  overflow: hidden;
  margin-top: 1rem;
  margin-bottom: 1.25rem;
  margin-right: 1rem;
  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    margin-top: 1rem;
    margin-bottom: 2.5rem;
  }
`
type Props = {
  insurances: {
    id: string
    name: string
  }[]
  onChange: (id: string) => void
}
export const Tabs: React.FC<Props> = ({ insurances }) => {
  const [selected, setSelected] = useState(insurances[0])
  return (
    <TabGroup>
      <AnimateSharedLayout>
        {insurances.map((item, index) => (
          <Tab
            key={index}
            onClick={() => setSelected(item)}
            selected={selected === item}
            name={item.name}
          ></Tab>
        ))}
      </AnimateSharedLayout>
    </TabGroup>
  )
}

import React, { useState } from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import { AnimateSharedLayout } from 'framer-motion'
import styled from '@emotion/styled'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Tab } from './Tab'

const TabList = styled.div`
  box-shadow: 0px 2px 0px ${colorsV3.gray300};
  display: flex;
  margin-bottom: 1.25rem;
  margin-right: 1rem;
  margin-top: 1rem;
  overflow: hidden;
  max-width: 100%;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    margin-bottom: 2.5rem;
    margin-top: 1rem;
    overflow: visible;
  }
`

type Props = {
  insurances: {
    id: string
    name: string
    content?: string
  }[]
  onChange: (id: string) => void
}
export const Tabs: React.FC<Props> = ({ insurances }) => {
  const [selected, setSelected] = useState(insurances[0])
  return (
    <>
      <TabList>
        <AnimateSharedLayout>
          {insurances.map((item, index) => (
            <>
              <Tab
                key={index}
                onClick={() => setSelected(item)}
                selected={selected === item}
                name={item.name}
              />
            </>
          ))}
        </AnimateSharedLayout>
      </TabList>
      {selected.content && <p>{selected.content}</p>}
    </>
  )
}

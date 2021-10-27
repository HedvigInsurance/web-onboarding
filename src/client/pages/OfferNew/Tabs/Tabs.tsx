import React, { useState } from 'react'
import { AnimateSharedLayout } from 'framer-motion'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Tab } from './Tab'

const TabList = styled.div`
  display: flex;
  margin: 1rem 0 1.25rem 0;
  box-shadow: 0px 2px 0px ${colorsV3.gray300};
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    margin: 1rem 1rem 2.5rem 0;
  }
`

const TabPanel = styled.div``

type Props = {
  items: {
    id: string
    name: string
    content: React.ReactNode
  }[]
  onChange: (id: string) => void
}
export const Tabs: React.FC<Props> = ({ items }) => {
  const [selected, setSelected] = useState(items[0])
  return (
    <>
      <TabList
        role="tablist"
        aria-orientation="horizontal"
        aria-label="InsurancePick"
      >
        <AnimateSharedLayout>
          {items.map((item, index) => (
            <Tab
              key={index}
              onClick={() => setSelected(item)}
              selected={selected === item}
              name={item.name}
            />
          ))}
        </AnimateSharedLayout>
      </TabList>
      {selected.content && (
        <TabPanel
          tabIndex={0}
          role="tabpanel"
          id={selected.name}
          aria-labelledby={selected.name}
        >
          {selected.content}
        </TabPanel>
      )}
    </>
  )
}

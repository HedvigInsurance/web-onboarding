import React, { useState, useEffect } from 'react'
import { AnimateSharedLayout } from 'framer-motion'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  MEDIUM_SCREEN_MEDIA_QUERY,
  LARGE_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { Tab } from './Tab'

const TabList = styled.div`
  display: flex;
  margin: 1rem 0 1.25rem 0;
  overflow-y: hidden;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  position: relative;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    margin: 1rem 0 2.5rem 0;
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    overflow: visible;
    width: 100%;
  }
`

const UnderlineBackground = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${colorsV3.gray300};
  position: absolute;
  bottom: 0;
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

  useEffect(() => {
    setSelected(items[0])
  }, [items])

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
        <UnderlineBackground />
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

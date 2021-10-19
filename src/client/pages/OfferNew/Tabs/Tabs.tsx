import React, { useState } from 'react'
import { AnimateSharedLayout } from 'framer-motion'
import styled from '@emotion/styled'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Tab } from './Tab'

const TabList = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
  margin-right: 1rem;
  margin-top: 1rem;
  max-width: 100%;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    margin-bottom: 2.5rem;
    margin-top: 1rem;
  }
`

const TabPanel = styled.div``

type Props = {
  insurances: {
    id: string
    name: string
    content: React.ReactNode
  }[]
  onChange: (id: string) => void
}
export const Tabs: React.FC<Props> = ({ insurances }) => {
  const [selected, setSelected] = useState(insurances[0])
  return (
    <>
      <TabList
        role="tablist"
        aria-orientation="horizontal"
        aria-label="InsurancePick"
      >
        <AnimateSharedLayout>
          {insurances.map((item, index) => (
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

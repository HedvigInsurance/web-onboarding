import React, { createRef } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { UnderlineComponent } from './Underline'

const TabContainer = styled.button<{ selected?: boolean }>`
  background-color: transparent;
  border: 0;
  color: ${({ selected }) => (selected ? colorsV3.gray900 : colorsV3.gray500)};
  cursor: pointer;
  display: flex;
  font-size: 1.25rem;
  line-height: 1.4;
  padding: 0 1rem 0.25rem 0;
  position: relative;
  flex-shrink: 0;

  &:hover {
    color: ${colorsV3.gray900};
  }

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
    line-height: 1.33;
    padding-right: 2.5rem;
  }
`

type Props = {
  onClick: () => void
  selected?: boolean
  name: string
}

export const Tab: React.FC<Props> = ({ onClick, selected, name }) => {
  const ref = createRef<HTMLButtonElement>()
  return (
    <TabContainer
      onClick={onClick}
      selected={selected}
      ref={ref}
      role="tab"
      aria-selected={selected ? 'true' : 'false'}
      aria-controls={name}
      id={name}
      tabIndex={selected ? undefined : -1}
    >
      {name}
      {selected && <UnderlineComponent />}
    </TabContainer>
  )
}

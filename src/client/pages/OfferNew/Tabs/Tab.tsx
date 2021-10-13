import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { UnderlineComponent } from './Underline'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const TabContainer = styled.div<{
  selected?: boolean
  focused?: boolean
}>`
  color: ${({ selected }) => (selected ? colorsV3.gray900 : colorsV3.gray500)};
  cursor: pointer;
  display: flex;
  font-size: 1.25rem;
  line-height: 1.75rem;
  padding-bottom: 0.25rem;
  position: relative;
  text-transform: capitalize;
  margin-right: 1rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
    line-height: 2rem;
    margin-right: 2.5rem;
  }

  &:hover {
    color: ${colorsV3.gray900};
  }
`

type Props = {
  onClick: () => void
  selected?: boolean
  name: string
}

export const Tab: React.FC<Props> = ({ onClick, selected, name }) => {
  const ref = React.useRef<HTMLDivElement>()

  const scroll = () => {
    onClick()
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }

  return (
    <TabContainer
      onClick={() => scroll()}
      selected={selected}
      ref={ref as React.MutableRefObject<HTMLDivElement>}
    >
      {name}
      {selected ? UnderlineComponent : null}
    </TabContainer>
  )
}

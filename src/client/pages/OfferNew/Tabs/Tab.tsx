import React, { createRef } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { UnderlineComponent } from './Underline'

const TabContainer = styled.button<{
  selected?: boolean
  focused?: boolean
}>`
  background-color: transparent;
  border: 0;
  color: ${({ selected }) => (selected ? colorsV3.gray900 : colorsV3.gray500)};
  cursor: pointer;
  display: flex;
  font-size: 1.25rem;
  line-height: 1.4;
  margin-right: 1rem;
  padding: 0 0 0.25rem 0;
  position: relative;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
    line-height: 1.33;
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
  const ref = createRef<HTMLButtonElement>()

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
    <TabContainer onClick={() => scroll()} selected={selected} ref={ref}>
      {name}
      {selected ? UnderlineComponent : null}
    </TabContainer>
  )
}

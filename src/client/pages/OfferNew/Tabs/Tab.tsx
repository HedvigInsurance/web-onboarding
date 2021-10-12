import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { UnderlineComponent } from './Underline'

const TabContainer = styled.div<{ selected?: boolean; focused?: boolean }>`
  border-box: content-box;
  color: ${({ selected }) => (selected ? colorsV3.gray900 : colorsV3.gray500)};
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  line-height: 2rem;
  margin-right: 2.5rem;
  position: relative;
  text-transform: capitalize;

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
  return (
    <TabContainer onClick={onClick} selected={selected}>
      {name}
      {selected ? UnderlineComponent : null}
    </TabContainer>
  )
}

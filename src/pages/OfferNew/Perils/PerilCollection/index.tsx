import styled from '@emotion/styled'
import * as React from 'react'
import { Peril } from '../index'
import { PerilItem } from './PerilItem'

interface Props {
  perils: Peril[]
  setCurrentPeril: (index: number) => void
  setIsShowingPeril: (isShowingPeril: boolean) => void
}

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
`

export const PerilCollection: React.FC<Props> = ({
  perils,
  setCurrentPeril,
  setIsShowingPeril,
}) => (
  <Wrapper>
    {perils.map((peril, perilIndex) => (
      <PerilItem
        key={peril.title}
        title={peril.title}
        icon={peril.icon}
        onClick={() => {
          setCurrentPeril(perilIndex)
          setIsShowingPeril(true)
        }}
      />
    ))}
  </Wrapper>
)

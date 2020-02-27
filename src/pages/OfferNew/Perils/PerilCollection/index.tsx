import styled from '@emotion/styled'
import * as React from 'react'
import { Peril } from '../types'
import { PerilItem } from './PerilItem'

interface Props {
  perils: ReadonlyArray<Peril>
  setCurrentPeril: (index: number) => void
  setIsShowingPeril: (isShowingPeril: boolean) => void
}

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const PerilCollection: React.FC<Props> = ({
  perils,
  setCurrentPeril,
  setIsShowingPeril,
}) => (
  <Wrapper>
    {perils.map((peril, perilIndex) => (
      <PerilItem
        key={peril.title?.toString()}
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

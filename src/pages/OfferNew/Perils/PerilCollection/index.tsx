import styled from '@emotion/styled'
import * as React from 'react'
import { PerilV2 } from 'src/data/graphql'
import { PerilItem } from './PerilItem'

interface Props {
  perils: ReadonlyArray<PerilV2>
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

import styled from '@emotion/styled'
import React from 'react'
import { PerilV2 } from 'data/graphql'
import { PerilItem } from './PerilItem'

interface Props {
  perils: ReadonlyArray<PerilV2>
  setCurrentPeril: (index: number) => void
  setIsShowingPeril: (isShowingPeril: boolean) => void
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -0.5rem;

  @media (min-width: 800px) {
    margin-left: -1rem;
    width: calc(100% + 1rem);
  }

  & > * {
    width: calc(50% - 0.5rem);
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;

    @media (min-width: 800px) {
      width: calc(100% / 3 - 1rem);
      margin-left: 1rem;
      margin-bottom: 1rem;
    }

    @media (min-width: 1200px) {
      width: calc(25% - 1rem);
    }
  }
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

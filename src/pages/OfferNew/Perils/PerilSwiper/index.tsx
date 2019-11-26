import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import SwipeableView from 'react-swipeable-views'
import { Peril } from '../index'
import { PerilItem } from './PerilItem'

const PERILS_PER_SLIDE = 4
const PERILS_PER_ROW = 2

interface Props {
  perils: Peril[]
  setCurrentPeril: (index: number) => void
  setIsShowingPeril: (isShowingPeril: boolean) => void
}

const Wrapper = styled.div``

const PerilItemCollectionSwiper = styled(SwipeableView)`
  padding: 2rem 0;
`

const PerilSlide = styled.div`
  width: 100%;
  height: 100;
  display: flex;
  flex-flow: row wrap;
  background: yellow;
`

const PerilSlideRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`
const chunkArray = (array: any[], size: number) =>
  array.reduce(
    (chunks, _, idx, arr) =>
      idx % size === 0 ? [...chunks, arr.slice(idx, idx + size)] : chunks,
    [],
  ) as Peril[][]

export const PerilSwiper: React.FC<Props> = ({
  perils,
  setCurrentPeril,
  setIsShowingPeril,
}) => {
  const [currentPage, setCurrentPage] = React.useState(0)

  return (
    <Wrapper>
      <PerilItemCollectionSwiper
        resistance
        enableMouseEvents
        slideStyle={{
          display: 'flex',
          width: '100%',
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        {chunkArray(perils, PERILS_PER_SLIDE).map(
          (perilsSlideChunk, slideIndex) => (
            <PerilSlide key={slideIndex}>
              {chunkArray(perilsSlideChunk, PERILS_PER_ROW).map(
                (perilsSlideRowChunk, slideRowIndex) => (
                  <PerilSlideRow key={slideRowIndex}>
                    {perilsSlideRowChunk.map((peril, perilIndex) => (
                      <PerilItem
                        key={peril.title}
                        title={peril.title}
                        icon={peril.icon}
                        onClick={() => {
                          setCurrentPeril(
                            slideIndex * 4 + slideRowIndex * 2 + perilIndex,
                          )
                          setIsShowingPeril(true)
                        }}
                      />
                    ))}
                  </PerilSlideRow>
                ),
              )}
            </PerilSlide>
          ),
        )}
      </PerilItemCollectionSwiper>
    </Wrapper>
  )
}

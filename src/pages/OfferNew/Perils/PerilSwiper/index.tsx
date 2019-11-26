import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import SwipeableView from 'react-swipeable-views'
import { Peril } from '../index'
import { PerilItem } from './PerilItem'

const PERILS_PER_SLIDE = 4
const PERILS_PER_ROW = PERILS_PER_SLIDE / 2

interface Props {
  perils: Peril[]
  setCurrentPeril: (index: number) => void
  setIsShowingPeril: (isShowingPeril: boolean) => void
}

const Wrapper = styled.div``

const PerilItemCollectionSwiper = styled(SwipeableView)`
  padding: 1.5rem 0;
`

const PerilSlide = styled.div`
  width: 100%;
  height: 100;
  display: flex;
  flex-flow: row wrap;
`

const PerilSlideRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const SwiperDots = styled.div`
  width: 100%;
  height: 10px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
`

interface DotProps {
  active: boolean
}

const Dot = styled.div<DotProps>`
  width: 0.25rem;
  height: 0.25rem;
  transform: scale(${(props) => (props.active ? 1.5 : 1)});
  background: ${(props) =>
    props.active ? colorsV2.violet700 : colorsV2.semilightgray};
  border-radius: 50%;
  margin-right: 0.375rem;
  transition: all 0.2s ease-in-out;

  :last-child {
    marign-right: 0;
  }
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
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0)

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
        onChangeIndex={(index) => setCurrentPageIndex(index)}
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
      <SwiperDots>
        {Array.from(
          { length: Math.ceil(perils.length / PERILS_PER_SLIDE) },
          (_, i) => i,
        ).map((i) => (
          <Dot active={i === currentPageIndex} />
        ))}
      </SwiperDots>
    </Wrapper>
  )
}

import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import SwipeableView from 'react-swipeable-views'
import { Peril } from '../types'
import { PerilItem } from './PerilItem'

interface Props {
  perils: ReadonlyArray<Peril>
  setCurrentPeril: (index: number) => void
  setIsShowingPeril: (isShowingPeril: boolean) => void
}

const Wrapper = styled.div<{ extraSpace: number }>`
  width: 100%;

  .swipeable-views-slide {
    transition: transform 300ms;
    transform: translateX(${({ extraSpace }) => extraSpace / 2}px);

    &[aria-hidden='false'] {
      transform: translateX(0);
    }
    &[aria-hidden='false'] + [aria-hidden='true'] {
      transform: translateX(-${({ extraSpace }) => extraSpace / 2}px);
    }
  }
`

const PerilSlide = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
`

const PerilSlideRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 0 -2rem;
  padding-left: 4rem;

  @media (max-width: 420px) {
    margin: 0 -1rem;
    padding-left: 2rem;
  }
`

const SwiperDots = styled.div`
  width: 100%;
  height: 10px;
  display: flex;
  flex-direction: row;
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

const chunkArray = <T extends {}>(
  array: ReadonlyArray<T>,
  size: number,
): Array<typeof array> =>
  array.reduce(
    (chunks, _, idx, arr) =>
      idx % size === 0 ? [...chunks, arr.slice(idx, idx + size)] : chunks,
    [] as Array<typeof array>,
  )

const PAGE_GUTTER = 32 * 2
const PERIL_SIZE = 138
const PERIL_MARGIN = 16
const PERIL_ROWS = 2
const getNumberOfPerilsPerSlide = (windowWidth: number) =>
  Math.round((windowWidth - PAGE_GUTTER) / (PERIL_SIZE + PERIL_MARGIN * 2)) *
  PERIL_ROWS
const getExtraSpace = (windowWidth: number, perilsPerSlide: number) => {
  return (
    windowWidth -
    (PERIL_SIZE + PERIL_MARGIN) * (perilsPerSlide / 2) +
    PAGE_GUTTER
  )
}

export const PerilSwiper: React.FC<Props> = ({
  perils,
  setCurrentPeril,
  setIsShowingPeril,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0)

  const numberOfPerilsPerSlide = getNumberOfPerilsPerSlide(window.innerWidth)
  return (
    <Wrapper
      extraSpace={getExtraSpace(window.innerWidth, numberOfPerilsPerSlide)}
    >
      <SwipeableView
        resistance
        enableMouseEvents
        slideStyle={{
          display: 'flex',
          width: '100%',
          paddingTop: 20,
          paddingBottom: 20,
        }}
        slideClassName="swipeable-views-slide"
        style={{
          width: 'calc(100% + 4rem)',
          marginLeft: '-2rem',
        }}
        containerStyle={{
          width: '100%',
        }}
        onChangeIndex={setCurrentPageIndex}
      >
        {chunkArray(perils, numberOfPerilsPerSlide).map(
          (perilsSlideChunk, slideIndex) => (
            <PerilSlide key={slideIndex}>
              {chunkArray(perilsSlideChunk, numberOfPerilsPerSlide / 2).map(
                (perilsSlideRowChunk, slideRowIndex) => (
                  <PerilSlideRow key={slideRowIndex}>
                    {perilsSlideRowChunk.map((peril, perilIndex) => (
                      <PerilItem
                        key={peril.title?.toString()}
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
      </SwipeableView>
      <SwiperDots>
        {Array.from(
          {
            length: Math.ceil(perils.length / numberOfPerilsPerSlide),
          },
          (_, i) => i,
        ).map((i) => (
          <Dot key={i} active={i === currentPageIndex} />
        ))}
      </SwiperDots>
    </Wrapper>
  )
}

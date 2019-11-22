import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import SwipeableView from 'react-swipeable-views'
import { Peril } from '.'

interface Props {
  perils: Peril[]
  setCurrentPeril: (index: number) => void
  setIsShowingPeril: (isShowingPeril: boolean) => void
}

const PerilItemCollectionSwiper = styled(SwipeableView)`
  padding: 2rem 0;
`

const PerilItemContainer = styled.div`
  width: 138px;
  height: 120px;
  border-radius: 8px;
  background: ${colorsV2.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
`

const PerilSlide = styled.div`
  width: 100%;
  height: 100;
  display: flex;
  flex-flow: row wrap;

  background: yellow;
`

interface PerilItemProps {
  title: string
  icon: JSX.Element
  onClick: () => void
}

const PerilItem: React.FC<PerilItemProps> = ({ title, icon, onClick }) => (
  <PerilItemContainer>{title}</PerilItemContainer>
)

export const PerilSwiper: React.FC<Props> = ({
  perils,
  setCurrentPeril,
  setIsShowingPeril,
}) => {
  const [currentPage, setCurrentPage] = React.useState(0)
  return (
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
      {Array.from(
        { length: Math.ceil(perils.length / 4) },
        (_, i) => i * 4,
      ).map((i) => (
        <PerilSlide>
          {Array.from(
            { length: Math.min(4, perils.length - i) },
            (_, b) => b + i,
          ).map((index) => (
            <PerilItem
              title={perils[index].title}
              icon={perils[index].icon}
              onClick={() => {}}
            />
          ))}
        </PerilSlide>
      ))}
    </PerilItemCollectionSwiper>
  )
}

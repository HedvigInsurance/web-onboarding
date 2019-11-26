import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'
import {
  Alarm,
  BaseballBat,
  Fire,
  LegalDispute,
  Lock,
  Plane,
  Plus,
  Storm,
  Theft,
  WaterLeak,
  WetPhone,
  WhiteGoods,
} from '../../../components/icons/Perils'
import {
  Column,
  Container,
  HeadingBlack,
  HeadingWrapper,
  PreHeading,
  SubSubHeadingBlack,
} from '../components'
import { PerilItem } from './PerilItem'
import { PerilModal } from './PerilModal'
import { PerilSwiper } from './PerilSwiper'

const Wrapper = styled('div')`
  padding: 5rem 0;
  background-color: ${colorsV2.offwhite};
  display: flex;
`

const Body = styled('div')`
  font-size: 1.25rem;
  line-height: 1.626rem;
  color: ${colorsV2.darkgray};
  margin-top: 2rem;
`

const PerilItemCollection = styled('div')`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
`

const ImportantNumbers = styled('div')`
  margin-top: 2rem;
`

export interface Peril {
  title: string
  icon: JSX.Element
}

const perils: Peril[] = [
  {
    title: 'Eldsvåda',
    icon: <Fire />,
  },
  {
    title: 'Vattenläcka',
    icon: <WaterLeak />,
  },
  {
    title: 'Oväder',
    icon: <Storm />,
  },
  {
    title: 'Inbrott',
    icon: <Lock />,
  },
  {
    title: 'Stöld',
    icon: <Theft />,
  },
  {
    title: 'Skadegörelse',
    icon: <BaseballBat />,
  },
  {
    title: 'Juridisk tvist',
    icon: <LegalDispute />,
  },
  {
    title: 'Resetrubbel',
    icon: <Plane />,
  },
  {
    title: 'Överfall',
    icon: <Alarm />,
  },
  {
    title: 'Sjuk på resa',
    icon: <Plus />,
  },
  {
    title: 'Vitvaror',
    icon: <WhiteGoods />,
  },
  {
    title: 'Drulle',
    icon: <WetPhone />,
  },
]

export const Perils = () => {
  const [isShowingPeril, setIsShowingPeril] = React.useState(false)
  const [currentPeril, setCurrentPeril] = React.useState(0)
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  return (
    <Wrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <PreHeading>Skyddet</PreHeading>
            <HeadingBlack>
              {'Säkerhet genom livets alla $%*!;€&-stunder'}
            </HeadingBlack>
            <Body>
              Omfattande skydd för dig och din familj, ditt hus och dina prylar.
            </Body>
          </HeadingWrapper>

          {!isMobile ? (
            <PerilItemCollection>
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
            </PerilItemCollection>
          ) : (
            <PerilSwiper
              perils={perils}
              setCurrentPeril={setCurrentPeril}
              setIsShowingPeril={setIsShowingPeril}
            />
          )}

          <ImportantNumbers>
            <SubSubHeadingBlack>Viktiga siffror</SubSubHeadingBlack>
          </ImportantNumbers>
        </Column>
      </Container>
      <PerilModal
        perils={perils}
        currentPeril={currentPeril}
        setCurrentPeril={setCurrentPeril}
        isVisible={isShowingPeril}
        onClose={() => setIsShowingPeril(false)}
      />
    </Wrapper>
  )
}

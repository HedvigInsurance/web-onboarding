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
import { PerilCollection } from './PerilCollection'
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

const ImportantNumbers = styled('div')`
  margin-top: 2rem;
`

export interface Peril {
  title: string
  description: string
  covered: string[]
  exceptions: string[]
  info?: string
  icon: JSX.Element
}

const perils: Peril[] = [
  {
    title: 'Eldsvåda',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <Fire />,
  },
  {
    title: 'Vattenläcka',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <WaterLeak />,
  },
  {
    title: 'Oväder',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <Storm />,
  },
  {
    title: 'Inbrott',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <Lock />,
  },
  {
    title: 'Stöld',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <Theft />,
  },
  {
    title: 'Skadegörelse',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <BaseballBat />,
  },
  {
    title: 'Juridisk tvist',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <LegalDispute />,
  },
  {
    title: 'Resetrubbel',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <Plane />,
  },
  {
    title: 'Överfall',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <Alarm />,
  },
  {
    title: 'Sjuk på resa',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <Plus />,
  },
  {
    title: 'Vitvaror',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
    icon: <WhiteGoods />,
  },
  {
    title: 'Drulle',
    description:
      'Din diskmaskin går sönder och du kommer hem till en swimmingpool i köket och blöta grannar våningen under. Råkar du ut för en vattenläcka får du ersättning för skadorna.',
    covered: [
      'När du råkar ut för en plötslig oföretsägbar händelse, t.ex. tappat något',
      'Saker värda mindre än 50 000 kr',
      'Om du orsakar en skada på någon annans egendom',
    ],
    exceptions: [
      'Saker värda över 50 000 kr',
      'Om du glömmer kvar något på en restaurang',
    ],
    info:
      'Du måste se till att kranar är täta och inte läcker. Under kyl, fry och diskmaskin måste du se till att det finns vattenuppsamlande underlägg. Se till att innertemperaturen i huset hålls så hög att rör inte fryser.',
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
            <PerilCollection
              perils={perils}
              setCurrentPeril={setCurrentPeril}
              setIsShowingPeril={setIsShowingPeril}
            />
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
        currentPerilIndex={currentPeril}
        setCurrentPeril={setCurrentPeril}
        isVisible={isShowingPeril}
        onClose={() => setIsShowingPeril(false)}
      />
    </Wrapper>
  )
}

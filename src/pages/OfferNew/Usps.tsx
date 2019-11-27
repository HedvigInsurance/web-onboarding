import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import { Bell } from './Usps/Bell'
import { Heart } from './Usps/Heart'
import { Stopwatch } from './Usps/Stopwatch'

const UspsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const UspContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 238px;
`

const UspTitle = styled.h3`
  color: ${colorsV2.white};
  text-align: center;
  margin-top: 16px;
  margin-bottom: 0;
`

const UspParagraph = styled.p`
  color: ${colorsV2.gray};
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
`

interface UspProps {
  image: React.ReactNode
  title: string
  paragraph: string
}

const Usp: React.FunctionComponent<UspProps> = (props) => (
  <UspContainer>
    {props.image}
    <UspTitle>{props.title}</UspTitle>
    <UspParagraph>{props.paragraph}</UspParagraph>
  </UspContainer>
)

export const Usps: React.FunctionComponent = () => (
  <UspsContainer>
    <Usp
      image={<Stopwatch />}
      title="Spara tid med Hedvig"
      paragraph={
        'Slipp vänta på hjälp eller pengar.\nMed Hedvig går allt blixtsnabbt.'
      }
    />
    <Usp
      image={<Bell />}
      title="Service i världsklass"
      paragraph={
        'Få personlig service 07-21 året\nrunt. Vi hjälper dig med allt.'
      }
    />
    <Usp
      image={<Heart />}
      title="Överskottet till välgörenhet"
      paragraph={
        'Tillsammans gör vi det enkelt att hjälpa andra och göra världen bättre'
      }
    />
  </UspsContainer>
)

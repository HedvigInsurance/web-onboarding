import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import { Bell } from './icons/Bell'
import { Heart } from './icons/Heart'
import { Stopwatch } from './icons/Stopwatch'

const UspsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 -0.75rem;
`

const UspContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 13.75rem;
  margin: 0 0.75rem;
`

const UspTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  text-align: center;
  color: ${colorsV2.white};
  margin-top: 1rem;
  margin-bottom: 0;
`

const UspParagraph = styled.p`
  font-size: 0.875rem;
  line-height: 1.5rem;
  letter-spacing: -0.0125rem;
  color: ${colorsV2.gray};
  text-align: center;
  margin-top: 8px;
`

interface UspProps {
  image: React.ReactNode
  title: string
  paragraph: string
}

const Usp: React.FC<UspProps> = ({ image, title, paragraph }) => (
  <UspContainer>
    {image}
    <UspTitle>{title}</UspTitle>
    <UspParagraph>{paragraph}</UspParagraph>
  </UspContainer>
)

export const Usps: React.FunctionComponent = () => (
  <UspsContainer>
    <Usp
      image={<Stopwatch />}
      title="Spara tid med Hedvig"
      paragraph={
        'Slipp vänta på hjälp eller pengar. Med Hedvig går allt blixtsnabbt.'
      }
    />
    <Usp
      image={<Bell />}
      title="Service i världsklass"
      paragraph={
        'Få personlig service 07-21 året runt. Vi hjälper dig med allt.'
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

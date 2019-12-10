import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import { Bell } from './icons/Bell'
import { Heart } from './icons/Heart'
import { Stopwatch } from './icons/Stopwatch'

const UspsContainer = styled.div`
  display: flex;
  margin: 0 -0.75rem;
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`

const UspContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 13.75rem;
  margin: 0 0.75rem;
  width: 100%;
`

const UspTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  text-align: center;
  color: ${colorsV2.white};
  margin-top: 1rem;
  margin-bottom: 0;
  width: 100%;
`

const UspParagraph = styled.p`
  font-size: 0.875rem;
  line-height: 1.5rem;
  letter-spacing: -0.0125rem;
  color: ${colorsV2.gray};
  text-align: center;
  margin-top: 8px;
  flex: 1 1 auto;
  width: 100%;
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
    <TranslationsConsumer textKey="HERO_USP1_HEADLINE">
      {(headline) => (
        <TranslationsConsumer textKey="HERO_USP1_BODY">
          {(body) => (
            <Usp image={<Stopwatch />} title={headline} paragraph={body} />
          )}
        </TranslationsConsumer>
      )}
    </TranslationsConsumer>

    <TranslationsConsumer textKey="HERO_USP2_HEADLINE">
      {(headline) => (
        <TranslationsConsumer textKey="HERO_USP2_BODY">
          {(body) => <Usp image={<Bell />} title={headline} paragraph={body} />}
        </TranslationsConsumer>
      )}
    </TranslationsConsumer>

    <TranslationsConsumer textKey="HERO_USP3_HEADLINE">
      {(headline) => (
        <TranslationsConsumer textKey="HERO_USP3_BODY">
          {(body) => (
            <Usp image={<Heart />} title={headline} paragraph={body} />
          )}
        </TranslationsConsumer>
      )}
    </TranslationsConsumer>
  </UspsContainer>
)

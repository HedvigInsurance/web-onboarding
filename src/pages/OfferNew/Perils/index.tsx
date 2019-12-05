import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { OfferData } from 'containers/OfferContainer'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'
import {
  Body,
  Column,
  ColumnSpacing,
  Container,
  HeadingBlack,
  HeadingWrapper,
  PreHeading,
} from '../components'
import { InsuranceValues } from './InsuranceValues'
import { perils } from './mock'
import { PerilCollection } from './PerilCollection'
import { PerilModal } from './PerilModal'
import { PerilSwiper } from './PerilSwiper'

interface Props {
  offer: OfferData
}

const Wrapper = styled.div`
  padding: 8.5rem 0 5rem 0;
  background-color: ${colorsV2.offwhite};
  display: flex;
`

export const Perils: React.FC<Props> = ({ offer }) => {
  const [isShowingPeril, setIsShowingPeril] = React.useState(false)
  const [currentPeril, setCurrentPeril] = React.useState(0)
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  return (
    <Wrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <PreHeading>
              <TranslationsConsumer textKey="COVERAGE_LABEL">
                {(t) => t}
              </TranslationsConsumer>
            </PreHeading>
            <HeadingBlack>
              <TranslationsConsumer textKey="COVARAGE_HEADLINE">
                {(t) => t}
              </TranslationsConsumer>
            </HeadingBlack>
            <Body>
              <TranslationsConsumer textKey="COVERAGE_BODY">
                {(t) => t}
              </TranslationsConsumer>
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

          <InsuranceValues insuranceType={offer.insurance.type} />
        </Column>
        <ColumnSpacing />
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

import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import {
  Body,
  Column,
  ColumnSpacing,
  Container,
  HeadingBlack,
  HeadingWrapper,
  PreHeading,
} from '../components'
import { CompleteOfferData } from '../types'
import { getInsuranceType } from '../utils'
import { InsuranceValues } from './InsuranceValues'
import { getMockPerils } from './mockPerils'
import { PerilCollection } from './PerilCollection'
import { PerilModal } from './PerilModal'
import { PerilSwiper } from './PerilSwiper'

interface Props {
  offer: CompleteOfferData
}

const Wrapper = styled.div`
  padding: 8.5rem 0 5rem 0;
  background-color: ${colorsV2.offwhite};
  display: flex;
`

export const Perils: React.FC<Props> = ({ offer }) => {
  const textKeys = useTextKeys()
  const [isShowingPeril, setIsShowingPeril] = React.useState(false)
  const [currentPeril, setCurrentPeril] = React.useState(0)
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  return (
    <Wrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <PreHeading>{textKeys.COVERAGE_LABEL()}</PreHeading>
            <HeadingBlack>{textKeys.COVERAGE_HEADLINE()}</HeadingBlack>
            <Body>{textKeys.COVERAGE_BODY()}</Body>
          </HeadingWrapper>

          {isMobile ? (
            <PerilSwiper
              perils={getMockPerils(offer.insurance.type)}
              setCurrentPeril={setCurrentPeril}
              setIsShowingPeril={setIsShowingPeril}
            />
          ) : (
            <PerilCollection
              perils={getMockPerils(offer.insurance.type)}
              setCurrentPeril={setCurrentPeril}
              setIsShowingPeril={setIsShowingPeril}
            />
          )}

          <InsuranceValues insuranceType={getInsuranceType(offer.quote)} />
        </Column>
        <ColumnSpacing />
      </Container>
      <PerilModal
        perils={getMockPerils(offer.insurance.type)}
        currentPerilIndex={currentPeril}
        setCurrentPeril={setCurrentPeril}
        isVisible={isShowingPeril}
        onClose={() => setIsShowingPeril(false)}
      />
    </Wrapper>
  )
}

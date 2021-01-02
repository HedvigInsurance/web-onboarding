import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import {
  Body,
  Column,
  ColumnSpacing,
  Container,
  HeadingBlack,
  HeadingWrapper,
  PreHeading,
} from 'pages/OfferNew/components'
import { PerilRow } from 'pages/OfferNew/Perils/PerilRow'
import { OfferData } from 'pages/OfferNew/types'
import { useTextKeys } from 'utils/textKeys'

interface Props {
  offerData: OfferData
}

const LARGER_SCREEN_MEDIA_QUERY = '@media screen and (min-width: 1000px)'

const Wrapper = styled.div`
  padding: 16rem 0 5rem 0;
  background-color: ${colorsV3.gray100};
  display: flex;

  ${LARGER_SCREEN_MEDIA_QUERY} {
    padding: 8rem 0 5rem 0;
  }
`

const PerilRowWrapper = styled.div`
  padding-bottom: 8rem;

  :last-child {
    padding-bottom: 0;
  }
`

export const getIconUrl = (iconPath: string) => {
  if (typeof window === 'undefined') {
    return ''
  }

  return `${window.hedvigClientConfig.contentServiceEndpoint}${iconPath}`
}

export const Perils: React.FC<Props> = ({ offerData }) => {
  const textKeys = useTextKeys()

  return (
    <Wrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <PreHeading>{textKeys.COVERAGE_LABEL()}</PreHeading>
            <HeadingBlack>{textKeys.COVERAGE_HEADLINE()}</HeadingBlack>
            <Body>{textKeys.COVERAGE_BODY()}</Body>
          </HeadingWrapper>
          {offerData.quotes.map((quote) => (
            <PerilRowWrapper key={quote.id}>
              <PerilRow offerQuote={quote} />
            </PerilRowWrapper>
          ))}
        </Column>
        <ColumnSpacing />
      </Container>
    </Wrapper>
  )
}

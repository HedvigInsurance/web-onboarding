import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { LocalizedImage } from 'components/LocalizedImage'
import { Column, ColumnSpacing, Container, Heading, Body } from './components'

const OuterWrapper = styled.div`
  padding: 0 0 5rem;
  background-color: ${colorsV3.gray100};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding: 5rem 0 10rem;
  }
`

const PromotionImage = styled(LocalizedImage)`
  margin-top: 1.5rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    margin-top: 2.5rem;
  }
`

export const AppPromotionSection: React.FC = () => {
  const textKeys = useTextKeys()

  return (
    <OuterWrapper>
      <Container>
        <Column>
          <Heading>{textKeys.OFFER_APP_PROMOTION_HEADING()}</Heading>
          <Body>{textKeys.OFFER_APP_PROMOTION_PARAGRAPH()}</Body>
          <PromotionImage
            src="/new-member-assets/offer/app-promotion.jpg"
            alt="App promotion"
          />
        </Column>
        <ColumnSpacing />
      </Container>
    </OuterWrapper>
  )
}

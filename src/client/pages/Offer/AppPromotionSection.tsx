import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { LocalizedImage } from 'components/LocalizedImage'
import { Space } from 'components/Space'
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

type Promotion = {
  headingText: string
  bodyText: string
  imageUrl: string
}

type PromotionSectionProps = {
  promotions: Promotion[]
}

export const AppPromotionSection = ({ promotions }: PromotionSectionProps) => {
  return (
    <OuterWrapper>
      <Space y={{ base: 4, mediumScreen: 8 }}>
        {promotions.map((promotion) => (
          <Container key={promotion.headingText}>
            <Column>
              <Heading>{promotion.headingText}</Heading>
              <Body>{promotion.bodyText}</Body>
              <PromotionImage src={promotion.imageUrl} alt="" />
            </Column>
            <ColumnSpacing />
          </Container>
        ))}
      </Space>
    </OuterWrapper>
  )
}

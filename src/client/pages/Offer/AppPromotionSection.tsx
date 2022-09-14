import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { LocalizedImage } from 'components/LocalizedImage'
import { Space } from 'components/Space'
import { Column, ColumnSpacing, Container, Heading, Body } from './components'
import { Promotion } from './useGetPromotions'

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

const StyledAnchor = styled.a({
  color: colorsV3.gray900,
  '&:hover': {
    color: colorsV3.gray900,
  },
})

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
              <Heading>
                <StyledAnchor id={promotion.id}>
                  {promotion.headingText}
                </StyledAnchor>
              </Heading>
              <Body>
                <ReactMarkdown source={promotion.bodyText} />
              </Body>
              <PromotionImage src={promotion.imageUrl} alt="" />
            </Column>
            <ColumnSpacing />
          </Container>
        ))}
      </Space>
    </OuterWrapper>
  )
}

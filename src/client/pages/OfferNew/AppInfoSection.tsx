import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Column, ColumnSpacing, Container, Heading, Body } from './components'

const OuterWrapper = styled.div`
  padding: 5rem 0;
  background-color: ${colorsV3.gray100};

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    padding: 5rem 0 10rem 0;
  }
`

export const AppInfoSection: React.FC = () => {
  const textKeys = useTextKeys()
  return (
    <OuterWrapper>
      <Container>
        <Column>
          <Heading>{textKeys.OFFER_SWITCHER_SAFETY_HEADING()}</Heading>
          <Body>{textKeys.OFFER_SWITCHER_SAFETY_PARAGRAPH()}</Body>
        </Column>
        <ColumnSpacing />
      </Container>
    </OuterWrapper>
  )
}

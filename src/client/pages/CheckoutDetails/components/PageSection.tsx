import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const { gray200 } = colorsV3

export const PageSection = styled.div`
  background-color: ${gray200};
  width: 100%;
  max-width: 628px;
  padding: 24px 16px;
  display: grid;
  gap: 24px;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    padding: 48px;
    border-radius: 8px;
  }
`

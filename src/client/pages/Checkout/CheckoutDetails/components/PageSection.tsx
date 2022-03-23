import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { WrapperWidth } from '../../shared/CheckoutPageWrapper'

const { gray200 } = colorsV3

export const PageSection = styled.div`
  background-color: ${gray200};
  width: 100%;
  max-width: ${WrapperWidth}px;
  padding: 2rem 1rem;
  display: grid;
  gap: 24px;
  margin: 0 auto;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    padding: 3rem;
    border-radius: 8px;
  }
`

import styled from '@emotion/styled'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

export const Grid = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
`

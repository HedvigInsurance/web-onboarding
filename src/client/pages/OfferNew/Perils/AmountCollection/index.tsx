import React from 'react'
import styled from '@emotion/styled'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useTextKeys } from 'utils/textKeys'
import { HeadingXS } from '../../components'
import { OfferQuote } from '../../types'
import { AmountItem } from './AmountItem'
import { Grid } from './Grid'

const Container = styled.div`
  display: grid;
  gap: 0.75rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    gap: 1.5rem;
  }
`

interface Props {
  offer: OfferQuote
}

export const AmountCollection: React.FC<Props> = ({ offer }) => {
  const textKeys = useTextKeys()

  const limits = [...offer.insurableLimits.entries()]

  return (
    <Container>
      <HeadingXS>{textKeys.COVERAGE_INFO_HEADLINE()}</HeadingXS>
      <Grid>
        {limits.map(([type, limit]) => (
          <AmountItem key={type} tooltip={limit.description}>
            <AmountItem.Label>{limit.label}</AmountItem.Label>
            <AmountItem.Value>{limit.limit}</AmountItem.Value>
          </AmountItem>
        ))}
      </Grid>
    </Container>
  )
}

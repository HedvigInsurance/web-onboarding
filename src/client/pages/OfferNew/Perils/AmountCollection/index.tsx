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

type Props = {
  offer: OfferQuote
}

export const AmountCollection = ({ offer }: Props) => {
  const textKeys = useTextKeys()

  return (
    <Container>
      <HeadingXS>{textKeys.COVERAGE_INFO_HEADLINE()}</HeadingXS>
      <Grid>
        {offer.insurableLimits.map(({ label, description, limit }) => (
          <AmountItem key={label} tooltip={description}>
            <AmountItem.Label>{label}</AmountItem.Label>
            <AmountItem.Value>{limit}</AmountItem.Value>
          </AmountItem>
        ))}
      </Grid>
    </Container>
  )
}

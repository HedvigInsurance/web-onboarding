import React from 'react'
import styled from '@emotion/styled'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useTextKeys } from 'utils/textKeys'
import { BundledQuote } from 'data/graphql'
import { HeadingXS } from '../../components'
import { CollapsingList, ExternalLink } from './CollapsingList'

const Container = styled.div`
  display: grid;
  gap: 0.75rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    gap: 1.5rem;
  }
`

type Props = {
  quote: BundledQuote
}

export const DocumentCollection = ({ quote }: Props) => {
  const textKeys = useTextKeys()

  return (
    <Container>
      <HeadingXS>{textKeys.WEB_OFFER_DOCUMENTS_SECTION_TITLE()}</HeadingXS>
      <CollapsingList>
        {quote.insuranceTerms.map(({ url, displayName }) => (
          <ExternalLink key={url} href={url}>
            {displayName}
          </ExternalLink>
        ))}
      </CollapsingList>
    </Container>
  )
}

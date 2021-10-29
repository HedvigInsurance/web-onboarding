import React from 'react'
import styled from '@emotion/styled'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useTextKeys } from 'utils/textKeys'
import { OfferQuote } from '../../types'
import { HeadingXS } from '../../components'
import { CollapsingList } from './CollapsingList'

const Container = styled.div`
  display: grid;
  gap: 0.75rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    gap: 1.5rem;
  }
`

type Props = {
  offer: OfferQuote
}

export const DocumentCollection: React.FC<Props> = ({ offer }) => {
  const textKeys = useTextKeys()

  return (
    <Container>
      <HeadingXS>{textKeys.WEB_OFFER_DOCUMENTS_SECTION_TITLE()}</HeadingXS>
      <CollapsingList>
        {offer.insuranceTerms.map(({ type, url, displayName }) => {
          return (
            <CollapsingList.ExternalLink key={type} href={url}>
              {displayName}
            </CollapsingList.ExternalLink>
          )
        })}
      </CollapsingList>
    </Container>
  )
}

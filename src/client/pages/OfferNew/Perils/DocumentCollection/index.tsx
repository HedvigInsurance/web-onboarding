import React from 'react'
import styled from '@emotion/styled'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useTextKeys } from 'utils/textKeys'
import { OfferQuote } from '../../types'
import { HeadingXS } from '../../components'
import ExternalLinkList from './ExternalLinkList'

const Container = styled.div`
  display: grid;
  gap: 0.75rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    gap: 1.5rem;
  }
`

interface Props {
  offer: OfferQuote
}

const DocumentCollection: React.FC<Props> = ({ offer }) => {
  const textKeys = useTextKeys()

  return (
    <Container>
      <HeadingXS>{textKeys.WEB_OFFER_DOCUMENTS_SECTION_TITLE()}</HeadingXS>
      <ExternalLinkList>
        {offer.insuranceTerms.map(({ type, url, displayName }) => {
          return (
            <ExternalLinkList.Link key={type} href={url}>
              {displayName}
            </ExternalLinkList.Link>
          )
        })}
      </ExternalLinkList>
    </Container>
  )
}

export default DocumentCollection

import React from 'react'
import styled from '@emotion/styled'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useTextKeys } from 'utils/textKeys'
import { OfferQuote } from '../../types'
import TermsCollection from './TermsCollection'

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

const AmountCollection: React.FC<Props> = ({ offer }) => {
  const textKeys = useTextKeys()

  const terms = [...offer.insuranceTerms.entries()]

  return (
    <Container>
      {/* <HeadingXS>{textKeys.COVERAGE_INFO_HEADLINE()}</HeadingXS> */}
      <TermsCollection>
        {terms.map(([insuranceTermType, insuranceTerm]) => {
          return (
            <TermsCollection.Link
              key={insuranceTermType}
              href={insuranceTerm.url}
            >
              {insuranceTerm.displayName}
            </TermsCollection.Link>
          )
        })}
      </TermsCollection>
    </Container>
  )
}

export default AmountCollection

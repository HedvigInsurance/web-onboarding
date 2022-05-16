import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { QuoteBundle } from 'data/graphql'
import { RawLink } from 'components/RawLink'
import { Row } from './InsuranceSummary'

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.25rem;
`

const DisplayNameWrapper = styled.div`
  color: ${colorsV3.gray900};
  font-size: 0.875;
`
const LinkRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  line-height: 1;
`

const Link = styled(RawLink)`
  font-size: 0.75rem;
  color: ${colorsV3.gray700};
  text-decoration: none;
  padding: 0.5rem 1rem 0 0;
  :hover,
  :focus {
    color: ${colorsV3.gray900};
  }
`

type Props = {
  quotes: QuoteBundle['quotes']
}

export const InsuranceSummaryTermsLinks = ({ quotes }: Props) => (
  <>
    {quotes.map(({ id, displayName, insuranceTerms }) => {
      return (
        <LinksWrapper key={id}>
          <Row>
            <DisplayNameWrapper>{displayName}</DisplayNameWrapper>
          </Row>
          <LinkRow>
            {insuranceTerms.map(
              ({ displayName: termDisplayName, url }, index) => (
                <Link key={index} href={url} target="_blank">
                  {termDisplayName} {' ↗'}
                </Link>
              ),
            )}
          </LinkRow>
        </LinksWrapper>
      )
    })}
  </>
)

import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { InsuranceTerm, InsuranceTermType } from 'data/graphql'
import { RawLink } from 'components/RawLink'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
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

export type Term = {
  termType: InsuranceTermType
  data: InsuranceTerm
  quoteId: OfferQuote['id']
}

export type Terms = Term[]

type Props = {
  offerData: OfferData
}

const removePrivacyPolicy = (terms: InsuranceTerm[]) =>
  terms.filter(({ type }) => type !== InsuranceTermType.PrivacyPolicy)

export const InsuranceSummaryTermsLinks = ({ offerData }: Props) => (
  <>
    {offerData.quotes.map(({ id, displayName, insuranceTerms }) => {
      const termsWithoutPrivacyPolicy = removePrivacyPolicy(insuranceTerms)
      return (
        <LinksWrapper key={id}>
          <Row>
            <DisplayNameWrapper>{displayName}</DisplayNameWrapper>
          </Row>
          <LinkRow>
            {termsWithoutPrivacyPolicy.map(
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

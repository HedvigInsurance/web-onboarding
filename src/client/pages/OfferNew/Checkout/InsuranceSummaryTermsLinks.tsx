import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { InsuranceTerm, InsuranceTermType } from 'data/graphql'
import { RawLink } from 'components/RawLink'
import { OfferData, OfferQuote } from '../types'
import { Group, Row } from './InsuranceSummary'

const linkColor = colorsV3.gray700

const DisplayNameWrapper = styled.div`
  color: ${colorsV3.gray900};
`
const Link = styled(RawLink)`
  font-size: 14px;
  color: ${linkColor};
  :hover,
  :focus {
    color: ${linkColor};
    text-decoration: none;
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
  terms.filter(({ type }) => InsuranceTermType.PrivacyPolicy !== type)

export const InsuranceSummaryTermsLinks = ({ offerData }: Props) => (
  <>
    {offerData.quotes.map(({ id, displayName, insuranceTerms }) => {
      const termsWithoutPrivacyPolicy = removePrivacyPolicy(insuranceTerms)
      return (
        <Group key={id}>
          <Row>
            <DisplayNameWrapper>{displayName}</DisplayNameWrapper>
          </Row>
          {termsWithoutPrivacyPolicy.map(
            ({ displayName: termDisplayName, url }, index) => (
              <Row key={index}>
                <DisplayNameWrapper>
                  <Link href={url} target="_blank">
                    {termDisplayName}
                  </Link>
                  {' ↗'}
                </DisplayNameWrapper>
              </Row>
            ),
          )}
        </Group>
      )
    })}
  </>
)

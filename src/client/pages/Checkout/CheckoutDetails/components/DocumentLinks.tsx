import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { BundledQuote, InsuranceTerm, InsuranceTermType } from 'data/graphql'
import { RawLink } from 'components/RawLink'
import { useTextKeys } from 'utils/textKeys'

const UNICODE_ARROW_UP = '↗'

const TermsSection = styled.div`
  display: flex;
  flex-direction: column;
`
const TermsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const QuoteName = styled.p`
  font-size: 0.875rem;
  color: ${colorsV3.gray900};
`
const DocumentLink = styled(RawLink)`
  font-size: 0.75rem;
  color: ${colorsV3.gray700};
  text-decoration: none;
  margin-right: 1rem;
`

export type DocumentLinksProps = {
  allQuotes: BundledQuote[]
}

const filterTerms = (terms: InsuranceTerm[]) =>
  terms.filter(
    ({ type }) =>
      type !== InsuranceTermType.PrivacyPolicy &&
      type !== InsuranceTermType.GeneralTerms,
  )

const TermLink = ({ term }: { term: InsuranceTerm }) => {
  const textKeys = useTextKeys()
  const linkTextKey =
    term.type === InsuranceTermType.TermsAndConditions
      ? 'CHECKOUT_TERMS_FULL'
      : 'CHECKOUT_TERMS_PRE_PURCHASE_INFO'
  return (
    <DocumentLink href={term.url}>
      {textKeys[linkTextKey]} {UNICODE_ARROW_UP}
    </DocumentLink>
  )
}

const QuoteTerms = ({ quote }: { quote: BundledQuote }) => {
  const insuranceTerms = filterTerms(quote.insuranceTerms)
  return (
    <TermsSection>
      <QuoteName>{quote.displayName}</QuoteName>
      <TermsContainer>
        {insuranceTerms.map((term) => (
          <TermLink term={term} key={`${quote.id}-${term.displayName}`} />
        ))}
      </TermsContainer>
    </TermsSection>
  )
}

export const DocumentLinks = ({ allQuotes }: DocumentLinksProps) => {
  return (
    <>
      {allQuotes.map((quote) => (
        <QuoteTerms key={quote.id} quote={quote} />
      ))}
    </>
  )
}

import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import color from 'color'
import { OfferQuote } from 'pages/OfferNew/types'
import { RawLink } from 'components/RawLink'

const Links = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const TermsLink = styled(RawLink)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem 0.75rem 1rem;
  background: ${colorsV3.gray300};
  border-radius: 8px;
  color: ${colorsV3.black};
  font-size: 1rem;
  text-decoration: none;
  margin-right: 1rem;
  margin-top: 0.5rem;
  transition: all 0.1s;

  :last-child {
    margin-right: 0;
  }

  svg {
    margin-right: 0.5rem;
  }

  :hover,
  :focus {
    background: ${color(colorsV3.gray300)
      .darken(0.03)
      .toString()};
    color: ${colorsV3.black};
  }

  @media (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`

type Props = {
  offerQuote: OfferQuote
}

export const InsuranceValues: React.FC<Props> = ({ offerQuote }) => {
  return (
    <Links>
      {[...offerQuote.insuranceTerms.entries()].map(
        ([insuranceTermType, insuranceTerm]) => {
          return (
            <TermsLink
              key={insuranceTermType}
              href={insuranceTerm.url}
              target="_blank"
            >
              {insuranceTerm.displayName}
              {' ↗'}
            </TermsLink>
          )
        },
      )}
    </Links>
  )
}

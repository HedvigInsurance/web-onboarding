import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import color from 'color'
import { InsuranceTermType } from 'data/graphql'
import { Limits } from 'pages/OfferNew/Perils/InsuranceValues/Limits'
import { OfferQuote } from 'pages/OfferNew/types'
import { getTermsLink } from 'pages/OfferNew/Checkout/SignDisclaimer'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { SubSubHeadingBlack } from '../../components'

const Wrapper = styled.div`
  margin-top: 4rem;

  @media (max-width: 600px) {
    margin-top: 2.5rem;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Links = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 4rem;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const Link = styled.a`
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
  const textKeys = useTextKeys()

  const temporaryTermsToUse = [...offerQuote.insuranceTerms.entries()].filter(
    ([insuranceTermType]) => {
      return insuranceTermType !== InsuranceTermType.GeneralTerms
    },
  )

  const currentLocale = useCurrentLocale()

  const temporaryTermsLink = getTermsLink(currentLocale)

  return (
    <Wrapper>
      <Header>
        <SubSubHeadingBlack>
          {textKeys.COVERAGE_INFO_HEADLINE()}
        </SubSubHeadingBlack>
      </Header>

      <Limits insurableLimits={offerQuote.insurableLimits} />
      <Links>
        {temporaryTermsToUse.map(([insuranceTermType, insuranceTerm]) => {
          return (
            <Link
              key={insuranceTermType}
              href={
                insuranceTermType === InsuranceTermType.TermsAndConditions
                  ? temporaryTermsLink
                  : insuranceTerm.url
              }
              target="_blank"
            >
              {insuranceTerm.displayName}
              {' ↗'}
            </Link>
          )
        })}
      </Links>
    </Wrapper>
  )
}

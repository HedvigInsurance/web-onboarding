import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { InsuranceTermType } from 'data/graphql'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { OfferQuote } from '../types'
import { getTermsLink } from '../Perils/InsuranceValues'
import { Group, Row } from './InsuranceSummary'

const linkColor = colorsV3.gray700

const LinkWrapper = styled.div`
  color: ${colorsV3.gray900};
`
const Link = styled.a`
  font-size: 14px;
  color: ${linkColor};
  :hover,
  :focus {
    color: ${linkColor};
    text-decoration: none;
  }
`

type GetUrlParams = {
  currentLocale: string
  termType: InsuranceTermType
  urlFromBackend: string
}

const getUrl = ({ currentLocale, termType, urlFromBackend }: GetUrlParams) => {
  const temporaryTermsLink = getTermsLink(currentLocale)
  // 👆 This link is temporary since we can't get the correct ones from content-service right now

  if (termType === 'TERMS_AND_CONDITIONS') {
    return temporaryTermsLink
  }
  return urlFromBackend
}

type Props = {
  mainQuote: OfferQuote
}

export const InsuranceSummaryTermsLinks: React.FC<Props> = ({ mainQuote }) => {
  const currentLocale = useCurrentLocale()

  const { insuranceTerms } = mainQuote

  const insuranceTermsArr = [...insuranceTerms].map(([termType, data]) => {
    return { termType, data }
  })

  return (
    <Group>
      {insuranceTermsArr.map(({ termType, data }) => {
        const { displayName, url } = data
        return (
          <Row key={termType}>
            <LinkWrapper>
              <Link
                href={getUrl({ termType, currentLocale, urlFromBackend: url })}
                target="_blank"
              >
                {displayName}
              </Link>
              {' ↗'}
            </LinkWrapper>
          </Row>
        )
      })}
    </Group>
  )
}

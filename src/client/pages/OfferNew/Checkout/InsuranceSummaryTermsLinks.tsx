import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { InsuranceTermType } from 'data/graphql'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { OfferData } from '../types'
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

type GetAllInsuranceTermsParams = {
  offerData: OfferData
}

const getInsuranceTerms = ({ offerData }: GetAllInsuranceTermsParams) => {
  const allQuotesInsuranceTerms = offerData.quotes
    .map((quote) => {
      const { insuranceTerms } = quote
      return [...insuranceTerms].map(([termType, data]) => {
        return { termType, data }
      })
    })
    .reduce((acc, cur) => {
      return [...acc, ...cur]
    })

  const termsWithoutDuplicates = allQuotesInsuranceTerms.reduce(
    (termsObjects, currentTermsObject) => {
      const duplicate = termsObjects.find(
        ({ data }) =>
          data.displayName === currentTermsObject.data.displayName &&
          data.url === currentTermsObject.data.url,
      )
      if (duplicate) {
        return termsObjects
      }

      return [...termsObjects, currentTermsObject]
    },
    [allQuotesInsuranceTerms[0]],
  )

  const termsArrayMinusPrivacyPolicy = termsWithoutDuplicates.filter(
    ({ termType }) => termType !== 'PRIVACY_POLICY',
  )

  return termsArrayMinusPrivacyPolicy
}

type Props = {
  offerData: OfferData
}

export const InsuranceSummaryTermsLinks: React.FC<Props> = ({ offerData }) => {
  const currentLocale = useCurrentLocale()

  const insuranceTerms = getInsuranceTerms({ offerData })

  return (
    <Group>
      {insuranceTerms.map(({ termType, data }, index) => {
        const { displayName, url } = data
        return (
          <Row key={termType + index}>
            <LinkWrapper>
              <Link
                href={getUrl({
                  termType,
                  currentLocale,
                  urlFromBackend: url,
                })}
                target="_blank"
                rel="noreferrer noopener"
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

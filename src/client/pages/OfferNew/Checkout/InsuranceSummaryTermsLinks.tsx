import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { InsuranceTerm, InsuranceTermType } from 'data/graphql'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { OfferData, OfferQuote } from '../types'
import { checkIfMainQuote } from '../utils'
import { getTemporaryTermsLink } from '../Perils/InsuranceValues'
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
  const temporaryTermsLink = getTemporaryTermsLink(currentLocale)
  // 👆 This link is temporary since we can't get the correct ones from content-service right now

  if (termType === 'TERMS_AND_CONDITIONS') {
    return temporaryTermsLink
  }
  return urlFromBackend
}

export type Term = {
  termType: InsuranceTermType
  data: InsuranceTerm
  quoteId: OfferQuote['id']
}

export type Terms = Term[]

type GetSortedParams = {
  termsArray: Terms
  offerData: OfferData
}

const getSorted = ({ termsArray, offerData }: GetSortedParams) => {
  const termsAndConditionsSorted = termsArray
    .filter(({ termType }) => termType === InsuranceTermType.TermsAndConditions)
    .sort((firstElement, _sedondElement) => {
      const { quoteId } = firstElement
      const isMainQuote = checkIfMainQuote(offerData, quoteId)
      if (isMainQuote) {
        return -1
      }
      return 0
    })

  const restOfTerms = termsArray.filter(
    ({ termType }) => termType !== InsuranceTermType.TermsAndConditions,
  )
  return [...termsAndConditionsSorted, ...restOfTerms]
}

export const getInsuranceTerms = (offerData: OfferData) => {
  const allQuotesInsuranceTerms = offerData.quotes
    .map((quote) => {
      const quoteId = quote.id
      const { insuranceTerms } = quote
      return [...insuranceTerms].map(([termType, data]) => {
        return { quoteId, termType, data }
      })
    })
    .reduce((termsArray, termsArrayFromQuote) => {
      return [...termsArray, ...termsArrayFromQuote]
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

  const sortedTermsArray = getSorted({
    termsArray: termsArrayMinusPrivacyPolicy,
    offerData,
  })

  return sortedTermsArray
}

type Props = {
  offerData: OfferData
}

export const InsuranceSummaryTermsLinks: React.FC<Props> = ({ offerData }) => {
  const currentLocale = useCurrentLocale()

  const insuranceTerms = getInsuranceTerms(offerData)

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

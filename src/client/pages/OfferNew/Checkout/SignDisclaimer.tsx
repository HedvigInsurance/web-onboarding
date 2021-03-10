import React from 'react'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown/with-html'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { useTextKeys } from 'utils/textKeys'
import { OfferData } from 'pages/OfferNew/types'
import { isNorwegian, isSwedish } from 'pages/OfferNew/utils'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { InsuranceTermType } from '../../../data/graphql'

const Wrapper = styled('div')`
  padding: 2rem 0 1rem;
  font-size: 0.75rem;
  color: ${colorsV3.gray500};
  line-height: 1.5;

  @media (max-width: 600rem) {
    text-align: center;
  }

  p {
    margin: 0;
  }
`

export const getTermsLinks = (currentLocale: string) => {
  const baseUrl = `https://www.hedvig.com/${currentLocale}`

  const isPageInEnglish = currentLocale.includes('en')

  const termslinkSE = isPageInEnglish
    ? `${baseUrl}/terms`
    : `${baseUrl}/villkor`

  if (currentLocale.includes('se')) {
    return termslinkSE
  }

  if (currentLocale.includes('no')) {
    return `${baseUrl}/terms`
  }

  return ''
}

type Props = {
  offerData: OfferData
}

export const SignDisclaimer: React.FC<Props> = ({ offerData }) => {
  const textKeys = useTextKeys()

  const currentLocale = useCurrentLocale()

  const temporaryTermsLink = getTermsLinks(currentLocale)

  // This link is only temporary since we can't get the correct ones from content-service ATM 👆
  // Please note that this implementation only works with the cases where we have multiple contracts as long as we don't need to fetch the links from content-service

  const signDisclaimerSE = textKeys.CHECKOUT_SIGN_DISCLAIMER({
    PREBUY_LINK:
      offerData.quotes[0].insuranceTerms.get(
        InsuranceTermType.PreSaleInfoEuStandard,
      )?.url ?? temporaryTermsLink,
    TERMS_LINK: temporaryTermsLink,
  })

  const signDisclaimerNO = textKeys.CHECKOUT_SIGN_DISCLAIMER_NO({
    TERMS_LINK: temporaryTermsLink,
  })

  return (
    <Wrapper>
      {isSwedish(offerData) && (
        <ReactMarkdown
          source={
            Array.isArray(signDisclaimerSE)
              ? signDisclaimerSE.join('')
              : signDisclaimerSE
          }
          linkTarget="_blank"
        />
      )}
      {isNorwegian(offerData) && (
        <ReactMarkdown
          source={
            Array.isArray(signDisclaimerNO)
              ? signDisclaimerNO.join('')
              : signDisclaimerNO
          }
          linkTarget="_blank"
        />
      )}
    </Wrapper>
  )
}

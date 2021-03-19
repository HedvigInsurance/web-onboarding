import React from 'react'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown/with-html'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { useTextKeys } from 'utils/textKeys'
import { OfferData } from 'pages/OfferNew/types'
import { getTermsLink } from 'pages/OfferNew/Perils/InsuranceValues/index'
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

type Props = {
  offerData: OfferData
}

export const SignDisclaimer: React.FC<Props> = ({ offerData }) => {
  const textKeys = useTextKeys()

  const currentLocale = useCurrentLocale()

  const temporaryTermsLink = getTermsLink(currentLocale)
  // 👆 This link is only temporary since we can't get the correct ones from content-service right now

  // Please note that this implementation 👇 obviously won't work with multiple contracts and is only OK as long as we hard code the links and the links from the backend also just lead to a market-web pages.
  const firstQuote = offerData.quotes[0]

  const signDisclaimerSE = textKeys.CHECKOUT_SIGN_DISCLAIMER({
    TERMS_TITLE: firstQuote.insuranceTerms.get(
      InsuranceTermType.TermsAndConditions,
    )?.displayName,
    TERMS_LINK: temporaryTermsLink,
    IPID_TITLE: firstQuote.insuranceTerms.get(
      InsuranceTermType.PreSaleInfoEuStandard,
    )?.displayName,
    PREBUY_LINK:
      firstQuote.insuranceTerms.get(InsuranceTermType.PreSaleInfoEuStandard)
        ?.url ?? temporaryTermsLink,
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

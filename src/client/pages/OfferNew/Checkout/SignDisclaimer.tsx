import React from 'react'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown/with-html'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { TextKeyMap, useTextKeys } from 'utils/textKeys'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { InsuranceTermType, SignMethod } from '../../../data/graphql'

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
const getSignButtonLabel = (textKeys: TextKeyMap, signMethod?: SignMethod) => {
  return signMethod === SignMethod.SimpleSign
    ? textKeys.CHECKOUT_SIMPLE_SIGN_BUTTON_TEXT()
    : textKeys.CHECKOUT_SIGN_BUTTON_TEXT()
}

const getPrivacyPolicyLink = (currentLocale: string, quote: OfferQuote) => {
  const linkFromBackend = quote.insuranceTerms.find(
    ({ type }) => type === InsuranceTermType.PrivacyPolicy,
  )?.url

  if (linkFromBackend) {
    return linkFromBackend
  }

  return `https://www.hedvig.com/${currentLocale}/privacy`
}

type Props = {
  offerData: OfferData
  signMethod?: SignMethod
}

export const SignDisclaimer: React.FC<Props> = ({ offerData, signMethod }) => {
  const textKeys = useTextKeys()

  const currentLocale = useCurrentLocale()

  const firstQuote = offerData.quotes[0]

  const signDisclaimer = textKeys.CHECKOUT_SIGN_DISCLAIMER({
    SIGN_BUTTON_LABEL: getSignButtonLabel(textKeys, signMethod),
    PRIVACY_POLICY_LINK: getPrivacyPolicyLink(currentLocale, firstQuote),
  })

  return (
    <Wrapper>
      <ReactMarkdown
        source={
          Array.isArray(signDisclaimer)
            ? signDisclaimer.join('')
            : signDisclaimer
        }
        linkTarget="_blank"
      />
    </Wrapper>
  )
}

import React from 'react'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown/with-html'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { TextKeyMap, useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { CheckoutMethod } from 'data/graphql'

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
const getSignButtonLabel = (
  textKeys: TextKeyMap,
  checkoutMethod?: CheckoutMethod,
) => {
  return checkoutMethod === CheckoutMethod.SimpleSign
    ? textKeys.CHECKOUT_SIMPLE_SIGN_BUTTON_TEXT()
    : textKeys.CHECKOUT_SIGN_BUTTON_TEXT()
}

type Props = {
  privacyPolicyLink?: string
  checkoutMethod?: CheckoutMethod
}

export const SignDisclaimer: React.FC<Props> = ({
  privacyPolicyLink,
  checkoutMethod,
}) => {
  const textKeys = useTextKeys()
  const { path: localePath } = useCurrentLocale()
  const fallbackPrivacyPolicyLink = `https://www.hedvig.com/${localePath}/privacy-policy`

  const signDisclaimer = textKeys.CHECKOUT_SIGN_DISCLAIMER({
    SIGN_BUTTON_LABEL: getSignButtonLabel(textKeys, checkoutMethod),
    PRIVACY_POLICY_LINK: privacyPolicyLink || fallbackPrivacyPolicyLink,
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

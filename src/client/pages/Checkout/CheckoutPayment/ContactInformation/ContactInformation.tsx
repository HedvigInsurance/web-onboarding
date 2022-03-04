import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { Headline } from 'components/Headline/Headline'
import { InputField } from 'components/inputs'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const Wrapper = styled.div`
  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    width: 100%;
    max-width: 628px;
  }
`

const SpacerSmall = styled.div`
  height: 1rem;
`
const Spacer = styled.div`
  height: 1.5rem;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colorsV3.gray300};
`

export const ContactInformation = () => {
  const textKeys = useTextKeys()
  const locale = useCurrentLocale()

  const [hasEnabledCreditCheckInfo] = useFeature([
    Features.CHECKOUT_CREDIT_CHECK,
  ])
  const ssnFormatExample = locale.ssn.formatExample

  return (
    <Wrapper>
      <Headline variant="xs" headingLevel="h2" colorVariant="dark">
        {textKeys.CHECKOUT_CONTACT_INFO_HEADING()}
      </Headline>
      <SpacerSmall />
      <InputField
        label={textKeys.CHECKOUT_FIRSTNAME_LABEL()}
        placeholder={textKeys.CHECKOUT_FIRSTNAME_LABEL()}
      />
      <InputField
        label={textKeys.CHECKOUT_LASTNAME_LABEL()}
        placeholder={textKeys.CHECKOUT_LASTNAME_LABEL()}
      />
      <InputField
        label={textKeys.CHECKOUT_CONTACT_INFO_SSN_LABEL()}
        placeholder={ssnFormatExample}
        helperText={
          hasEnabledCreditCheckInfo
            ? textKeys.CHECKOUT_CONTACT_INFO_CREDIT_CHECK_HELPER()
            : undefined
        }
      />
      {hasEnabledCreditCheckInfo && <Spacer />}
      <InputField
        label={textKeys.CHECKOUT_EMAIL_LABEL()}
        placeholder={textKeys.CHECKOUT_EMAIL_LABEL()}
        helperText={textKeys.CHECKOUT_CONTACT_INFO_EMAIL_HELPER()}
      />
      <Spacer />
      <Divider />
    </Wrapper>
  )
}

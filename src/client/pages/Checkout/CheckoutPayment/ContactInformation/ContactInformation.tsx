import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Headline } from 'components/Headline/Headline'
import { InputField } from 'components/inputs'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Divider } from '../../shared/Divider'
import { ContactInfoData } from '../../shared/types'
import { WrapperWidth } from '../../shared/CheckoutPageWrapper'

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    padding: 0;
    width: 100%;
    max-width: ${WrapperWidth}px;
  }
`

const InputFieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    grid-template-columns: 1fr 1fr;
    gap: 0 1.5rem;
  }
`

const StyledInputField = styled(InputField)`
  ${Wrapper} & {
    background-color: ${colorsV3.gray100};
    border-radius: 8px;
  }
`

const SpacerSmall = styled.div`
  height: 1rem;
`

const Spacer = styled.div`
  height: 1.5rem;
`

const HorizontalDivider = styled(Divider)`
  margin: 1.5rem 0;
  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    margin: 3rem 0;
  }
`

export const ContactInformation = ({
  firstName,
  lastName,
  email,
  ssn,
}: ContactInfoData) => {
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
      <InputFieldsWrapper>
        <StyledInputField
          label={textKeys.CHECKOUT_FIRSTNAME_LABEL()}
          placeholder={textKeys.CHECKOUT_FIRSTNAME_LABEL()}
          type="text"
          defaultValue={firstName ?? ''}
          name="firstName"
        />
        <StyledInputField
          label={textKeys.CHECKOUT_LASTNAME_LABEL()}
          placeholder={textKeys.CHECKOUT_LASTNAME_LABEL()}
          type="text"
          defaultValue={lastName ?? ''}
          name="lastName"
        />
        <div>
          <StyledInputField
            label={textKeys.CHECKOUT_CONTACT_INFO_SSN_LABEL()}
            placeholder={ssnFormatExample}
            helperText={
              hasEnabledCreditCheckInfo
                ? textKeys.CHECKOUT_CONTACT_INFO_CREDIT_CHECK_HELPER()
                : undefined
            }
            type="text"
            defaultValue={ssn ?? ''}
            name="ssn"
          />
          {hasEnabledCreditCheckInfo && <Spacer />}
        </div>
        <div>
          <StyledInputField
            label={textKeys.CHECKOUT_EMAIL_LABEL()}
            placeholder={textKeys.CHECKOUT_EMAIL_LABEL()}
            helperText={textKeys.CHECKOUT_CONTACT_INFO_EMAIL_HELPER()}
            type="text"
            defaultValue={email ?? ''}
            name="email"
          />
        </div>
      </InputFieldsWrapper>
      <HorizontalDivider />
    </Wrapper>
  )
}

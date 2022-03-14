import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Headline } from 'components/Headline/Headline'
import { InputField } from 'components/inputs'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Divider } from '../../shared/Divider'

type ContactInfoData = {
  data: {
    firstName?: string
    lastName?: string
    ssn?: string
    email?: string
  }
}

const Wrapper = styled.div`
  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    width: 100%;
    max-width: 628px;
  }
`

const InputFieldsWrapper = styled.div`
  display: grid;
  width: 100%;
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
  }
`

const SpacerSmall = styled.div`
  height: 1rem;
`
const Spacer = styled.div`
  height: 1.5rem;
`

export const ContactInformation = ({ data }: ContactInfoData) => {
  const textKeys = useTextKeys()
  const locale = useCurrentLocale()

  const [firstName, setFirstName] = useState(data.firstName)
  const [lastName, setLastName] = useState(data.lastName)
  const [ssn, setSsn] = useState(data.ssn)
  const [email, setEmail] = useState(data.email)

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
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFirstName(e.target.value)
          }}
        />
        <StyledInputField
          label={textKeys.CHECKOUT_LASTNAME_LABEL()}
          placeholder={textKeys.CHECKOUT_LASTNAME_LABEL()}
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLastName(e.target.value)
          }}
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
            value={ssn}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSsn(e.target.value)
            }}
          />
          {hasEnabledCreditCheckInfo && <Spacer />}
        </div>
        <div>
          <StyledInputField
            label={textKeys.CHECKOUT_EMAIL_LABEL()}
            placeholder={textKeys.CHECKOUT_EMAIL_LABEL()}
            helperText={textKeys.CHECKOUT_CONTACT_INFO_EMAIL_HELPER()}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value)
            }}
          />
          <Spacer />
        </div>
      </InputFieldsWrapper>
      <Divider />
    </Wrapper>
  )
}

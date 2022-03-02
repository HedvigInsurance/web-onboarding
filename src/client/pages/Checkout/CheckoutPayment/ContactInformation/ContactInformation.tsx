import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useTextKeys } from 'utils/textKeys'
import { Headline } from 'components/Headline/Headline'
import { InputField } from 'components/inputs'

const ContactInfoInput = styled(InputField)`
  background-color: ${colorsV3.gray100};
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

  return (
    <>
      <Headline variant="xs" headingLevel="h2" colorVariant="dark">
        {textKeys.CHECKOUT_CONTACT_INFO_HEADING()}
      </Headline>
      <SpacerSmall />
      <ContactInfoInput
        label={textKeys.CHECKOUT_FIRSTNAME_LABEL()}
        placeholder={textKeys.CHECKOUT_FIRSTNAME_LABEL()}
      />
      <ContactInfoInput
        label={textKeys.CHECKOUT_LASTNAME_LABEL()}
        placeholder={textKeys.CHECKOUT_LASTNAME_LABEL()}
      />
      <ContactInfoInput
        label={textKeys.CHECKOUT_CONTACT_INFO_SSN_LABEL()}
        helperText={textKeys.CHECKOUT_CONTACT_INFO_CREDIT_CHECK_HELPER()}
      />
      <Spacer />
      <ContactInfoInput
        label={textKeys.CHECKOUT_EMAIL_LABEL()}
        placeholder={textKeys.CHECKOUT_EMAIL_LABEL()}
        helperText={textKeys.CHECKOUT_CONTACT_INFO_EMAIL_HELPER()}
      />
      <Spacer />
      <Divider />
    </>
  )
}

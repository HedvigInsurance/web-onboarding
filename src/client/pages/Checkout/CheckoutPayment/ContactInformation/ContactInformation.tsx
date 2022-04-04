import React, { useEffect, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { FormikProps } from 'formik'
import { Headline } from 'components/Headline/Headline'
import { InputField } from 'components/inputs'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { QuoteInput } from 'pages/Offer/Introduction/DetailsModal/types'
import { CreditCheckInfo } from 'pages/OfferNew/Checkout/CreditCheckInfo'
import { TextInput, SsnInput } from 'pages/Offer/Checkout/inputFields'
import { WrapperWidth } from '../../shared/CheckoutPageWrapper'
import { Divider } from '../../shared/Divider'

const debounce = (func: (...args: any[]) => any, timeout: number) => {
  let timer: number
  return function(this: any, ...args: any[]) {
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
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

export const ContactInformation = (
  formikProps: FormikProps<QuoteInput>,
  data,
) => {
  const textKeys = useTextKeys()
  const locale = useCurrentLocale()
  const { handleChange } = formikProps
  console.log(formikProps)
  const [hasEnabledCreditCheckInfo] = useFeature([
    Features.CHECKOUT_CREDIT_CHECK,
  ])
  const ssnFormatExample = locale.ssn.formatExample
  const [isShowingCreditCheckInfo, setIsShowingCreditCheckInfo] = useState(
    false,
  )
  const { initialValues, submitForm } = formikProps.formikProps
  console.log(formikProps)
  const ssn = initialValues ? initialValues.ssn : data.ssn
  const debouncedSubmitForm = useCallback(
    debounce(() => {
      submitForm()
    }, 500),
    [],
  )

  useEffect(() => {
    if (ssn) {
      debouncedSubmitForm()
    }
  }, [ssn, debouncedSubmitForm])

  return (
    <Wrapper>
      <Headline variant="xs" headingLevel="h2" colorVariant="dark">
        {textKeys.CHECKOUT_CONTACT_INFO_HEADING()}
      </Headline>
      <SpacerSmall />
      <form onSubmit={formikProps.handleSubmit}>
        <InputFieldsWrapper>
          <TextInput
            label={textKeys.CHECKOUT_FIRSTNAME_LABEL()}
            placeholder={textKeys.CHECKOUT_FIRSTNAME_LABEL()}
            type="text"
            name="firstName"
            formikProps={formikProps}
            onChange={handleChange}
            defaultValue={initialValues.firstName}
          />
          <TextInput
            label={textKeys.CHECKOUT_LASTNAME_LABEL()}
            placeholder={textKeys.CHECKOUT_LASTNAME_LABEL()}
            type="text"
            // defaultValue={lastName ?? ''}
            name="lastName"
            formikProps={formikProps}
            onChange={handleChange}
          />
          <div>
            <TextInput
              label={textKeys.CHECKOUT_CONTACT_INFO_SSN_LABEL()}
              placeholder={ssnFormatExample}
              helperText={
                hasEnabledCreditCheckInfo
                  ? textKeys.CHECKOUT_CONTACT_INFO_CREDIT_CHECK_HELPER()
                  : undefined
              }
              type="text"
              // defaultValue={ssn ?? ''}
              name="ssn"
              formikProps={formikProps}
              onChange={handleChange}
            />
            {hasEnabledCreditCheckInfo && <Spacer />}
          </div>
          <div>
            <SsnInput
              name="ssn"
              formikProps={formikProps}
              onFocus={() =>
                setIsShowingCreditCheckInfo(hasEnabledCreditCheckInfo)
              }
              onChange={handleChange}
            />
            {isShowingCreditCheckInfo && <CreditCheckInfo />}
          </div>
        </InputFieldsWrapper>
      </form>
      <HorizontalDivider />
    </Wrapper>
  )
}

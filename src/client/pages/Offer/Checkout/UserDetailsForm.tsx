import React, { useState, useEffect, useCallback } from 'react'
import * as Yup from 'yup'
import { FormikProps } from 'formik'
import { LocaleData } from 'l10n/locales'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { TextKeyMap } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { CreditCheckInfo } from '../../OfferNew/Checkout/CreditCheckInfo'
import { QuoteInput } from '../Introduction/DetailsModal/types'
import { TextInput, SsnInput } from './inputFields'

const debounce = (func: (...args: any[]) => any, timeout: number) => {
  let timer: number
  return function(this: any, ...args: any[]) {
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export const getCheckoutDetailsValidationSchema = (
  locale: LocaleData,
  textKeys: TextKeyMap,
  isPhoneNumberRequired?: boolean,
) =>
  Yup.object().shape({
    firstName: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    lastName: Yup.string().required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    email: Yup.string()
      .email(textKeys.GENERIC_ERROR_INPUT_FORMAT())
      .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    ssn: Yup.string()
      .typeError(textKeys.GENERIC_ERROR_INPUT_REQUIRED())
      .matches(locale.ssn.formatRegex, textKeys.GENERIC_ERROR_INPUT_FORMAT())
      .max(locale.ssn.length, textKeys.GENERIC_ERROR_INPUT_FORMAT())
      .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    ...(isPhoneNumberRequired
      ? {
          phoneNumber: Yup.string()
            .transform((phone) => phone.replace(/\s/g, ''))
            .matches(
              locale.phoneNumber.formatRegex,
              textKeys.GENERIC_ERROR_INPUT_FORMAT(),
            )
            .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
        }
      : {}),
  })

export const CheckoutDetailsForm: React.FC<{
  formikProps: FormikProps<QuoteInput>
}> = ({ formikProps }) => {
  const locale = useCurrentLocale()
  const { handleChange } = formikProps
  const [hasEnabledCreditCheckInfo, isPhoneNumberRequired] = useFeature([
    Features.CHECKOUT_CREDIT_CHECK,
    Features.COLLECT_PHONE_NUMBER_AT_CHECKOUT,
  ])
  const [isShowingCreditCheckInfo, setIsShowingCreditCheckInfo] = useState(
    false,
  )

  const {
    values: { ssn },
    initialValues,
    submitForm,
  } = formikProps

  const debouncedSubmitForm = useCallback(
    debounce(() => {
      submitForm()
    }, 500),
    [],
  )

  useEffect(() => {
    if (ssn !== initialValues.ssn) debouncedSubmitForm()
  }, [ssn, initialValues.ssn, debouncedSubmitForm])

  return (
    <form onSubmit={formikProps.handleSubmit}>
      <TextInput
        label="CHECKOUT_FIRSTNAME_LABEL"
        name="firstName"
        formikProps={formikProps}
        onChange={handleChange}
      />
      <TextInput
        label="CHECKOUT_LASTNAME_LABEL"
        name="lastName"
        formikProps={formikProps}
        onChange={handleChange}
      />
      <TextInput
        label="CHECKOUT_EMAIL_LABEL"
        placeholder="CHECKOUT_EMAIL_PLACEHOLDER"
        name="email"
        type="email"
        formikProps={formikProps}
        onChange={handleChange}
      />
      {isPhoneNumberRequired && (
        <TextInput
          label="CHECKOUT_PHONE_NUMBER_LABEL"
          name="phoneNumber"
          type="tel"
          formikProps={formikProps}
          onChange={handleChange}
          placeholder={locale.phoneNumber.placeholder}
          helperText="CHECKOUT_PHONE_NUMBER_HELPERTEXT"
        />
      )}
      <SsnInput
        name="ssn"
        formikProps={formikProps}
        onFocus={() => setIsShowingCreditCheckInfo(hasEnabledCreditCheckInfo)}
        onChange={handleChange}
      />
      {isShowingCreditCheckInfo && <CreditCheckInfo />}
    </form>
  )
}

import React, { useState, useEffect, useCallback } from 'react'
import * as Yup from 'yup'
import { FormikProps } from 'formik'
import { LocaleData } from 'l10n/locales'
import { useFeature, Features } from 'utils/hooks/useFeature'
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

export const getCheckoutDetailsValidationSchema = (locale: LocaleData) =>
  Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    ssn: Yup.string()
      .matches(locale.ssn.formatRegex)
      .max(locale.ssn.length)
      .required(),
  })

export const CheckoutDetailsForm: React.FC<{
  formikProps: FormikProps<QuoteInput>
}> = ({ formikProps }) => {
  const { handleChange } = formikProps
  const [hasEnabledCreditCheckInfo] = useFeature([
    Features.CHECKOUT_CREDIT_CHECK,
  ])
  const [isShowingCreditCheckInfo, setIsShowingCreditCheckInfo] = useState(
    false,
  )

  const {
    values: { firstName, lastName, email, ssn },
    initialValues,
    submitForm,
  } = formikProps

  // eslint-disable-line react-hooks/exhaustive-deps
  const debouncedSubmitForm = useCallback(
    debounce(() => {
      submitForm()
    }, 500),
    [],
  )

  useEffect(() => {
    if (ssn !== initialValues.ssn) debouncedSubmitForm()
  }, [firstName, lastName, email, ssn, initialValues, debouncedSubmitForm])

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

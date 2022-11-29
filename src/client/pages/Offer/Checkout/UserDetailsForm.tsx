import React, { useState } from 'react'
import * as Yup from 'yup'
import { FormikProps } from 'formik'
import { LocaleData } from 'l10n/locales'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { TextKeyMap } from 'utils/textKeys'
import { QuoteInput } from 'components/DetailsModal/types'
import { CreditCheckInfo } from './CreditCheckInfo'
import { TextInput, SsnInput } from './inputFields'

export const getCheckoutDetailsValidationSchema = (
  locale: LocaleData,
  textKeys: TextKeyMap,
) =>
  Yup.object().shape({
    firstName: Yup.string()
      .nullable(true)
      .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    lastName: Yup.string()
      .nullable(true)
      .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    email: Yup.string()
      .email(textKeys.GENERIC_ERROR_INPUT_FORMAT())
      .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
    ssn: Yup.string()
      .typeError(textKeys.GENERIC_ERROR_INPUT_REQUIRED())
      .matches(locale.ssn.formatRegex, textKeys.GENERIC_ERROR_INPUT_FORMAT())
      .max(locale.ssn.length, textKeys.GENERIC_ERROR_INPUT_FORMAT())
      .required(textKeys.GENERIC_ERROR_INPUT_REQUIRED()),
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

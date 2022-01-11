import styled from '@emotion/styled'
import React, { useState } from 'react'
import * as yup from 'yup'
import { LocaleLabel, locales } from 'l10n/locales'
import { RawInputField } from 'components/inputs'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import {
  WithEmailForm,
  WithSsnForm,
  WithFirstAndLastNameForm,
  WithPhoneForm,
} from 'pages/OfferNew/types'
import { TextKeyMap, useTextKeys } from 'utils/textKeys'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { CreditCheckInfo } from './CreditCheckInfo'

const HiddenSubmit = styled.input`
  display: none;
`

type Props = WithEmailForm &
  WithSsnForm &
  WithPhoneForm &
  WithFirstAndLastNameForm & {
    onSubmit?: () => void
    ssnBackendError: string | null
  }

export const emailValidation = yup
  .string()
  .email()
  .required()

export const nameValidation = yup.string().required()

export const phoneValidation = yup
  .string()
  .required()
  .min(10)

// TODO: replace these with one market agnostic CHECKOUT_SSN_LABEL + currentLocaleData.ssn.formatExample
export const getSsnLabel = (market: Market, textKeys: TextKeyMap): string => {
  switch (market) {
    case Market.Se:
      return textKeys.CHECKOUT_SSN_LABEL_SE()
    case Market.No:
      return textKeys.CHECKOUT_SSN_LABEL_NO()
    case Market.Dk:
      return textKeys.CHECKOUT_SSN_LABEL_DK()
  }
}

export const UserDetailsForm: React.FC<Props> = ({
  email: initialEmail,
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  isFirstAndLastNameVisible,
  onEmailChange,
  ssn: initialSsn,
  ssnBackendError,
  onSsnChange,
  onSubmit,
  phoneNumber: initialPhone,
  onPhoneChange,
}) => {
  const textKeys = useTextKeys()
  const [email, reallySetEmail] = useState(() => initialEmail)
  const [phoneNumber, reallySetPhone] = useState(() => initialPhone)
  const [hasFirstNameError, setHasFirstNameError] = useState(false)
  const [hasLastNameError, setHasLastNameError] = useState(false)
  const [hasEmailError, setHasEmailError] = useState(false)
  const [hasPhoneError, setHasPhoneError] = useState(false)
  const [ssn, reallySetSsn] = useState(() => initialSsn)
  const [isShowingCreditCheckInfo, setIsShowingCreditCheckInfo] = useState(
    false,
  )
  const [emailChangeTimout, setEmailChangeTimout] = useState<number | null>(
    null,
  )
  const [phoneChangeTimeout, setPhoneChangeTimeout] = useState<number | null>(
    null,
  )
  const [ssnChangeTimout, setSsnChangeTimout] = useState<number | null>(null)

  const market = useMarket()

  const locale = useCurrentLocale()
  const ssnMaxLength = locale.ssn.length
  const ssnFormatRegex = locale.ssn.formatRegex
  const [hasEnabledCreditCheckInfo, isPhoneNumberRequired] = useFeature([
    Features.CHECKOUT_CREDIT_CHECK,
    Features.COLLECT_PHONE_NUMBER_AT_CHECKOUT,
  ])

  const isValidSsn = (ssn: string) => {
    return ssnFormatRegex.test(ssn)
  }

  const ssnFormatExample = locale.ssn.formatExample

  const validateFirstName = (firstName: string) => {
    if (!nameValidation.isValidSync(firstName)) {
      setHasFirstNameError(true)
    }
  }

  const validateLastName = (lastName: string) => {
    if (!nameValidation.isValidSync(lastName)) {
      setHasLastNameError(true)
    }
  }

  const handleSsnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const nonNumbersRegex = /\D/
    const newSsn = value.replace(nonNumbersRegex, '')

    if (ssnChangeTimout) {
      window.clearTimeout(ssnChangeTimout)
      setSsnChangeTimout(null)
    }

    reallySetSsn(newSsn)
    setSsnChangeTimout(
      window.setTimeout(() => {
        if (isValidSsn(newSsn)) {
          onSsnChange(newSsn)
        }
      }, 500),
    )
  }

  const handleSsnBlur = () => {
    if (!isValidSsn(ssn) || ssn === initialSsn) {
      return
    }

    onSsnChange(ssn)
  }

  const setEmailDebounced = (newEmail: string) => {
    if (emailChangeTimout) {
      window.clearTimeout(emailChangeTimout)
      setEmailChangeTimout(null)
    }

    reallySetEmail(newEmail)
    setEmailChangeTimout(
      window.setTimeout(() => {
        if (emailValidation.isValidSync(newEmail)) {
          onEmailChange(newEmail)
        } else {
          setHasEmailError(true)
        }
      }, 300),
    )
  }

  const handlePhoneChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const phoneNumber = value
    if (phoneChangeTimeout) {
      window.clearTimeout(phoneChangeTimeout)
      setPhoneChangeTimeout(null)
    }
    reallySetPhone(phoneNumber)
    setPhoneChangeTimeout(
      window.setTimeout(() => {
        if (phoneValidation.isValidSync(phoneNumber)) {
          onPhoneChange(phoneNumber)
          setHasPhoneError(false)
        } else {
          setHasPhoneError(true)
        }
      }, 500),
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (onSubmit) {
          onSubmit()
        }
      }}
    >
      {isFirstAndLastNameVisible && (
        <>
          <RawInputField
            label={textKeys.CHECKOUT_FIRSTNAME_LABEL()}
            name="firstName"
            id="firstName"
            value={firstName}
            showErrorIcon={hasFirstNameError}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onFirstNameChange(event.target.value)
              validateFirstName(event.target.value)
            }}
          />

          <RawInputField
            label={textKeys.CHECKOUT_LASTNAME_LABEL()}
            name="lastName"
            id="lastName"
            value={lastName}
            showErrorIcon={hasLastNameError}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onLastNameChange(event.target.value)
              validateLastName(event.target.value)
            }}
          />
        </>
      )}

      <RawInputField
        label={textKeys.CHECKOUT_EMAIL_LABEL()}
        placeholder={textKeys.CHECKOUT_EMAIL_PLACEHOLDER()}
        name="email"
        id="email"
        type="email"
        value={email}
        errors={hasEmailError ? textKeys.SIGN_EMAIL_CHECK() : undefined}
        onChange={(e: React.ChangeEvent<any>) => {
          setEmailDebounced(e.target.value)
          setHasEmailError(false)
        }}
      />

      {isPhoneNumberRequired && (
        <>
          <RawInputField
            label={textKeys.CHECKOUT_PHONE_NUMBER_LABEL()}
            placeholder={locale.phoneNumber.placeholder}
            name="phoneNumber"
            id="phoneNumber"
            type="text"
            inputMode="numeric"
            maxLength={10}
            value={phoneNumber}
            errors={
              hasPhoneError ? textKeys.CHECKOUT_PHONE_NUMBER_ERROR() : undefined
            }
            onChange={handlePhoneChange}
            helperText={textKeys.CHECKOUT_PHONE_NUMBER_HELPERTEXT()}
          />
        </>
      )}

      <RawInputField
        label={getSsnLabel(market, textKeys)}
        placeholder={ssnFormatExample}
        name="ssn"
        id="ssn"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={ssnMaxLength}
        onFocus={() => setIsShowingCreditCheckInfo(true)}
        value={ssn}
        errors={ssnBackendError ? textKeys[ssnBackendError]() : undefined}
        onChange={handleSsnChange}
        onBlur={handleSsnBlur}
      />
      {hasEnabledCreditCheckInfo && isShowingCreditCheckInfo && (
        <CreditCheckInfo />
      )}
      <HiddenSubmit type="submit" />
    </form>
  )
}

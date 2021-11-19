import styled from '@emotion/styled'
import React, { useState } from 'react'
import * as yup from 'yup'
import { LocaleLabel, locales } from 'l10n/locales'
import { RawInputField } from 'components/inputs'
import {
  Market,
  useCurrentLocale,
  useMarket,
} from 'components/utils/CurrentLocale'
import {
  WithEmailForm,
  WithSsnForm,
  WithFirstAndLastNameForm,
} from 'pages/OfferNew/types'
import { TextKeyMap, useTextKeys } from 'utils/textKeys'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { CreditCheckInfo } from './CreditCheckInfo'

const HiddenSubmit = styled.input`
  display: none;
`

type Props = WithEmailForm &
  WithSsnForm &
  WithFirstAndLastNameForm & {
    onSubmit?: () => void
    ssnBackendError: string | null
  }

export const emailValidation = yup
  .string()
  .email()
  .required()

export const nameValidation = yup.string().required()

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
}) => {
  const textKeys = useTextKeys()
  const [email, reallySetEmail] = useState(() => initialEmail)
  const [hasFirstNameError, setHasFirstNameError] = useState<boolean>(false)
  const [hasLastNameError, setHasLastNameError] = useState<boolean>(false)
  const [hasEmailError, setHasEmailError] = useState<boolean>(false)
  const [ssn, reallySetSsn] = useState(() => initialSsn)
  const [isShowingCreditCheckInfo, setIsShowingCreditCheckInfo] = useState(
    false,
  )
  const [emailChangeTimout, setEmailChangeTimout] = useState<number | null>(
    null,
  )
  const [ssnChangeTimout, setSsnChangeTimout] = useState<number | null>(null)

  const market = useMarket()

  const currentLocale = useCurrentLocale()
  const currentLocaleData = locales[currentLocale as LocaleLabel]
  const ssnMaxLength = currentLocaleData.ssn.length
  const ssnFormatRegex = currentLocaleData.ssn.formatRegex

  const [hasEnabledCreditCheckInfo] = useFeature([
    Features.CHECKOUT_CREDIT_CHECK,
  ])

  const isValidSsn = (ssn: string) => {
    return ssnFormatRegex.test(ssn)
  }

  const ssnFormatExample = currentLocaleData.ssn.formatExample

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
            name="firstname"
            id="firstname"
            value={firstName}
            showErrorIcon={hasFirstNameError}
            onChange={(e: React.ChangeEvent<any>) => {
              onFirstNameChange(e.target.value)
              validateFirstName(e.target.value)
            }}
          />

          <RawInputField
            label={textKeys.CHECKOUT_LASTNAME_LABEL()}
            name="lastName"
            id="lastName"
            value={lastName}
            showErrorIcon={hasLastNameError}
            onChange={(e: React.ChangeEvent<any>) => {
              onLastNameChange(e.target.value)
              validateLastName(e.target.value)
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

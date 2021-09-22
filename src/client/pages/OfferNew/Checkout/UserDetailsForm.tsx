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
import { WithEmailForm, WithSsnForm } from 'pages/OfferNew/types'
import { TextKeyMap, useTextKeys } from 'utils/textKeys'
import { CreditCheckInfo } from './CreditCheckInfo'

const HiddenSubmit = styled.input`
  display: none;
`

type Props = WithEmailForm &
  WithSsnForm & { onSubmit?: () => void; ssnBackendError: string | null }

export const emailValidation = yup
  .string()
  .email()
  .required()

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
  onEmailChange,
  ssn: initialSsn,
  ssnBackendError,
  onSsnChange,
  onSubmit,
}) => {
  const textKeys = useTextKeys()
  const [email, reallySetEmail] = useState(() => initialEmail)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [ssn, setSsn] = useState(() => initialSsn)
  const [showCreditCheckInfo, setShowCreditCheckInfo] = useState(false)
  const [emailChangeTimout, setEmailChangeTimout] = useState<number | null>(
    null,
  )
  const [ssnChangeTimout, setSsnChangeTimout] = useState<number | null>(null)

  const market = useMarket()

  const currentLocale = useCurrentLocale()
  const currentLocaleData = locales[currentLocale as LocaleLabel]
  const ssnMaxLength = currentLocaleData.ssn.length
  const ssnFormatRegex = currentLocaleData.ssn.formatRegex

  const isValidSsn = (ssn: string) => {
    return ssnFormatRegex.test(ssn)
  }

  const ssnFormatExample = currentLocaleData.ssn.formatExample

  const handleSsnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    const nonNumbersRegex = /\D/
    const newSsn = value.replace(nonNumbersRegex, '')

    if (ssnChangeTimout) {
      window.clearTimeout(ssnChangeTimout)
      setSsnChangeTimout(null)
    }

    setSsn(newSsn)
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
      <RawInputField
        label={textKeys.CHECKOUT_EMAIL_LABEL()}
        placeholder={textKeys.CHECKOUT_EMAIL_PLACEHOLDER()}
        name="email"
        id="email"
        type="email"
        value={email}
        errors={emailError ? textKeys.SIGN_EMAIL_CHECK() : undefined}
        onChange={(e: React.ChangeEvent<any>) => {
          setEmailDebounced(e.target.value)
          setEmailError(false)
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
        onFocus={() => setShowCreditCheckInfo(true)}
        value={ssn}
        errors={ssnBackendError ? textKeys[ssnBackendError]() : undefined}
        onChange={handleSsnChange}
        onBlur={handleSsnBlur}
      />
      {market === Market.No && showCreditCheckInfo && <CreditCheckInfo />}
      <HiddenSubmit type="submit" />
    </form>
  )
}

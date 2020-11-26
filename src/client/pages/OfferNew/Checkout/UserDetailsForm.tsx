import styled from '@emotion/styled'
import React from 'react'
import * as yup from 'yup'
import { RawInputField } from 'components/inputs'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { WithEmailForm, WithSsnForm } from 'pages/OfferNew/types'
import { createSsnValidator } from 'pages/OfferNew/utils'
import { useTextKeys } from 'utils/textKeys'

const BottomSpacedRawInputField = styled(RawInputField)`
  margin-bottom: 1rem;
`
const HiddenSubmit = styled.input`
  display: none;
`

type Props = WithEmailForm & WithSsnForm & { onSubmit?: () => void }

export const emailValidation = yup
  .string()
  .email()
  .required()

export const UserDetailsForm: React.FC<Props> = ({
  email: initialEmail,
  onEmailChange,
  ssn: initialSsn,
  onSsnChange,
  onSubmit,
}) => {
  const textKeys = useTextKeys()
  const [email, reallySetEmail] = React.useState(() => initialEmail)
  const [emailError, setEmailError] = React.useState<boolean>(false)
  const [ssn, reallySetSsn] = React.useState(() => initialSsn)
  const [emailChangeTimout, setEmailChangeTimout] = React.useState<
    number | null
  >(null)
  const [ssnChangeTimout, setSsnChangeTimout] = React.useState<number | null>(
    null,
  )

  // FIXME should we pick which ssn validation to use in a different way? or not really?
  const market = useMarket()
  const isValidSsn = createSsnValidator(market!)

  const setSsn = (newSsn: string) => {
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
      <BottomSpacedRawInputField
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

      {(market === Market.No || market === Market.Dk) && (
        <BottomSpacedRawInputField
          label={textKeys.CHECKOUT_SSN_LABEL()}
          placeholder={textKeys.CHECKOUT_SSN_PLACEHOLDER()}
          name="ssn"
          id="ssn"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={ssn}
          // errors={ssnError ? textKeys.SIGN_SSN_CHECK() : undefined} TODO error handling?
          onChange={(e: React.ChangeEvent<any>) => {
            setSsn(e.target.value)
          }}
          onBlur={() => {
            if (!isValidSsn(ssn) || ssn === initialSsn) {
              return
            }

            onSsnChange(ssn)
          }}
        />
      )}
      <HiddenSubmit type="submit" />
    </form>
  )
}

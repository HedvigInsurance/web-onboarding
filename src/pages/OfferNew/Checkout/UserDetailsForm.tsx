import { TextInput } from 'new-components/inputs'
import { WithEmailForm } from 'pages/OfferNew/types'
import React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import * as yup from 'yup'

type Props = WithEmailForm

export const emailValidation = yup
  .string()
  .email()
  .required()

export const UserDetailsForm: React.FC<Props> = ({ email, onEmailChange }) => {
  const textKeys = useTextKeys()
  const [emailError, setEmailError] = React.useState<boolean>(false)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <TextInput
        label={textKeys.CHECKOUT_EMAIL_LABEL()}
        placeholder={textKeys.CHECKOUT_EMAIL_PLACEHOLDER()}
        name="email"
        id="email"
        type="email"
        value={email}
        errors={emailError ? textKeys.SIGN_EMAIL_CHECK() : undefined}
        onChange={(e) => {
          onEmailChange(e.target.value)
          setEmailError(false)
        }}
        onBlur={() =>
          emailValidation.validate(email).catch(() => {
            setEmailError(true)
          })
        }
      />
    </form>
  )
}

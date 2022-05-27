import React from 'react'
import { Redirect } from 'react-router-dom'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

type Props = {
  connectPayment?: boolean
}

export const CheckoutSuccessRedirect: React.FC<Props> = ({
  connectPayment = true,
}) => {
  const { path: localePath } = useCurrentLocale()

  return connectPayment ? (
    <Redirect to={`/${localePath}/new-member/connect-payment`} />
  ) : (
    <Redirect to={`/${localePath}/new-member/download`} />
  )
}

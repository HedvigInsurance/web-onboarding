import React from 'react'
import { Redirect } from 'react-router-dom'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

export const CheckoutSuccessRedirect = () => {
  const { path: localePath } = useCurrentLocale()
  return <Redirect to={`/${localePath}/new-member/connect-payment`} />
}

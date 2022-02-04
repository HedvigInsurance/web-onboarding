import React from 'react'
import { useParams } from 'react-router-dom'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { CheckoutPageWrapper } from 'components/checkout/CheckoutPageWrapper'
import { Footer } from 'components/checkout/Footer'

export const CheckoutDetails = () => {
  const textKeys = useTextKeys()
  const { path: localePath } = useCurrentLocale()
  const { id: quoteCartId } = useParams<{ id: string }>()

  const paymentPageLink = `/${localePath}/new-member/checkout/payment/${quoteCartId}`

  return (
    <CheckoutPageWrapper>
      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_CONTINUE_TO_PAYMENT()}
        linkTo={paymentPageLink}
      />
    </CheckoutPageWrapper>
  )
}

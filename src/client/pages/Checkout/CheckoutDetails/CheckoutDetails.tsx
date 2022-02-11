import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'

export const CheckoutDetails = () => {
  const textKeys = useTextKeys()
  const { path: localePath } = useCurrentLocale()
  const { quoteCartId } = useQuoteCartIdFromUrl()

  const paymentPageLink = `/${localePath}/new-member/checkout/payment/${quoteCartId}`

  return (
    <CheckoutPageWrapper>
      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_CONTINUE_TO_PAYMENT()}
        buttonLinkTo={paymentPageLink}
      />
    </CheckoutPageWrapper>
  )
}

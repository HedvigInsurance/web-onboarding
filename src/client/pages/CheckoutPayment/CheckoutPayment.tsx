import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { CheckoutPageWrapper } from 'components/checkout/CheckoutPageWrapper'
import { Footer } from 'components/checkout/Footer'

export const CheckoutPayment = () => {
  const textKeys = useTextKeys()

  return (
    <CheckoutPageWrapper>
      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_COMPLETE_PURCHASE()}
        buttonOnClick={() => {
          console.log('click')
        }}
      />
    </CheckoutPageWrapper>
  )
}

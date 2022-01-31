import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { CheckoutPageWrapper } from 'components/checkout/CheckoutPageWrapper'
import { Footer } from 'components/checkout/Footer'

export const CheckoutDetails = () => {
  const textKeys = useTextKeys()

  return (
    <CheckoutPageWrapper>
      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_CONTINUE_TO_PAYMENT()}
        buttonOnClick={() => {
          console.log('click')
        }}
      />
    </CheckoutPageWrapper>
  )
}

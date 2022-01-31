import React from 'react'
import { CheckoutPageWrapper } from 'components/checkout/CheckoutPageWrapper'
import { Footer } from 'components/checkout/Footer'

const BUTTON_TEXT_PLACEHOLDER = 'Continue to payment'

export const CheckoutDetails = () => {
  return (
    <CheckoutPageWrapper>
      <Footer
        buttonText={BUTTON_TEXT_PLACEHOLDER}
        buttonOnClick={() => {
          console.log('click')
        }}
      />
    </CheckoutPageWrapper>
  )
}

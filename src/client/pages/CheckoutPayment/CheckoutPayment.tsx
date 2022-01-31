import React from 'react'
import { CheckoutPageWrapper } from 'components/checkout/CheckoutPageWrapper'
import { Footer } from 'components/checkout/Footer'

const BUTTON_TEXT_PLACEHOLDER = 'Complete purchase'

export const CheckoutPayment = () => {
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

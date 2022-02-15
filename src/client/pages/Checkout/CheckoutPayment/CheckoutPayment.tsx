import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentDetails } from './PaymentDetails/PaymentDetails'

export const CheckoutPayment = () => {
  const textKeys = useTextKeys()

  return (
    <CheckoutPageWrapper>
      <PaymentDetails />
      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_COMPLETE_PURCHASE()}
        buttonOnClick={() => {
          console.log('click')
        }}
      />
    </CheckoutPageWrapper>
  )
}

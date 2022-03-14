import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'

export const CheckoutPayment = () => {
  const textKeys = useTextKeys()
  const data = useQuoteCartData()
  if (!data) {
    return null
  }
  const priceData = data.priceData
  return (
    <CheckoutPageWrapper>
      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_COMPLETE_PURCHASE()}
        buttonOnClick={() => {
          console.log('click')
        }}
        priceData={priceData}
      />
    </CheckoutPageWrapper>
  )
}

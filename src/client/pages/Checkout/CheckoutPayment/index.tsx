import React from 'react'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { CheckoutPayment } from './CheckoutPayment'

export const Checkout = () => {
  const data = useQuoteCartData()

  if (!data) {
    return null
  }

  return <CheckoutPayment data={data} />
}

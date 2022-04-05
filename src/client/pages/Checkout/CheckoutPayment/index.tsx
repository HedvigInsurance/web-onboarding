import React from 'react'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { CheckoutPayment } from './CheckoutPayment'

export const Checkout = () => {
  const data = useQuoteCartData()
  if (!data) return null

  const { bundleVariants, priceData, quoteCartId, mainQuote } = data

  return (
    <CheckoutPayment
      bundleVariants={bundleVariants}
      quoteCartId={quoteCartId}
      priceData={priceData}
      mainQuote={mainQuote}
    />
  )
}

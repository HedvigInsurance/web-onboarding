import React from 'react'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { CheckoutPayment } from './CheckoutPayment'

export const Checkout = () => {
  const data = useQuoteCartData()
  if (!data) return null

  const { bundleVariants, selectedQuoteBundleVariant } = data

  return (
    <CheckoutPayment
      data={data}
      bundleVariants={bundleVariants}
      selectedQuoteBundleVariant={selectedQuoteBundleVariant}
    />
  )
}

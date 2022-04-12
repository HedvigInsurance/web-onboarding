import React from 'react'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { LoadingPage } from 'components/LoadingPage'
import { CheckoutErrorModal } from '../shared/ErrorModal'
import { CheckoutPayment } from './CheckoutPayment'

export const Checkout = () => {
  const data = useQuoteCartData()
  if (!data || data.loading) {
    return <LoadingPage loading />
  }

  const {
    bundleVariants,
    priceData,
    quoteCartId,
    mainQuote,
    quoteIds,
    selectedQuoteBundleVariant,
    checkoutStatus,
    error,
    loading,
  } = data

  const onRetry = () => {
    window.location.reload()
    return false
  }

  if (error) {
    console.error('Quote cart data error:', error.message, error)
    return <CheckoutErrorModal isVisible onRetry={onRetry} />
  }

  return (
    <CheckoutPayment
      bundleVariants={bundleVariants}
      quoteCartId={quoteCartId}
      priceData={priceData}
      mainQuote={mainQuote}
      quoteIds={quoteIds}
      selectedQuoteBundleVariant={selectedQuoteBundleVariant}
      checkoutStatus={checkoutStatus}
    />
  )
}

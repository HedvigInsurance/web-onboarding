import React, { useEffect } from 'react'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { LoadingPage } from 'components/LoadingPage'
import { CheckoutErrorModal, onRetry } from '../shared/ErrorModal'
import { apolloClient as realApolloClient } from '../../../apolloClient'
import { CheckoutPayment } from './CheckoutPayment'

export const Checkout = () => {
  const { data, error } = useQuoteCartData()

  useEffect(() => {
    // clean up existing auth tokens
    if (realApolloClient) {
      delete realApolloClient.httpLink.options.headers.authorization
    }
  }, [])

  if (data === null) {
    return (
      <>
        <LoadingPage loading />
        <CheckoutErrorModal isVisible={error !== undefined} onRetry={onRetry} />
      </>
    )
  }

  const {
    bundleVariants,
    priceData,
    quoteCartId,
    mainQuote,
    quoteIds,
    checkoutStatus,
  } = data

  return (
    <>
      <CheckoutPayment
        bundleVariants={bundleVariants}
        quoteCartId={quoteCartId}
        priceData={priceData}
        mainQuote={mainQuote}
        quoteIds={quoteIds}
        checkoutStatus={checkoutStatus}
      />

      <CheckoutErrorModal isVisible={error !== undefined} onRetry={onRetry} />
    </>
  )
}

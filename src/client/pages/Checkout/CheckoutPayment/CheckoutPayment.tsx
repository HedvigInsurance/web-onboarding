import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { ErrorModal } from 'components/ErrorModal'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { ContactInformation } from './ContactInformation/ContactInformation'
import { PaymentDetails } from './PaymentDetails/PaymentDetails'

export const CheckoutPayment = () => {
  const textKeys = useTextKeys()
  const data = useQuoteCartData()

  if (data.error) {
    console.error('Quote cart data error:', data.error.message, data.error)
    return (
      <ErrorModal isVisible>TODO: Error text key: Error message</ErrorModal>
    )
  }

  if (data.loading) {
    return null // TODO: Use loading component
  }

  const priceData = data.priceData
  const userDetails = data.userDetails

  return (
    <CheckoutPageWrapper>
      <ContactInformation {...userDetails} />
      <PaymentDetails />
      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_CONTINUE_TO_PAYMENT()}
        buttonOnClick={() => {
          console.log('click')
        }}
      >
        <PaymentInfo {...priceData} />
      </Footer>
    </CheckoutPageWrapper>
  )
}

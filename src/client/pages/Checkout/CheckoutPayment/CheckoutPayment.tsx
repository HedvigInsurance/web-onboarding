import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { CheckoutIntercomVariation } from '../shared/CheckoutIntercomVariation'
import { ContactInformation } from './ContactInformation/ContactInformation'
import { PaymentDetails } from './PaymentDetails/PaymentDetails'

export const CheckoutPayment = () => {
  const textKeys = useTextKeys()
  const data = useQuoteCartData()
  if (!data) {
    return null
  }
  const priceData = data.priceData
  const userDetails = data.userDetails

  return (
    <CheckoutPageWrapper>
      <ContactInformation {...userDetails} />
      <PaymentDetails />
      <CheckoutIntercomVariation />
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

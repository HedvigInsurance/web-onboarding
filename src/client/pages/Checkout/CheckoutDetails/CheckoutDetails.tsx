import React from 'react'

import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useTextKeys } from 'utils/textKeys'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { CheckoutIntercomVariation } from '../shared/CheckoutIntercomVariation'
import { PageSection } from './components/PageSection'
import { QuoteDetails } from './components/QuoteDetails/QuoteDetails'
import { StartDateSection } from './components/StartDateSection/StartDateSection'
import { YourPlan } from './components/YourPlan/YourPlan'

export const CheckoutDetails = () => {
  const textKeys = useTextKeys()
  const { path: localePath } = useCurrentLocale()
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const data = useQuoteCartData()
  if (!data) {
    return null
  }
  const priceData = data.priceData
  const quoteDetails = data.quoteDetails
  const paymentPageLink = `/${localePath}/new-member/checkout/payment/${quoteCartId}`

  return (
    <CheckoutPageWrapper footerMargin="small">
      <PageSection>
        <YourPlan {...priceData} />
        <StartDateSection />
        <QuoteDetails groups={quoteDetails} />
        <CheckoutIntercomVariation />
      </PageSection>

      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_CONTINUE_TO_PAYMENT()}
        buttonLinkTo={paymentPageLink}
      >
        <PaymentInfo {...priceData} />
      </Footer>
    </CheckoutPageWrapper>
  )
}

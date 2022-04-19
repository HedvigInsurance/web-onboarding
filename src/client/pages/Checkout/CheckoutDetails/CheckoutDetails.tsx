import React, { useEffect } from 'react'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useTextKeys } from 'utils/textKeys'
import { LoadingPage } from 'components/LoadingPage'
import { EventName } from 'utils/tracking/gtm'
import { trackCheckoutEvent } from 'utils/tracking/trackCheckoutEvent'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { CheckoutIntercomVariation } from '../shared/CheckoutIntercomVariation'
import { CheckoutErrorModal } from '../shared/ErrorModal'
import { YourPlan } from './components/YourPlan/YourPlan'
import { QuoteDetails } from './components/QuoteDetails/QuoteDetails'
import { PageSection } from './components/PageSection'
import { StartDateSection } from './components/StartDateSection/StartDateSection'

export const CheckoutDetails = () => {
  const textKeys = useTextKeys()
  const { path: localePath } = useCurrentLocale()
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const data = useQuoteCartData()

  useEffect(() => {
    if (data) {
      trackCheckoutEvent(EventName.CheckoutOpen, data)
    }
  }, [data, quoteCartId])

  if (!data || data.loading) {
    return <LoadingPage loading />
  }
  const onRetry = () => {
    window.location.reload()
    return false
  }

  if (data.error) {
    console.error('Quote cart data error:', data.error.message, data.error)
    return <CheckoutErrorModal isVisible onRetry={onRetry} />
  }

  const priceData = data.priceData
  const quoteDetails = data.quoteDetails
  const paymentPageLink = `/${localePath}/new-member/checkout/payment/${quoteCartId}`

  return (
    <CheckoutPageWrapper>
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

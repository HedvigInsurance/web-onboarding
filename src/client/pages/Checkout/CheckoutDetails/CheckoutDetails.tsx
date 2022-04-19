import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { LoadingPage } from 'components/LoadingPage'
import { getUniqueQuotesFromVariantList } from 'pages/OfferNew/utils'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { CheckoutErrorModal } from '../shared/ErrorModal'
import { YourPlan } from './components/YourPlan/YourPlan'
import { QuoteDetails } from './components/QuoteDetails/QuoteDetails'
import { PageSection } from './components/PageSection'
import { StartDateSection } from './components/StartDateSection/StartDateSection'
import { DocumentLinks } from './components/DocumentLinks'

export const CheckoutDetails = () => {
  const textKeys = useTextKeys()
  const { path: localePath } = useCurrentLocale()
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const data = useQuoteCartData()

  const onRetry = () => {
    window.location.reload()
    return false
  }

  if (data.error) {
    console.error('Quote cart data error:', data.error.message, data.error)
    return <CheckoutErrorModal isVisible onRetry={onRetry} />
  }

  if (data.loading) {
    return <LoadingPage loading />
  }

  const priceData = data.priceData
  const quoteDetails = data.quoteDetails
  const bundleVariants = data.bundleVariants
  const allQuotes = getUniqueQuotesFromVariantList(bundleVariants)
  const paymentPageLink = `/${localePath}/new-member/checkout/payment/${quoteCartId}`
  return (
    <CheckoutPageWrapper>
      <PageSection>
        <YourPlan {...priceData} />
        <StartDateSection />
        <QuoteDetails
          groups={quoteDetails}
          quoteCartId={quoteCartId}
          allQuotes={allQuotes}
        />
        <DocumentLinks allQuotes={allQuotes} />
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

import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { StartDate } from '../../Offer/Introduction/Sidebar/StartDate'
import { YourPlan } from './components/YourPlan/YourPlan'
import { QuoteDetails } from './components/QuoteDetails/QuoteDetails'
import { PageSection } from './components/PageSection'
import { SubSection } from './components/SubSection'

export const CheckoutDetails = () => {
  const textKeys = useTextKeys()
  const { path: localePath } = useCurrentLocale()
  const { quoteCartId } = useQuoteCartIdFromUrl()

  const paymentPageLink = `/${localePath}/new-member/checkout/payment/${quoteCartId}`
  console.log(quoteCartId)
  return (
    <CheckoutPageWrapper>
      <PageSection>
        <YourPlan />
        <SubSection headlineText="Your plan">
          <StartDate quoteCartId={quoteCartId} modal size="sm" />
        </SubSection>
        <QuoteDetails />
      </PageSection>

      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_CONTINUE_TO_PAYMENT()}
        buttonLinkTo={paymentPageLink}
      />
    </CheckoutPageWrapper>
  )
}

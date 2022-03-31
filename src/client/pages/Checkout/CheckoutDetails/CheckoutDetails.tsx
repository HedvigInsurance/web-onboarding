import React from 'react'
import styled from '@emotion/styled'
import { Intercom } from 'utils/Intercom'

import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useTextKeys } from 'utils/textKeys'
import { BREAKPOINTS, MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { PageSection } from './components/PageSection'
import { QuoteDetails } from './components/QuoteDetails/QuoteDetails'
import { StartDateSection } from './components/StartDateSection/StartDateSection'
import { YourPlan } from './components/YourPlan/YourPlan'

const TextLinkContainer = styled.div({
  textAlign: 'center',
  [MEDIUM_SCREEN_MEDIA_QUERY]: {
    display: 'none',
  },
})
const IntercomCheckoutVariation = () => (
  <>
    <Intercom.ShowOnScrollBehaviour />
    <Intercom.InjectedStyles
      style={{
        bottom: '87px!important',
        display: 'none',
        [MEDIUM_SCREEN_MEDIA_QUERY]: {
          display: 'block',
        },
      }}
    />
    <TextLinkContainer>
      <Intercom.TextLinkVariation />
    </TextLinkContainer>
  </>
)
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
    <CheckoutPageWrapper>
      <PageSection>
        <YourPlan {...priceData} />
        <StartDateSection />
        <QuoteDetails groups={quoteDetails} />
        <IntercomCheckoutVariation />
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

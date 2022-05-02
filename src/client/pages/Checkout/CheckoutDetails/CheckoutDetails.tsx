import React, { useEffect, useState } from 'react'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'

import { LoadingPage } from 'components/LoadingPage'
import { getUniqueQuotesFromVariantList } from 'pages/OfferNew/utils'
import { DetailsModal } from 'components/DetailsModal'
import { EventName } from 'utils/tracking/gtm'
import { useTrackOfferEvent } from 'utils/tracking/trackOfferEvent'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { CheckoutErrorModal, onRetry } from '../shared/ErrorModal'
import { CheckoutIntercomVariation } from '../shared/CheckoutIntercomVariation'
import { YourPlan } from './components/YourPlan/YourPlan'
import { QuoteDetails } from './components/QuoteDetails/QuoteDetails'
import { PageSection } from './components/PageSection'
import { StartDateSection } from './components/StartDateSection/StartDateSection'
import { DocumentLinks } from './components/DocumentLinks'

export const CheckoutDetails = () => {
  const textKeys = useTextKeys()

  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false)

  const { path: localePath } = useCurrentLocale()

  const trackOfferEvent = useTrackOfferEvent()
  const data = useQuoteCartData()

  const { quoteCartId } = useQuoteCartIdFromUrl()

  useEffect(() => window.scrollTo(0, 0), [])

  useEffect(() => trackOfferEvent({ eventName: EventName.CheckoutOpen }), [
    trackOfferEvent,
  ])

  if (data?.error) {
    console.error('Quote cart data error: no data')
    return <CheckoutErrorModal isVisible onRetry={onRetry} />
  }
  if (!data || data.loading) {
    return <LoadingPage loading />
  }

  const handleClickBackButton = () => {
    trackOfferEvent({ eventName: EventName.CheckoutOpenGoBack })
  }

  const handleOnClick = () => {
    trackOfferEvent({
      eventName: EventName.ButtonClick,
      options: { buttonId: 'continue_to_payment' },
    })
  }

  const priceData = data.priceData
  const quoteDetails = data.quoteDetails
  const bundleVariants = data.bundleVariants
  const allQuotes = getUniqueQuotesFromVariantList(bundleVariants)
  const paymentPageLink = `/${localePath}/new-member/checkout/payment/${quoteCartId}`
  return (
    <CheckoutPageWrapper handleClickBackButton={handleClickBackButton}>
      <PageSection>
        <YourPlan {...priceData} />
        <StartDateSection />
        <QuoteDetails
          groups={quoteDetails}
          onEditInfoButtonClick={() => setDetailsModalIsOpen(true)}
        />
        <DocumentLinks allQuotes={allQuotes} />
        <CheckoutIntercomVariation />
      </PageSection>
      <DetailsModal
        quoteCartId={quoteCartId}
        allQuotes={allQuotes}
        isVisible={detailsModalIsOpen}
        onClose={() => setDetailsModalIsOpen(false)}
      />
      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_CONTINUE_TO_PAYMENT()}
        buttonLinkTo={paymentPageLink}
        onClick={handleOnClick}
      >
        <PaymentInfo {...priceData} />
      </Footer>
    </CheckoutPageWrapper>
  )
}

import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useHistory } from 'react-router-dom'
import { useTrackOfferEvent } from 'utils/tracking/hooks/useTrackOfferEvent'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'

import { LoadingPage } from 'components/LoadingPage'
import { getUniqueQuotesFromVariantList } from 'pages/OfferNew/utils'
import { DetailsModal } from 'components/DetailsModal'
import { EventName } from 'utils/tracking/gtm/types'

import { useScrollToTop } from 'utils/hooks/useScrollToTop'
import { MEDIUM_LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
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

const CheckoutDetailsWrapper = styled(CheckoutPageWrapper)`
  background: ${colorsV3.gray200};

  ${MEDIUM_LARGE_SCREEN_MEDIA_QUERY} {
    background: none;
  }
`

export const CheckoutDetails = () => {
  const textKeys = useTextKeys()

  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false)

  const { path: localePath } = useCurrentLocale()

  const trackOfferEvent = useTrackOfferEvent()
  const data = useQuoteCartData()

  const { quoteCartId } = useQuoteCartIdFromUrl()

  const history = useHistory()

  useScrollToTop()

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
    const offerPageLink = `/${localePath}/new-member/offer/${quoteCartId}`
    trackOfferEvent({ eventName: EventName.CheckoutOpenGoBack })
    history.push(offerPageLink)
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
    <CheckoutDetailsWrapper handleClickBackButton={handleClickBackButton}>
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
    </CheckoutDetailsWrapper>
  )
}

import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useHistory, useLocation } from 'react-router-dom'
import { useTrackOfferEvent } from 'utils/tracking/hooks/useTrackOfferEvent'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'

import { LoadingPage } from 'components/LoadingPage'
import { DetailsModal } from 'components/DetailsModal'
import { EventName } from 'utils/tracking/gtm/types'

import { useScrollToTop } from 'utils/hooks/useScrollToTop'
import { MEDIUM_LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useSendDatadogAction } from 'utils/tracking/hooks/useSendDatadogAction'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { CheckoutErrorModal, onRetry } from '../shared/ErrorModal'
import { CheckoutIntercomVariation } from '../shared/CheckoutIntercomVariation'
import { useStartDateProps } from '../../Offer/Introduction/Sidebar/StartDate'
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

  const sendDatadogAction = useSendDatadogAction()
  const trackOfferEvent = useTrackOfferEvent()
  const { data, error } = useQuoteCartData()
  const { quoteCartId } = useQuoteCartIdFromUrl()

  const history = useHistory()
  const { search } = useLocation()
  const startDateProps = useStartDateProps()
  useScrollToTop()

  useEffect(() => trackOfferEvent({ eventName: EventName.CheckoutOpen }), [
    trackOfferEvent,
  ])

  if (data === null) {
    return (
      <>
        <LoadingPage loading />
        <CheckoutErrorModal
          isVisible={error !== undefined}
          onRetry={onRetry}
          isManualReviewRequired={false}
        />
      </>
    )
  }

  const handleClickBackButton = () => {
    const offerPageLink = `/${localePath}/new-member/offer/${quoteCartId}${search}`
    trackOfferEvent({ eventName: EventName.CheckoutOpenGoBack })
    history.push(offerPageLink)
  }

  const handleOnClick = () => {
    trackOfferEvent({
      eventName: EventName.ButtonClick,
      options: { buttonId: 'continue_to_payment' },
    })
    sendDatadogAction('checkout_payment')
  }

  const priceData = data.priceData
  const quoteDetails = data.quoteDetails
  const allQuotes = data.selectedQuoteBundleVariant.bundle.quotes
  const paymentPageLink = `/${localePath}/new-member/checkout/payment/${quoteCartId}${search}`

  return (
    <CheckoutDetailsWrapper handleClickBackButton={handleClickBackButton}>
      <PageSection>
        <YourPlan {...priceData} />
        <StartDateSection {...startDateProps} modal size="sm" />
        <QuoteDetails
          groups={quoteDetails}
          onEditInfoButtonClick={() => setDetailsModalIsOpen(true)}
        />
        <DocumentLinks allQuotes={allQuotes} />
        <CheckoutIntercomVariation />
      </PageSection>
      <DetailsModal
        allQuotes={allQuotes}
        quoteCartId={quoteCartId}
        isVisible={detailsModalIsOpen}
        onClose={() => setDetailsModalIsOpen(false)}
      />
      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_CONTINUE_TO_PAYMENT()}
        buttonLinkTo={paymentPageLink}
        onClick={handleOnClick}
        isLoading={startDateProps.isLoading}
      >
        <PaymentInfo {...priceData} />
      </Footer>

      <CheckoutErrorModal
        isVisible={error !== undefined}
        onRetry={onRetry}
        isManualReviewRequired={false}
      />
    </CheckoutDetailsWrapper>
  )
}

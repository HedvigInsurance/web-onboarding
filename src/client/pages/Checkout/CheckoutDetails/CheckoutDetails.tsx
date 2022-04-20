import React, { useEffect } from 'react'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useTextKeys } from 'utils/textKeys'
import { LoadingPage } from 'components/LoadingPage'
import { EventName } from 'utils/tracking/gtm'
import {
  getSelectedBundleVariant,
  getMonthlyCostDeductionIncentive,
} from 'api/quoteCartQuerySelectors'
import { useQuoteCartQuery } from 'data/graphql'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import { trackOfferEvent } from 'utils/tracking/trackOfferEvent'
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
  const { path: localePath, isoLocale } = useCurrentLocale()
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const data = useQuoteCartData()

  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()

  const { data: quoteCartQueryData } = useQuoteCartQuery({
    variables: {
      id: quoteCartId,
      locale: isoLocale,
    },
  })

  const isReferralCodeUsed =
    getMonthlyCostDeductionIncentive(quoteCartQueryData) !== undefined

  const selectedBundleVariant = getSelectedBundleVariant(
    quoteCartQueryData,
    selectedInsuranceTypes,
  )

  if (selectedBundleVariant) {
    trackOfferEvent(
      EventName.CheckoutOpen,
      selectedBundleVariant.bundle,
      isReferralCodeUsed,
      {
        quoteCartId,
      },
    )
  }

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

import { History } from 'history'
import { SemanticEvents } from 'quepasa'
import React, { useEffect, useCallback } from 'react'
import { useHistory, useRouteMatch, RouteComponentProps } from 'react-router'
import { LoadingPage } from 'components/LoadingPage'
import {
  useQuoteCartQuery,
  QuoteBundleVariant,
  CheckoutStatus,
  CheckoutMethod,
} from 'data/graphql'
import { EventName } from 'utils/tracking/gtm/types'
import { getUtmParamsFromCookie } from 'utils/tracking/gtm/helpers'
import { localePathPattern } from 'l10n/localePathPattern'
import { Features, useFeature } from 'utils/hooks/useFeature'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { LocaleLabel } from 'l10n/locales'
import {
  getSelectedBundleVariant,
  getCheckoutStatus,
  getCheckoutMethod,
  getPossibleVariations,
  getCampaign,
  getMonthlyCostDeductionIncentive,
  isCarInsuranceType,
} from 'api/quoteCartQuerySelectors'
import { useTrackSegmentEvent } from 'utils/tracking/hooks/useTrackSegmentEvent'
import { useTrackOfferEvent } from 'utils/tracking/hooks/useTrackOfferEvent'
import {
  getOfferData,
  getUniqueQuotesFromVariantList,
  isOfferDataAvailable,
  getInsuranceTypesFromBundleVariant,
  getTypeOfContractFromBundleVariant,
} from '../OfferNew/utils'
import { AppPromotionSection } from '../OfferNew/AppPromotionSection'
import { FaqSection } from '../OfferNew/FaqSection'
import { Perils } from '../OfferNew/Perils'
import { InsuranceSelector } from '../OfferNew/InsuranceSelector'
import { SetupFailedModal } from '../Embark/ErrorModal'
import { apolloClient as realApolloClient } from '../../apolloClient'
import { Introduction } from './Introduction'
import { Checkout } from './Checkout'
import { PageWrapper } from './PageWrapper'
import { CheckoutSuccessRedirect } from './CheckoutSuccessRedirect'

function isValidCheckoutMethod(
  checkoutMethod: CheckoutMethod | undefined,
): checkoutMethod is CheckoutMethod {
  return checkoutMethod !== undefined
}

function isQuoteCartFull(
  selectedBundleVariant: QuoteBundleVariant | undefined,
): selectedBundleVariant is QuoteBundleVariant {
  return selectedBundleVariant !== undefined
}

const createToggleCheckout = (
  history: History<any>,
  quoteCartId: string,
  locale?: LocaleLabel,
) => (isOpen: boolean) => {
  if (isOpen) {
    history.replace(
      `/${locale}/new-member/sign/${quoteCartId}${history.location.search}`,
    )
  } else {
    history.replace(
      `/${locale}/new-member/offer/${quoteCartId}${history.location.search}`,
    )
  }
}

type OfferPageProps = RouteComponentProps<{ id: string }>

function getNetAmount(bundleVariant: QuoteBundleVariant) {
  return bundleVariant.bundle.bundleCost.monthlyNet
}

export const OfferPage = ({
  match: {
    params: { id: quoteCartId },
  },
}: OfferPageProps) => {
  const { isoLocale, path: pathLocale } = useCurrentLocale()
  const [isInsuranceToggleEnabled] = useFeature([
    Features.OFFER_PAGE_INSURANCE_TOGGLE,
  ])
  const [
    selectedInsuranceTypes,
    setSelectedInsuranceTypes,
  ] = useSelectedInsuranceTypes()

  const history = useHistory()

  useEffect(() => {
    // clean up existing auth tokens
    if (realApolloClient) {
      delete realApolloClient.httpLink.options.headers.authorization
    }
  }, [])

  const {
    data: quoteCartQueryData,
    loading: isLoadingQuoteCart,
    error: quoteCartError,
    refetch: refetchQuoteCart,
  } = useQuoteCartQuery({
    variables: {
      id: quoteCartId,
      locale: isoLocale,
    },
  })

  const checkoutMatch = useRouteMatch(
    `${localePathPattern}/new-member/sign/${quoteCartId}`,
  )

  const selectedBundleVariant = getSelectedBundleVariant(
    quoteCartQueryData,
    selectedInsuranceTypes,
  )
  const offerData = selectedBundleVariant
    ? getOfferData(selectedBundleVariant.bundle)
    : null
  const isReferralCodeUsed =
    getMonthlyCostDeductionIncentive(quoteCartQueryData) !== undefined
  const checkoutStatus = getCheckoutStatus(quoteCartQueryData)
  const checkoutMethod = getCheckoutMethod(quoteCartQueryData)
  const bundleVariants = getPossibleVariations(quoteCartQueryData)
  const campaign = getCampaign(quoteCartQueryData)

  const trackOfferEvent = useTrackOfferEvent()
  const trackSegmentEvent = useTrackSegmentEvent()

  useEffect(() => trackOfferEvent({ eventName: EventName.OfferCreated }), [
    trackOfferEvent,
  ])

  const trackCheckoutStarted = useCallback(() => {
    if (selectedBundleVariant) {
      trackSegmentEvent({
        name: SemanticEvents.Ecommerce.CheckoutStarted,
        properties: {
          value: Number(getNetAmount(selectedBundleVariant).amount),
          currency: getNetAmount(selectedBundleVariant).currency,
          label: 'Offer',
          ...getUtmParamsFromCookie(),
        },
      })
    }
  }, [selectedBundleVariant, trackSegmentEvent])

  if (isLoadingQuoteCart) return <LoadingPage loading />

  if (
    quoteCartError ||
    !isQuoteCartFull(selectedBundleVariant) ||
    !isOfferDataAvailable(offerData) ||
    !isValidCheckoutMethod(checkoutMethod)
  ) {
    return (
      <PageWrapper quoteCartId={quoteCartId}>
        <SetupFailedModal isVisible={true} onRetry={refetchQuoteCart} />
      </PageWrapper>
    )
  }

  if (checkoutStatus === CheckoutStatus.Completed) {
    return <CheckoutSuccessRedirect bundle={selectedBundleVariant.bundle} />
  }

  const onInsuranceSelectorChange = (
    newSelectedBundleVariant: QuoteBundleVariant,
  ) => {
    setSelectedInsuranceTypes(
      isCarInsuranceType(newSelectedBundleVariant)
        ? getTypeOfContractFromBundleVariant(newSelectedBundleVariant)
        : getInsuranceTypesFromBundleVariant(newSelectedBundleVariant),
    )
    trackOfferEvent({
      eventName: EventName.InsuranceSelectionToggle,
      selectedBundle: newSelectedBundleVariant.bundle,
      options: {
        switchedFrom: selectedBundleVariant.bundle,
      },
    })
  }

  const handleCheckoutUpsellCardAccepted = (
    newSelectedBundleVariant: QuoteBundleVariant,
  ) => {
    setSelectedInsuranceTypes(
      isCarInsuranceType(newSelectedBundleVariant)
        ? getTypeOfContractFromBundleVariant(newSelectedBundleVariant)
        : getInsuranceTypesFromBundleVariant(newSelectedBundleVariant),
    )
    trackOfferEvent({
      eventName: EventName.OfferCrossSell,
      selectedBundle: newSelectedBundleVariant.bundle,
      options: {
        switchedFrom: selectedBundleVariant.bundle,
      },
    })
  }

  const toggleCheckout = createToggleCheckout(history, quoteCartId, pathLocale)
  const handleCheckoutToggle = (open: boolean) => {
    toggleCheckout(open)
  }

  const isInsuranceSelectorVisible =
    isInsuranceToggleEnabled && bundleVariants.length > 1

  return (
    <PageWrapper
      quoteCartId={quoteCartId}
      isReferralCodeUsed={isReferralCodeUsed}
      bundle={selectedBundleVariant.bundle}
    >
      <>
        <Introduction
          quoteCartId={quoteCartId}
          allQuotes={getUniqueQuotesFromVariantList(bundleVariants)}
          offerData={offerData}
          campaign={campaign}
          onCheckoutOpen={() => {
            handleCheckoutToggle(true)
            trackCheckoutStarted()
          }}
        />
        {isInsuranceSelectorVisible && (
          <InsuranceSelector
            variants={bundleVariants}
            selectedQuoteBundle={selectedBundleVariant}
            onChange={onInsuranceSelectorChange}
          />
        )}
        <Perils offerData={offerData} />
        <AppPromotionSection />
        <FaqSection />
        <Checkout
          quoteCartId={quoteCartId}
          checkoutMethod={checkoutMethod}
          offerData={offerData}
          campaign={campaign}
          initialCheckoutStatus={checkoutStatus}
          quoteBundleVariants={bundleVariants}
          selectedQuoteBundleVariant={selectedBundleVariant}
          onUpsellAccepted={handleCheckoutUpsellCardAccepted}
          isOpen={checkoutMatch !== null}
          onClose={() => handleCheckoutToggle(false)}
        />
      </>
    </PageWrapper>
  )
}

import { History } from 'history'
import { SemanticEvents } from 'quepasa'
import React, { useEffect } from 'react'
import { useHistory, useRouteMatch, RouteComponentProps } from 'react-router'
import { LoadingPage } from 'components/LoadingPage'
import {
  useQuoteCartQuery,
  QuoteBundleVariant,
  CheckoutStatus,
  CheckoutMethod,
} from 'data/graphql'
import { EventName } from 'utils/tracking/gtm'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
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
} from 'api/quoteCartQuerySelectors'
import { trackOfferEvent } from 'utils/tracking/trackOfferEvent'
import {
  getOfferData,
  getUniqueQuotesFromVariantList,
  getInsuranceTypesFromBundleVariant,
  isOfferDataAvailable,
} from '../OfferNew/utils'
import { AppPromotionSection } from '../OfferNew/AppPromotionSection'
import { FaqSection } from '../OfferNew/FaqSection'
import { Perils } from '../OfferNew/Perils'
import { InsuranceSelector } from '../OfferNew/InsuranceSelector'
import { SetupFailedModal } from '../Embark/ErrorModal'
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

  useEffect(() => {
    if (selectedBundleVariant) {
      trackOfferEvent(
        EventName.OfferCreated,
        selectedBundleVariant.bundle,
        isReferralCodeUsed,
        {
          quoteCartId,
        },
      )
    }
  }, [selectedBundleVariant, isReferralCodeUsed, quoteCartId])

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
      getInsuranceTypesFromBundleVariant(newSelectedBundleVariant),
    )
    trackOfferEvent(
      EventName.InsuranceSelectionToggle,
      newSelectedBundleVariant.bundle,
      isReferralCodeUsed,
      { quoteCartId, switchedFrom: selectedBundleVariant.bundle },
    )
  }

  const handleCheckoutUpsellCardAccepted = (
    newSelectedBundleVariant: QuoteBundleVariant,
  ) => {
    setSelectedInsuranceTypes(
      getInsuranceTypesFromBundleVariant(newSelectedBundleVariant),
    )
    trackOfferEvent(
      EventName.OfferCrossSell,
      newSelectedBundleVariant.bundle,
      isReferralCodeUsed,
      {
        quoteCartId,
        switchedFrom: selectedBundleVariant.bundle,
      },
    )
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
        <TrackAction
          event={{
            name: SemanticEvents.Ecommerce.CheckoutStarted,
            properties: {
              value: Number(getNetAmount(selectedBundleVariant).amount),
              currency: getNetAmount(selectedBundleVariant).currency,
              label: 'Offer',
              ...getUtmParamsFromCookie(),
            },
          }}
        >
          {({ track }) => (
            <Introduction
              quoteCartId={quoteCartId}
              allQuotes={getUniqueQuotesFromVariantList(bundleVariants)}
              offerData={offerData}
              campaign={campaign}
              onCheckoutOpen={() => {
                handleCheckoutToggle(true)
                track()
              }}
            />
          )}
        </TrackAction>
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

import { History } from 'history'
import { SemanticEvents } from 'quepasa'
import React from 'react'
import { Redirect, useHistory, useRouteMatch, useLocation } from 'react-router'
import { LoadingPage } from 'components/LoadingPage'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import {
  useQuoteBundleVariantsQuery,
  useRedeemedCampaignsQuery,
  QuoteBundleVariant,
  useOnboardingSessionQuery,
} from 'data/graphql'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { trackOfferGTM, EventName } from 'utils/tracking/gtm'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
import { localePathPattern } from 'l10n/localePathPattern'
import { Features, useFeature } from 'utils/hooks/useFeature'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useQuoteIds } from '../../utils/hooks/useQuoteIds'
import { LanguagePicker } from '../Embark/LanguagePicker'
import {
  getOfferData,
  getBundleVariantFromQuoteIds,
  getUniqueQuotesFromVariantList,
} from './utils'
import { AppPromotionSection } from './AppPromotionSection'
import { Checkout } from './Checkout'
import { FaqSection } from './FaqSection'
import { Introduction } from './Introduction'
import { Perils } from './Perils'
import { InsuranceSelector } from './InsuranceSelector'

const createToggleCheckout = (history: History<any>, locale?: string) => (
  isOpen: boolean,
) => {
  if (isOpen) {
    history.push(`/${locale}/new-member/sign`)
  } else {
    history.goBack()
  }
}

const getQuoteIdsFromBundleVariant = (bundleVariant: QuoteBundleVariant) =>
  bundleVariant.bundle.quotes.map((quote) => quote.id)

export const OfferNew: React.FC = () => {
  const { isoLocale: localeIsoCode, path: currentLocale } = useCurrentLocale()
  const variation = useVariation()
  const [isInsuranceToggleEnabled] = useFeature([
    Features.OFFER_PAGE_INSURANCE_TOGGLE,
  ])
  const history = useHistory()

  const {
    isLoading: quoteIdsIsLoading,
    quoteIds,
    selectedQuoteIds,
    setSelectedQuoteIds,
  } = useQuoteIds()

  const { search } = useLocation()
  const sessionId = new URLSearchParams(search).get('session')
  const isUsingQuoteCartApi = sessionId !== null

  const { data: cartData, loading: isLoadingCart } = useOnboardingSessionQuery({
    variables: { id: sessionId || '', locale: localeIsoCode },
    skip: !isUsingQuoteCartApi,
  })

  // TODO: remove when we have migrated to the QuoteCart API
  const {
    data,
    loading: loadingQuoteBundle,
    refetch,
  } = useQuoteBundleVariantsQuery({
    variables: {
      input: {
        ids: [...quoteIds],
      },
      locale: localeIsoCode,
    },
    skip: isUsingQuoteCartApi || quoteIdsIsLoading,
  })

  const { data: redeemedCampaignsData } = useRedeemedCampaignsQuery()
  // END TODO

  const isLoadingQuoteBundle = isUsingQuoteCartApi
    ? isLoadingCart
    : loadingQuoteBundle

  const redeemedCampaigns =
    (isUsingQuoteCartApi
      ? [cartData?.onboardingSession.campaign]
      : redeemedCampaignsData?.redeemedCampaigns) ?? []

  const bundleData = isUsingQuoteCartApi
    ? cartData?.onboardingSession.bundle
    : data?.quoteBundle

  const bundleVariants = (bundleData?.possibleVariations ??
    []) as QuoteBundleVariant[]

  const isInsuranceSelectorVisible =
    isInsuranceToggleEnabled && bundleVariants.length > 1

  const selectedBundleVariant =
    getBundleVariantFromQuoteIds(selectedQuoteIds, bundleVariants) ||
    bundleVariants?.[0]

  const onInsuranceSelectorChange = (
    selectedBundleVariant: QuoteBundleVariant,
  ) => {
    const previouslySelectedBundleVariant = getBundleVariantFromQuoteIds(
      selectedQuoteIds,
      bundleVariants,
    )
    const quoteIds = getQuoteIdsFromBundleVariant(selectedBundleVariant)
    setSelectedQuoteIds(quoteIds)
    if (offerData) {
      trackOfferGTM(
        EventName.InsuranceSelectionToggle,
        getOfferData(selectedBundleVariant.bundle),
        redeemedCampaigns[0]?.incentive?.__typename === 'MonthlyCostDeduction',
        previouslySelectedBundleVariant &&
          getOfferData(previouslySelectedBundleVariant?.bundle),
      )
    }
  }

  const checkoutMatch = useRouteMatch(`${localePathPattern}/new-member/sign`)
  const toggleCheckout = createToggleCheckout(history, currentLocale)

  if ((isLoadingQuoteBundle && !bundleData) || quoteIdsIsLoading) {
    return <LoadingPage />
  }

  if (quoteIds.length === 0) {
    return <Redirect to={`/${currentLocale}/new-member`} />
  }

  if (!isLoadingQuoteBundle && !bundleData) {
    throw new Error(
      `No quote returned to show offer with (quoteIds=${quoteIds}).`,
    )
  }

  const handleCheckoutToggle = (open: boolean) => {
    toggleCheckout(open)
  }

  const offerData = selectedBundleVariant
    ? getOfferData(selectedBundleVariant.bundle)
    : null

  if (offerData) {
    trackOfferGTM(
      EventName.OfferCreated,
      offerData,
      redeemedCampaigns[0]?.incentive?.__typename === 'MonthlyCostDeduction',
    )
  }

  return (
    <Page>
      <SessionTokenGuard>
        {![Variation.IOS, Variation.ANDROID].includes(variation!) && (
          <TopBar isTransparent>
            <LanguagePicker path="/new-member/offer" />
          </TopBar>
        )}
        {offerData && (
          <>
            <TrackAction
              event={{
                name: SemanticEvents.Ecommerce.CheckoutStarted,
                properties: {
                  value: Number(offerData.cost.monthlyNet.amount),
                  currency: offerData.cost.monthlyNet.currency,
                  label: 'Offer',
                  ...getUtmParamsFromCookie(),
                },
              }}
            >
              {({ track }) => (
                <Introduction
                  allQuotes={getUniqueQuotesFromVariantList(bundleVariants)}
                  offerData={offerData}
                  refetch={refetch as () => Promise<any>}
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
              offerData={offerData}
              isOpen={checkoutMatch !== null}
              onClose={() => {
                handleCheckoutToggle(false)
              }}
              refetch={refetch as () => Promise<any>}
            />
          </>
        )}
      </SessionTokenGuard>
    </Page>
  )
}

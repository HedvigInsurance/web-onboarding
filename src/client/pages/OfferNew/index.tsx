import { History } from 'history'
import { SemanticEvents } from 'quepasa'
import React from 'react'
import { Redirect, useHistory, useLocation, useRouteMatch } from 'react-router'
import { LoadingPage } from 'components/LoadingPage'
import { TopBar } from 'components/TopBar'
import { getIsoLocale, useCurrentLocale } from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import {
  useRedeemedCampaignsQuery,
  useQuoteCartQuery,
  QuoteBundleVariant,
  useQuoteBundleVariantsQuery,
} from 'data/graphql'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { trackOfferGTM, EventName } from 'utils/tracking/gtm'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
import { localePathPattern } from 'l10n/localePathPattern'
import { Features, useFeature } from 'utils/hooks/useFeature'
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

const QUOTE_CART_QUERY_PARAMETER = 'quoteCart'

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

const useQuoteCartId = () => {
  const { search } = useLocation()
  return new URLSearchParams(search).get(QUOTE_CART_QUERY_PARAMETER)
}

export const OfferNew: React.FC = () => {
  const currentLocale = useCurrentLocale()
  const localeIsoCode = getIsoLocale(currentLocale)
  const variation = useVariation()
  const [isInsuranceToggleEnabled] = useFeature([
    Features.OFFER_PAGE_INSURANCE_TOGGLE,
  ])

  const {
    isLoading: quoteIdsIsLoading,
    quoteIds,
    selectedQuoteIds,
    setSelectedQuoteIds,
  } = useQuoteIds()

  const history = useHistory()

  const quoteCartId = useQuoteCartId()
  const isUsingQuoteCartApi = quoteCartId !== null

  const {
    data: quoteCartData,
    loading: isLoadingQuoteCart,
    refetch: referchQuoteCart,
  } = useQuoteCartQuery({
    variables: {
      id: quoteCartId || '',
      locale: localeIsoCode,
    },
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

  const { data: redeemedCampaignsData } = useRedeemedCampaignsQuery({
    skip: isUsingQuoteCartApi,
  })
  // END TODO

  const refetchData = isUsingQuoteCartApi ? referchQuoteCart : refetch

  const isLoadingQuoteBundle = isUsingQuoteCartApi
    ? isLoadingQuoteCart
    : loadingQuoteBundle

  const redeemedCampaigns =
    (isUsingQuoteCartApi
      ? [quoteCartData?.quoteCart.campaign]
      : redeemedCampaignsData?.redeemedCampaigns) ?? []

  const bundleData = isUsingQuoteCartApi
    ? quoteCartData?.quoteCart.bundle
    : data?.quoteBundle

  const bundleVariants = (bundleData?.possibleVariations ?? []) as Array<
    QuoteBundleVariant
  >

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

  const handleCheckoutUpsellCardAccepted = (
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
        EventName.OfferCrossSell,
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
                  refetch={refetchData as () => Promise<any>}
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
              quoteBundleVariants={bundleVariants}
              selectedQuoteBundleVariant={selectedBundleVariant}
              onUpsellAccepted={handleCheckoutUpsellCardAccepted}
              isOpen={checkoutMatch !== null}
              onClose={() => handleCheckoutToggle(false)}
              refetch={refetchData as () => Promise<any>}
            />
          </>
        )}
      </SessionTokenGuard>
    </Page>
  )
}

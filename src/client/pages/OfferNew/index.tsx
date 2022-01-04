import { History } from 'history'
import { SemanticEvents } from 'quepasa'
import React from 'react'
import { Redirect, useHistory, useRouteMatch } from 'react-router'
import { LoadingPage } from 'components/LoadingPage'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import {
  useQuoteBundleVariantsQuery,
  useRedeemedCampaignsQuery,
  QuoteBundleVariant,
} from 'data/graphql'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { trackOfferGTM, EventName } from 'utils/tracking/gtm'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
import { localePathPattern } from 'l10n/localePathPattern'
import { Features, useFeature } from 'utils/hooks/useFeature'
import { PhoneNumber } from 'components/PhoneNumber/PhoneNumber'
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
    history.replace(`/${locale}/new-member/sign`)
  } else {
    history.replace(`/${locale}/new-member/offer`)
  }
}

const getQuoteIdsFromBundleVariant = (bundleVariant: QuoteBundleVariant) =>
  bundleVariant.bundle.quotes.map((quote) => quote.id)

export const OfferNew: React.FC = () => {
  const { path: localePath, isoLocale, phoneNumber } = useCurrentLocale()
  const localeIsoCode = isoLocale
  const variation = useVariation()

  const [
    isInsuranceToggleEnabled,
    isCustomerServicePhoneNumberEnabled,
  ] = useFeature([
    Features.OFFER_PAGE_INSURANCE_TOGGLE,
    Features.CUSTOMER_SERVICE_PHONE_NUMBER,
  ])
  const history = useHistory()
  const { data: redeemedCampaignsData } = useRedeemedCampaignsQuery()
  const redeemedCampaigns = redeemedCampaignsData?.redeemedCampaigns ?? []

  const {
    isLoading: quoteIdsIsLoading,
    quoteIds,
    selectedQuoteIds,
    setSelectedQuoteIds,
  } = useQuoteIds()

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
    skip: quoteIdsIsLoading,
  })

  const bundleVariants = (data?.quoteBundle.possibleVariations ??
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
        {
          switchedFrom:
            previouslySelectedBundleVariant &&
            getOfferData(previouslySelectedBundleVariant?.bundle),
        },
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
        {
          switchedFrom:
            previouslySelectedBundleVariant &&
            getOfferData(previouslySelectedBundleVariant?.bundle),
        },
      )
    }
  }

  const checkoutMatch = useRouteMatch(`${localePathPattern}/new-member/sign`)
  const toggleCheckout = createToggleCheckout(history, localePath)

  if ((loadingQuoteBundle && !data) || quoteIdsIsLoading) {
    return <LoadingPage />
  }

  if (quoteIds.length === 0) {
    return <Redirect to={`/${localePath}/new-member`} />
  }

  if (!loadingQuoteBundle && !data) {
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

  const handleClickPhoneNumber = (status: 'opened' | 'closed') => {
    if (offerData) {
      trackOfferGTM(
        EventName.ClickCallNumber,
        offerData,
        redeemedCampaigns[0]?.incentive?.__typename === 'MonthlyCostDeduction',
        { phoneNumberData: { path: history.location.pathname, status } },
      )
    }
  }

  return (
    <Page>
      <SessionTokenGuard>
        {![Variation.IOS, Variation.ANDROID].includes(variation!) && (
          <TopBar isTransparent>
            {isCustomerServicePhoneNumberEnabled && phoneNumber ? (
              <PhoneNumber color="white" onClick={handleClickPhoneNumber} />
            ) : (
              <LanguagePicker color="white" />
            )}
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
              quoteBundleVariants={bundleVariants}
              selectedQuoteBundleVariant={selectedBundleVariant}
              onUpsellAccepted={handleCheckoutUpsellCardAccepted}
              isOpen={checkoutMatch !== null}
              onClose={() => handleCheckoutToggle(false)}
              refetch={refetch as () => Promise<any>}
            />
          </>
        )}
      </SessionTokenGuard>
    </Page>
  )
}

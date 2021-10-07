import { History } from 'history'
import { SemanticEvents } from 'quepasa'
import React, { useEffect } from 'react'
import { Redirect, useHistory, useRouteMatch } from 'react-router'
import { LoadingPage } from 'components/LoadingPage'
import { TopBar } from 'components/TopBar'
import { getIsoLocale, useCurrentLocale } from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import {
  QuoteBundleVariant,
  useQuoteBundleQuery,
  useRedeemedCampaignsQuery,
  QuoteBundle,
} from 'data/graphql'
import { SwitchSafetySection } from 'pages/OfferNew/SwitchSafetySection'
import { getOfferData as getOfferDataFromBundle } from 'pages/OfferNew/utils'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { trackOfferGTM } from 'utils/tracking/gtm'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
import { localePathPattern } from 'l10n/localePathPattern'
import { useQuoteIds } from '../../utils/hooks/useQuoteIds'
import { LanguagePicker } from '../Embark/LanguagePicker'
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

const isBundleVariantMatchingQuoteIds = (
  variant: QuoteBundleVariant,
  quoteIds: readonly string[],
) => {
  const variantQuoteIds = variant.bundle.quotes.map((quote) => quote.id)
  return (
    variantQuoteIds.sort().join(',') ===
    quoteIds
      .concat()
      .sort()
      .join(',')
  )
}

const getBundleVariantFromQuoteIds = (
  quoteIds: readonly string[],
  bundleVariants: QuoteBundleVariant[],
) => {
  return bundleVariants.find((variant) =>
    isBundleVariantMatchingQuoteIds(variant, quoteIds),
  )
}

export const OfferNew: React.FC = () => {
  const currentLocale = useCurrentLocale()
  const localeIsoCode = getIsoLocale(currentLocale)
  const variation = useVariation()
  const [isInsuranceToggleEnabled, isSwitchSafetySectionEnabled] = useFeature([
    Features.OFFER_PAGE_INSURANCE_TOGGLE,
    Features.OFFER_PAGE_SWITCH_SAFETY,
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

  const { data, loading: loadingQuoteBundle, refetch } = useQuoteBundleQuery({
    variables: {
      input: {
        ids: [...quoteIds],
      },
      locale: localeIsoCode,
    },
    skip: quoteIdsIsLoading,
  })

  const bundleVariants = React.useMemo(
    () =>
      (data?.quoteBundle.possibleVariations as Array<QuoteBundleVariant>) ?? [],
    [data?.quoteBundle.possibleVariations],
  )
  const canShowInsuranceSelector =
    isInsuranceToggleEnabled && bundleVariants.length > 1
  const [selectedBundleVariant, setSelectedBundleVariant] = React.useState<
    QuoteBundleVariant
  >()

  useEffect(() => {
    if (!selectedBundleVariant) {
      return setSelectedBundleVariant(
        getBundleVariantFromQuoteIds(selectedQuoteIds, bundleVariants),
      )
    }

    const matchingVariant = bundleVariants.find(
      ({ id }) => id === selectedBundleVariant.id,
    )
    if (!matchingVariant) return setSelectedBundleVariant(bundleVariants[0])
    return setSelectedBundleVariant(matchingVariant)
  }, [bundleVariants, selectedBundleVariant, selectedQuoteIds])

  useEffect(() => {
    if (
      selectedBundleVariant &&
      !isBundleVariantMatchingQuoteIds(selectedBundleVariant, selectedQuoteIds)
    ) {
      setSelectedQuoteIds(
        selectedBundleVariant.bundle.quotes.map((quote) => quote.id),
      )
    }
  }, [selectedBundleVariant, selectedQuoteIds])

  const checkoutMatch = useRouteMatch(`${localePathPattern}/new-member/sign`)
  const toggleCheckout = createToggleCheckout(history, currentLocale)

  if ((loadingQuoteBundle && !data) || quoteIdsIsLoading) {
    return <LoadingPage />
  }

  if (quoteIds.length === 0) {
    return <Redirect to={`/${currentLocale}/new-member`} />
  }

  if (!loadingQuoteBundle && !data) {
    throw new Error(
      `No quote returned to show offer with (quoteIds=${quoteIds}).`,
    )
  }

  const handleCheckoutToggle = (open: boolean) => {
    toggleCheckout(open)
  }

  const getOfferData = () => {
    if (isInsuranceToggleEnabled) {
      return selectedBundleVariant
        ? getOfferDataFromBundle(selectedBundleVariant.bundle)
        : null
    } else {
      return data?.quoteBundle
        ? getOfferDataFromBundle(data?.quoteBundle as QuoteBundle)
        : null
    }
  }
  const offerData = getOfferData()

  if (offerData) {
    trackOfferGTM(
      'offer_created',
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
                  offerData={offerData}
                  refetch={refetch as () => Promise<any>}
                  onCheckoutOpen={() => {
                    handleCheckoutToggle(true)
                    track()
                  }}
                />
              )}
            </TrackAction>
            {canShowInsuranceSelector && (
              <InsuranceSelector
                variants={bundleVariants}
                selectedQuoteBundle={selectedBundleVariant}
                onChange={setSelectedBundleVariant}
              />
            )}
            <Perils offerData={offerData} />
            {isSwitchSafetySectionEnabled && <SwitchSafetySection />}
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

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

interface QuoteBundleVariation {
  id: string
  tag?: string
  bundle: QuoteBundle
}

const BUNDLE_VARIATIONS = [
  {
    tag: 'Most popular',
    bundle: {
      displayName: 'Hemförsäkring & Olycksfall',
      quotes: [
        {
          id: 'oaiwdjia-adw2-311-123-123o123oij',
          displayName: 'Hemförsäkring Hyresrätt',
        },
        {
          id: 'dsefsef89-oii23j423-po23kp4-io32',
          displayName: 'Olycksfallsförsäkring',
        },
      ],
      bundleCost: {
        monthlyGross: { amount: 143, currency: 'EUR' },
        monthlyNet: { amount: 133, currency: 'EUR' },
      },
    },
  },
  {
    bundle: {
      displayName: 'Hemförsäkring Hyresrätt',
      quotes: [
        {
          id: 'oaiwdjia-adw2-311-123-123o123oij',
          displayName: 'Hemförsäkring Hyresrätt',
        },
      ],
      bundleCost: {
        monthlyGross: { amount: 123, currency: 'EUR' },
        monthlyNet: { amount: 113, currency: 'EUR' },
      },
    },
  },
]

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
  const { isLoading: quoteIdsIsLoading, quoteIds } = useQuoteIds()
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

  const updateBundleVariant = (
    bundleVariations: QuoteBundleVariant[],
    selectedBundleVariant?: QuoteBundleVariant,
  ) => {
    if (!selectedBundleVariant) {
      return setSelectedBundleVariant(bundleVariations[0])
    }

    const matchingVariant = bundleVariations.find(
      ({ id }) => id === selectedBundleVariant.id,
    )
    if (!matchingVariant) return setSelectedBundleVariant(bundleVariations[0])
    return setSelectedBundleVariant(matchingVariant)
  }

  useEffect(() => {
    updateBundleVariant(bundleVariants, selectedBundleVariant)
  }, [bundleVariants])

  useEffect(() => {
    // Preselect initial bundle variation after it's loaded
    // @TODO: this should be picked up from Embark
    if (bundleVariation === undefined) {
      setBundleVariation(quoteBundleVariations[0])
    }
  }, [bundleVariation, quoteBundleVariations])

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

import { History } from 'history'
import { SemanticEvents } from 'quepasa'
import React, { useEffect } from 'react'
import { Redirect, useHistory, useRouteMatch } from 'react-router'
import { LoadingPage } from 'components/LoadingPage'
import { TopBar } from 'components/TopBar'
import {
  getIsoLocale,
  useCurrentLocale,
  Market,
  useMarket,
} from 'components/utils/CurrentLocale'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import {
  QuoteBundle,
  useQuoteBundleQuery,
  useRedeemedCampaignsQuery,
} from 'data/graphql'
import { SwitchSafetySection } from 'pages/OfferNew/SwitchSafetySection'
import { getOfferData } from 'pages/OfferNew/utils'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { trackOfferGTM } from 'utils/tracking/gtm'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
import { localePathPattern } from 'l10n/localePathPattern'
import { useQuoteIds } from '../../utils/hooks/useQuoteIds'
import { LanguagePicker } from '../Embark/LanguagePicker'
import { Checkout } from './Checkout'
import { FaqSection } from './FaqSection'
import { Introduction } from './Introduction'
import { Perils } from './Perils'

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
  const currentMarket = useMarket()
  const variation = useVariation()
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

  const quoteBundleVariations = BUNDLE_VARIATIONS.map<QuoteBundleVariation>(
    (variation) => ({
      ...variation,
      id: variation.bundle.quotes.map(({ id }) => id).join(''),
      bundle: (variation.bundle as unknown) as QuoteBundle,
    }),
  )
  const [bundleVariation, setBundleVariation] = React.useState<
    QuoteBundleVariation
  >()

  useEffect(() => {
    // Reset selected bundle when variation is no longer valid
    if (bundleVariation) {
      const matchingVariation = quoteBundleVariations.find(
        ({ id }) => id === bundleVariation.id,
      )
      if (matchingVariation === undefined) {
        setBundleVariation(undefined)
      }
    }
  }, [bundleVariation, quoteBundleVariations])

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

  const offerData = bundleVariation
    ? getOfferData(bundleVariation.bundle)
    : null

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
            {quoteBundleVariations.length > 1 ? (
              <div style={{ backgroundColor: 'white' }}>
                {quoteBundleVariations.map((variation) => (
                  <label key={variation.id}>
                    <input
                      name={variation.tag}
                      type="radio"
                      checked={bundleVariation?.id === variation.id}
                      onChange={() => setBundleVariation(variation)}
                    />
                    <span>
                      {variation.tag} - {variation.bundle.displayName}
                    </span>
                  </label>
                ))}
              </div>
            ) : null}
            <Perils offerData={offerData} />
            {currentMarket !== Market.Dk && <SwitchSafetySection />}
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

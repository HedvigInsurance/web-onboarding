import { History } from 'history'
import { SemanticEvents } from 'quepasa'
import React, { useEffect } from 'react'
import { useHistory, useRouteMatch, RouteComponentProps } from 'react-router'
import { LoadingPage } from 'components/LoadingPage'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { useQuoteCartQuery, QuoteBundleVariant } from 'data/graphql'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { trackOfferGTM, EventName } from 'utils/tracking/gtm'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
import { localePathPattern } from 'l10n/localePathPattern'
import { Features, useFeature } from 'utils/hooks/useFeature'
import {
  useContractTypes,
  useContractTypesFromQueryParam,
} from 'utils/hooks/useContractTypes'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { LanguagePicker } from '../Embark/LanguagePicker'
import {
  getOfferData,
  getUniqueQuotesFromVariantList,
  getBundleVariantFromContractTypes,
} from '../OfferNew/utils'
import { AppPromotionSection } from '../OfferNew/AppPromotionSection'
import { Checkout } from '../OfferNew/Checkout'
import { FaqSection } from '../OfferNew/FaqSection'
import { Introduction } from '../OfferNew/Introduction'
import { Perils } from '../OfferNew/Perils'
import { InsuranceSelector } from '../OfferNew/InsuranceSelector'

const createToggleCheckout = (history: History<any>, locale?: string) => (
  isOpen: boolean,
) => {
  if (isOpen) {
    history.push(`/${locale}/new-member/sign`)
  } else {
    history.goBack()
  }
}

const getContractTypesFromBundleVariant = (bundleVariant: QuoteBundleVariant) =>
  bundleVariant.bundle.quotes.map((quote) => quote.typeOfContract)

type OfferPageProps = RouteComponentProps<{ id: string }>

export const OfferPage = ({
  match: {
    params: { id: quoteCartId },
  },
}: OfferPageProps) => {
  const { isoLocale, path: pathLocale } = useCurrentLocale()
  const variation = useVariation()
  const [isInsuranceToggleEnabled] = useFeature([
    Features.OFFER_PAGE_INSURANCE_TOGGLE,
  ])

  const initialContractTypes = useContractTypesFromQueryParam()
  const [selectedContractTypes, setSelectedContractTypes] = useContractTypes(
    initialContractTypes ?? undefined,
  )

  const history = useHistory()

  const {
    data: quoteCartData,
    loading: isLoadingQuoteCart,
    refetch: refetchQuoteCart,
    error: quoteCartError,
  } = useQuoteCartQuery({
    variables: {
      id: quoteCartId,
      locale: isoLocale,
    },
  })

  const bundleData = quoteCartData?.quoteCart.bundle
  const redeemedCampaigns = [quoteCartData?.quoteCart.campaign]

  if (quoteCartError) {
    throw new Error(`Error fetching quote cart: ${quoteCartId}.`)
  }

  if (!isLoadingQuoteCart && !bundleData) {
    throw new Error(
      `No bundle returned to show offer with (quote cart ID=${quoteCartId}).`,
    )
  }

  const bundleVariants = (bundleData?.possibleVariations ?? []) as Array<
    QuoteBundleVariant
  >

  const isInsuranceSelectorVisible =
    isInsuranceToggleEnabled && bundleVariants.length > 1

  const selectedBundleVariant =
    getBundleVariantFromContractTypes(bundleVariants, selectedContractTypes) ||
    bundleVariants?.[0]

  const onInsuranceSelectorChange = (
    newSelectedBundleVariant: QuoteBundleVariant,
  ) => {
    setSelectedContractTypes(
      getContractTypesFromBundleVariant(newSelectedBundleVariant),
    )
    if (offerData) {
      const isReferralCodeUsed =
        redeemedCampaigns[0]?.incentive?.__typename === 'MonthlyCostDeduction'
      const switchedFromOffer =
        selectedBundleVariant && getOfferData(selectedBundleVariant?.bundle)
      trackOfferGTM(
        EventName.InsuranceSelectionToggle,
        getOfferData(newSelectedBundleVariant.bundle),
        isReferralCodeUsed,
        switchedFromOffer,
      )
    }
  }

  const handleCheckoutUpsellCardAccepted = (
    newSelectedBundleVariant: QuoteBundleVariant,
  ) => {
    setSelectedContractTypes(
      getContractTypesFromBundleVariant(newSelectedBundleVariant),
    )
    if (offerData) {
      const isReferralCodeUsed =
        redeemedCampaigns[0]?.incentive?.__typename === 'MonthlyCostDeduction'
      const switchedFromOffer =
        selectedBundleVariant && getOfferData(selectedBundleVariant?.bundle)
      trackOfferGTM(
        EventName.OfferCrossSell,
        getOfferData(newSelectedBundleVariant.bundle),
        isReferralCodeUsed,
        switchedFromOffer,
      )
    }
  }

  const checkoutMatch = useRouteMatch(`${localePathPattern}/new-member/sign`)
  const toggleCheckout = createToggleCheckout(history, pathLocale)

  const offerData = selectedBundleVariant
    ? getOfferData(selectedBundleVariant.bundle)
    : null

  const isReferralCodeUsed =
    redeemedCampaigns[0]?.incentive?.__typename === 'MonthlyCostDeduction'
  useEffect(() => {
    if (offerData) {
      trackOfferGTM(EventName.OfferCreated, offerData, isReferralCodeUsed)
    }
  }, [offerData, isReferralCodeUsed])

  const handleCheckoutToggle = (open: boolean) => {
    toggleCheckout(open)
  }

  if (isLoadingQuoteCart) {
    return <LoadingPage />
  }

  return (
    <Page>
      {![Variation.IOS, Variation.ANDROID].includes(variation!) && (
        <TopBar isTransparent>
          <LanguagePicker path={`/new-member/offer/${quoteCartId}`} />
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
                refetch={refetchQuoteCart as () => Promise<any>}
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
            refetch={refetchQuoteCart as () => Promise<any>}
          />
        </>
      )}
    </Page>
  )
}

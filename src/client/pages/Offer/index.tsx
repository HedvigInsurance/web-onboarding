import { History } from 'history'
import { SemanticEvents } from 'quepasa'
import React, { useEffect } from 'react'
import {
  useHistory,
  useRouteMatch,
  RouteComponentProps,
  Redirect,
} from 'react-router'
import { LoadingPage } from 'components/LoadingPage'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import {
  useQuoteCartQuery,
  QuoteBundleVariant,
  CheckoutStatus,
} from 'data/graphql'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { trackOfferGTM, EventName } from 'utils/tracking/gtm'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
import { localePathPattern } from 'l10n/localePathPattern'
import { Features, useFeature } from 'utils/hooks/useFeature'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { LocaleLabel } from 'l10n/locales'
import { CheckoutSuccessRedirect } from 'pages/OfferNew/Checkout/CheckoutSuccessRedirect'
import { PhoneNumber } from 'components/PhoneNumber/PhoneNumber'
import { LanguagePicker } from '../Embark/LanguagePicker'
import {
  getOfferData,
  getUniqueQuotesFromVariantList,
  getBundleVariantFromInsuranceTypesWithFallback,
  getInsuranceTypesFromBundleVariant,
} from '../OfferNew/utils'
import { AppPromotionSection } from '../OfferNew/AppPromotionSection'
import { FaqSection } from '../OfferNew/FaqSection'
import { Perils } from '../OfferNew/Perils'
import { InsuranceSelector } from '../OfferNew/InsuranceSelector'
import { Introduction } from './Introduction'
import { Checkout } from './Checkout'

const createToggleCheckout = (
  history: History<any>,
  quoteCartId: string,
  locale?: LocaleLabel,
) => (isOpen: boolean) => {
  if (isOpen) {
    history.push(
      `/${locale}/new-member/sign/${quoteCartId}${history.location.search}`,
    )
  } else {
    history.goBack()
  }
}

type OfferPageProps = RouteComponentProps<{ id: string }>

export const OfferPage = ({
  match: {
    params: { id: quoteCartId },
  },
}: OfferPageProps) => {
  const { isoLocale, path: pathLocale, callCenter } = useCurrentLocale()
  const variation = useVariation()
  const [
    isInsuranceToggleEnabled,
    isQuoteCartEnabled,
    isCustomerServicePhoneNumberEnabled,
  ] = useFeature([
    Features.OFFER_PAGE_INSURANCE_TOGGLE,
    Features.QUOTE_CART_API,
    Features.CUSTOMER_SERVICE_PHONE_NUMBER,
  ])

  const [
    selectedInsuranceTypes,
    setSelectedInsuranceTypes,
  ] = useSelectedInsuranceTypes()

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
  const redeemedCampaign = quoteCartData?.quoteCart.campaign ?? null
  const checkoutMethod = quoteCartData?.quoteCart?.checkoutMethods[0]
  const checkoutStatus = quoteCartData?.quoteCart?.checkout?.status

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

  const selectedBundleVariant = getBundleVariantFromInsuranceTypesWithFallback(
    bundleVariants,
    selectedInsuranceTypes,
  )

  const checkoutMatch = useRouteMatch(
    `${localePathPattern}/new-member/sign/${quoteCartId}`,
  )
  const toggleCheckout = createToggleCheckout(history, quoteCartId, pathLocale)

  const offerData = selectedBundleVariant
    ? getOfferData(selectedBundleVariant.bundle)
    : null

  const onInsuranceSelectorChange = (
    newSelectedBundleVariant: QuoteBundleVariant,
  ) => {
    setSelectedInsuranceTypes(
      getInsuranceTypesFromBundleVariant(newSelectedBundleVariant),
    )
    if (offerData) {
      const isReferralCodeUsed =
        redeemedCampaign?.incentive?.__typename === 'MonthlyCostDeduction'
      trackOfferGTM(
        EventName.InsuranceSelectionToggle,
        getOfferData(newSelectedBundleVariant.bundle),
        isReferralCodeUsed,
        { switchedFrom: offerData },
      )
    }
  }

  const handleCheckoutUpsellCardAccepted = (
    newSelectedBundleVariant: QuoteBundleVariant,
  ) => {
    setSelectedInsuranceTypes(
      getInsuranceTypesFromBundleVariant(newSelectedBundleVariant),
    )
    if (offerData) {
      const isReferralCodeUsed =
        redeemedCampaign?.incentive?.__typename === 'MonthlyCostDeduction'
      trackOfferGTM(
        EventName.OfferCrossSell,
        getOfferData(newSelectedBundleVariant.bundle),
        isReferralCodeUsed,
        { switchedFrom: offerData },
      )
    }
  }

  const isReferralCodeUsed =
    redeemedCampaign?.incentive?.__typename === 'MonthlyCostDeduction'
  useEffect(() => {
    if (offerData) {
      trackOfferGTM(EventName.OfferCreated, offerData, isReferralCodeUsed)
    }
  }, [offerData, isReferralCodeUsed])

  const handleCheckoutToggle = (open: boolean) => {
    toggleCheckout(open)
  }

  const handleClickPhoneNumber = (status: 'opened' | 'closed') => {
    if (offerData) {
      trackOfferGTM(
        EventName.ClickCallNumber,
        offerData,
        quoteCartData?.quoteCart.campaign?.incentive?.__typename ===
          'MonthlyCostDeduction',
        { phoneNumberData: { path: history.location.pathname, status } },
      )
    }
  }

  if (!isQuoteCartEnabled) {
    return <Redirect to={`/${pathLocale}/new-member`} />
  }

  if (isLoadingQuoteCart) {
    return <LoadingPage />
  }

  if (checkoutStatus === CheckoutStatus.Completed && offerData) {
    return <CheckoutSuccessRedirect offerData={offerData} />
  }

  return (
    <Page>
      {![Variation.IOS, Variation.ANDROID].includes(variation!) && (
        <TopBar isTransparent>
          {isCustomerServicePhoneNumberEnabled && callCenter ? (
            <PhoneNumber color="white" onClick={handleClickPhoneNumber} />
          ) : (
            <LanguagePicker
              color="white"
              path={`/new-member/offer/${quoteCartId}`}
            />
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
                quoteCartId={quoteCartId}
                allQuotes={getUniqueQuotesFromVariantList(bundleVariants)}
                offerData={offerData}
                campaign={redeemedCampaign}
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
            quoteCartId={quoteCartId}
            checkoutMethod={checkoutMethod}
            campaign={redeemedCampaign}
            initialCheckoutStatus={checkoutStatus}
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

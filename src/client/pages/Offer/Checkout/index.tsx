import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useFormik } from 'formik'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useApolloClient } from '@apollo/react-hooks'
import { TOP_BAR_Z_INDEX } from 'components/TopBar'
import {
  QuoteBundleVariant,
  useStartCheckoutMutation,
  useCheckoutStatusQuery,
  CheckoutStatus,
  InsuranceTermType,
  CheckoutMethod,
  CampaignDataFragment,
  useEditBundledQuoteMutation,
} from 'data/graphql'
import {
  getUniqueQuotesFromVariantList,
  getQuoteIdsFromBundleVariant,
  isNorwegianBundle,
} from 'pages/OfferNew/utils'
import { PriceBreakdown } from 'pages/OfferNew/common/PriceBreakdown'
import { useStorage } from 'utils/StorageContainer'
import { useTextKeys } from 'utils/textKeys'
import { useLockBodyScroll } from 'utils/hooks/useLockBodyScroll'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { CampaignBadge } from 'components/CampaignBadge/CampaignBadge'
import { DiscountTag } from 'components/DiscountTag/DiscountTag'
import { setupQuoteCartSession } from 'containers/SessionContainer'
import { reportUnderwritingLimits } from 'utils/sentry-client'
import { trackSignedEvent } from 'utils/tracking/tracking'
import { useVariation } from 'utils/hooks/useVariation'
import { StartDate } from 'pages/Offer/Introduction/Sidebar/StartDate'
import { useScrollLock, VisibilityState } from 'pages/OfferNew/Checkout/hooks'
import { InsuranceSummary } from 'pages/OfferNew/Checkout/InsuranceSummary'
import { UpsellCard } from 'pages/OfferNew/Checkout/UpsellCard'
import { OfferData } from 'pages/OfferNew/types'
import { QuoteInput } from '../Introduction/DetailsModal/types'
import { apolloClient as realApolloClient } from '../../../apolloClient'
import {
  CheckoutDetailsForm,
  getCheckoutDetailsValidationSchema,
} from './UserDetailsForm'
import { Sign } from './Sign'
import { SignDisclaimer } from './SignDisclaimer'

export type SignUiState = 'NOT_STARTED' | 'STARTED' | 'FAILED'

type Openable = {
  visibilityState: VisibilityState
}

type ScrollWrapperProps = {
  windowHeight: number
}

const slideInStyles = ({ visibilityState }: Openable) => {
  if (visibilityState === VisibilityState.CLOSED) {
    return css`
      opacity: 0;
      transform: translateX(25%);
    `
  }

  if (
    visibilityState === VisibilityState.CLOSING ||
    visibilityState === VisibilityState.OPENING
  ) {
    return css`
      opacity: 0;
      transform: translateX(25%);
    `
  }

  return css`
    opacity: 1;
    transform: translateX(0);
  `
}

const OuterWrapper = styled('div')<Openable>`
  background: ${colorsV3.white};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  max-width: 34rem;
  width: 100%;
  z-index: ${TOP_BAR_Z_INDEX + 1};
  transition: transform 300ms, opacity 300ms;
  ${slideInStyles};

  ${({ visibilityState }) =>
    visibilityState === VisibilityState.CLOSED ? 'display: none;' : ''};
`

const ScrollWrapper = styled('div')<ScrollWrapperProps>`
  height: ${({ windowHeight }) => windowHeight}px;
  overflow-y: scroll;
`

const InnerWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  padding: 1.5rem 1rem;

  @media (min-width: 40rem) {
    padding: 2rem;
  }
`

const Section = styled.div`
  width: 100%;
`

const StyledCampaignBadge = styled(CampaignBadge)`
  margin-top: 2rem;
`

const StartDateWrapper = styled.div`
  position: relative;
  margin-top: 0.375rem;
  margin-bottom: 2rem;
`

const StartDateLabel = styled.p`
  margin: 0 0 0.5rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1;
`

const Heading = styled.h3`
  margin: 0;
  font-size: 2rem;
  line-height: 1.25;
  padding-top: 1rem;
`

const Backdrop = styled('div')<Openable>`
  position: fixed;
  background: rgba(25, 25, 25, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 300ms;

  ${({ visibilityState }) => {
    if (visibilityState === VisibilityState.CLOSED) {
      return `
       opacity: 0;
       z-index: -1;
     `
    }

    if (
      visibilityState === VisibilityState.CLOSING ||
      visibilityState === VisibilityState.OPENING
    ) {
      return `
       opacity: 0;
       z-index: ${TOP_BAR_Z_INDEX};
     `
    }

    return `
      opacity: 1;
      z-index: ${TOP_BAR_Z_INDEX};
    `
  }};
`

const getSignUiStateFromCheckoutStatus = (
  checkoutStatus?: CheckoutStatus,
): SignUiState => {
  switch (checkoutStatus) {
    case CheckoutStatus.Pending:
    case CheckoutStatus.Signed:
      return 'STARTED'
    case CheckoutStatus.Failed:
      return 'FAILED'
    default:
      return 'NOT_STARTED'
  }
}

export type CheckoutProps = {
  quoteCartId: string
  offerData: OfferData
  quoteBundleVariants: QuoteBundleVariant[]
  campaign?: CampaignDataFragment
  initialCheckoutStatus?: CheckoutStatus
  checkoutMethod?: CheckoutMethod
  selectedQuoteBundleVariant: QuoteBundleVariant
  onUpsellAccepted: (selectedBundleVariant: QuoteBundleVariant) => void
  isOpen?: boolean
  onClose?: () => void
}

export const Checkout = ({
  quoteCartId,
  offerData,
  checkoutMethod,
  campaign,
  initialCheckoutStatus,
  quoteBundleVariants,
  selectedQuoteBundleVariant,
  onUpsellAccepted,
  isOpen,
  onClose,
}: CheckoutProps) => {
  const textKeys = useTextKeys()
  const locale = useCurrentLocale()
  const client = useApolloClient()
  const storage = useStorage()
  const variation = useVariation()
  const [isUpsellCardVisible, isPhoneNumberRequired] = useFeature([
    Features.CHECKOUT_UPSELL_CARD,
    Features.COLLECT_PHONE_NUMBER_AT_CHECKOUT,
  ])

  const scrollWrapper = useRef<HTMLDivElement>()
  const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight)
  const [visibilityState, setVisibilityState] = useState(VisibilityState.CLOSED)

  const campaignCode = campaign?.code
  const isDiscountMonthlyCostDeduction =
    campaign?.incentive?.__typename === 'MonthlyCostDeduction'

  const [signUiState, setSignUiState] = useState<SignUiState>(() =>
    getSignUiStateFromCheckoutStatus(initialCheckoutStatus),
  )
  const [isCompletingCheckout, setIsCompletingCheckout] = useState(false)
  const { data: checkoutStatusData } = useCheckoutStatusQuery({
    pollInterval: signUiState === 'STARTED' ? 1000 : 0,
    variables: {
      quoteCartId,
    },
  })
  const { status: checkoutStatus } =
    checkoutStatusData?.quoteCart.checkout || {}

  const [startCheckout] = useStartCheckoutMutation()
  const [
    editQuoteMutation,
    { loading: editQuoteInProgress },
  ] = useEditBundledQuoteMutation()

  const mainQuote = selectedQuoteBundleVariant.bundle.quotes[0]
  const allQuoteIds = getUniqueQuotesFromVariantList(quoteBundleVariants).map(
    ({ id }) => id,
  )
  const privacyPolicyLink = mainQuote.insuranceTerms.find(
    ({ type }) => type === InsuranceTermType.PrivacyPolicy,
  )?.url

  const { firstName, lastName, email, ssn, phoneNumber } = mainQuote
  const formik = useFormik<QuoteInput>({
    initialValues: {
      firstName,
      lastName,
      email,
      ssn,
      phoneNumber,
    } as QuoteInput,
    validationSchema: getCheckoutDetailsValidationSchema(
      locale,
      isPhoneNumberRequired,
    ),
    onSubmit: (values) => updateQuotes(values),
    enableReinitialize: true,
  })

  useLockBodyScroll({ isLocked: visibilityState === VisibilityState.OPEN })
  useScrollLock(visibilityState, scrollWrapper)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisibilityState(VisibilityState.OPEN), 50)
      setVisibilityState(VisibilityState.OPENING)
    } else {
      setTimeout(() => {
        setVisibilityState(VisibilityState.CLOSED)
      }, 300)
      setVisibilityState(VisibilityState.CLOSING)
    }
  }, [isOpen])

  useEffect(() => {
    const handle = () => setWindowInnerHeight(window.innerHeight)
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  useEffect(() => {
    if (typeof Intercom === 'undefined') {
      return
    }
    if (visibilityState === VisibilityState.OPEN) {
      Intercom('update', { hide_default_launcher: true })
    }
    if (visibilityState === VisibilityState.CLOSING) {
      Intercom('update', { hide_default_launcher: false })
    }
  }, [visibilityState])

  useEffect(() => {
    if (checkoutStatus === CheckoutStatus.Failed) {
      setSignUiState('FAILED')
      return
    }
  }, [checkoutStatus])

  const completeCheckout = useCallback(async () => {
    setIsCompletingCheckout(true)
    setSignUiState('STARTED')
    try {
      const memberId = await setupQuoteCartSession({
        quoteCartId,
        apolloClientUtils: {
          client,
          subscriptionClient: realApolloClient!.subscriptionClient,
          httpLink: realApolloClient!.httpLink,
        },
        storage,
      })
      trackSignedEvent({
        variation,
        campaignCode,
        isDiscountMonthlyCostDeduction,
        memberId,
        offerData,
      })
    } catch (error) {
      setSignUiState('FAILED')
    } finally {
      setIsCompletingCheckout(false)
    }
  }, [
    campaignCode,
    client,
    isDiscountMonthlyCostDeduction,
    offerData,
    quoteCartId,
    storage,
    variation,
  ])

  useEffect(() => {
    if (checkoutStatus === CheckoutStatus.Signed && !isCompletingCheckout) {
      completeCheckout()
    }
  }, [checkoutStatus, completeCheckout, isCompletingCheckout])

  const startSign = async () => {
    setSignUiState('STARTED')
    const { submitForm, dirty: isFormDataUpdated, validateForm } = formik

    try {
      const quoteIds = getQuoteIdsFromBundleVariant(selectedQuoteBundleVariant)
      const errors = await validateForm()

      if (Object.keys(errors).length) {
        setSignUiState('FAILED')
        return
      }

      if (isFormDataUpdated) await submitForm()
      const { data } = await startCheckout({
        variables: {
          quoteIds,
          quoteCartId,
        },
      })
      if (data?.quoteCart_startCheckout.__typename === 'BasicError') {
        setSignUiState('FAILED')
        return
      }
    } catch (e) {
      setSignUiState('FAILED')
      return
    }
  }

  const handleSignStart = () => {
    if (checkoutStatus === CheckoutStatus.Signed) {
      completeCheckout()
    } else {
      startSign()
    }
  }

  const updateQuotes = async (form: QuoteInput) => {
    const { firstName, lastName, email, ssn, phoneNumber } = form
    const editQuoteMutationVariables = {
      locale: locale.isoLocale,
      quoteCartId,
      payload: {
        firstName,
        lastName,
        email,
        ssn,
        phoneNumber,
      },
    }
    const results = await Promise.all(
      allQuoteIds.map((id) =>
        editQuoteMutation({
          variables: {
            ...editQuoteMutationVariables,
            quoteId: id,
          },
        }),
      ),
    )
    results.forEach(({ data }) => {
      const quoteCart = data?.quoteCart_editQuote
      if (quoteCart?.__typename === 'QuoteBundleError') {
        reportUnderwritingLimits(quoteCart, allQuoteIds)
        throw new Error('Quote editing failed')
      }
    })
  }

  return (
    <>
      <OuterWrapper visibilityState={visibilityState}>
        <ScrollWrapper
          ref={scrollWrapper as React.MutableRefObject<HTMLDivElement | null>}
          windowHeight={windowInnerHeight}
        >
          <InnerWrapper>
            <CloseButton onClick={onClose} />
            <Section>
              <StyledCampaignBadge
                quoteCartId={quoteCartId}
                isNorwegianBundle={isNorwegianBundle(offerData)}
              >
                <DiscountTag offerData={offerData} />
              </StyledCampaignBadge>
              <Heading>{textKeys.CHECKOUT_HEADING()}</Heading>
              <PriceBreakdown
                offerData={offerData}
                showTotal={true}
                isLoading={editQuoteInProgress}
              />
              <CheckoutDetailsForm formikProps={formik} />
              <StartDateWrapper>
                <StartDateLabel>
                  {textKeys.SIDEBAR_STARTDATE_CELL_LABEL()}
                </StartDateLabel>
                <StartDate quoteCartId={quoteCartId} offerData={offerData} />
              </StartDateWrapper>
              {isUpsellCardVisible && (
                <UpsellCard
                  quoteBundleVariants={quoteBundleVariants}
                  selectedQuoteBundleVariant={selectedQuoteBundleVariant}
                  onUpsellAccepted={onUpsellAccepted}
                />
              )}
              <InsuranceSummary offerData={offerData} />
            </Section>
            <SignDisclaimer
              privacyPolicyLink={privacyPolicyLink}
              checkoutMethod={checkoutMethod}
            />
          </InnerWrapper>
          <Sign
            canInitiateSign={
              formik.isValid &&
              !editQuoteInProgress &&
              signUiState !== 'STARTED'
            }
            checkoutMethod={checkoutMethod}
            signUiState={signUiState}
            onSignStart={handleSignStart}
          />
        </ScrollWrapper>
      </OuterWrapper>
      <Backdrop visibilityState={visibilityState} onClick={onClose} />
    </>
  )
}

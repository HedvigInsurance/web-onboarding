import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useFormik } from 'formik'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { FetchResult, useApolloClient } from '@apollo/react-hooks'
import { TOP_BAR_Z_INDEX } from 'components/TopBar'
import {
  QuoteBundleVariant,
  useCreateQuoteBundleMutation,
  useStartCheckoutMutation,
  useCheckoutStatusQuery,
  CheckoutStatus,
  InsuranceTermType,
  CreateQuoteBundleMutation,
  CheckoutMethod,
  CampaignDataFragment,
} from 'data/graphql'
import {
  getOfferData,
  getUniqueQuotesFromVariantList,
  getQuoteIdsFromBundleVariant,
  getBundleVariantFromInsuranceTypesWithFallback,
} from 'pages/OfferNew/utils'
import { PriceBreakdown } from 'pages/OfferNew/common/PriceBreakdown'
import { useStorage } from 'utils/StorageContainer'
import { useTextKeys } from 'utils/textKeys'
import { useLockBodyScroll } from 'utils/hooks/useLockBodyScroll'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { DiscountTag } from 'components/DiscountTag/DiscountTag'
import { setupQuoteCartSession } from 'containers/SessionContainer'
import { reportUnderwritingLimits } from 'utils/sentry-client'
import { trackSignedEvent } from 'utils/tracking/tracking'
import { useVariation } from 'utils/hooks/useVariation'
import { StartDate } from 'pages/OfferNew/Introduction/Sidebar/StartDate'
import { useScrollLock, VisibilityState } from 'pages/OfferNew/Checkout/hooks'
import { SignFailModal } from 'pages/OfferNew/Checkout/SignFailModal'
import { InsuranceSummary } from 'pages/OfferNew/Checkout/InsuranceSummary'
import { UpsellCard } from 'pages/OfferNew/Checkout/UpsellCard'
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

const DiscountTagWrapper = styled.div`
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
  quoteBundleVariants: QuoteBundleVariant[]
  campaign: CampaignDataFragment | null
  initialCheckoutStatus?: CheckoutStatus
  checkoutMethod?: CheckoutMethod
  selectedQuoteBundleVariant: QuoteBundleVariant
  onUpsellAccepted: (selectedBundleVariant: QuoteBundleVariant) => void
  isOpen?: boolean
  onClose?: () => void
  refetch: () => Promise<void>
}

export const Checkout = ({
  quoteCartId,
  checkoutMethod,
  campaign,
  initialCheckoutStatus,
  quoteBundleVariants,
  selectedQuoteBundleVariant,
  onUpsellAccepted,
  isOpen,
  onClose,
  refetch,
}: CheckoutProps) => {
  const textKeys = useTextKeys()
  const locale = useCurrentLocale()
  const client = useApolloClient()
  const storage = useStorage()
  const variation = useVariation()
  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()
  const [isUpsellCardVisible] = useFeature([Features.CHECKOUT_UPSELL_CARD])

  const scrollWrapper = useRef<HTMLDivElement>()
  const [isShowingFailModal, setIsShowingFailModal] = useState(false)
  const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight)
  const [visibilityState, setVisibilityState] = useState(VisibilityState.CLOSED)

  const campaignCode = campaign?.code
  const isDiscountMonthlyCostDeduction =
    campaign?.incentive?.__typename === 'MonthlyCostDeduction'

  const offerData = getOfferData(selectedQuoteBundleVariant.bundle)

  const [signUiState, setSignUiState] = useState<SignUiState>(() =>
    getSignUiStateFromCheckoutStatus(initialCheckoutStatus),
  )
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
    createQuoteBundle,
    { loading: isBundleCreationInProgress },
  ] = useCreateQuoteBundleMutation()

  const mainQuote = selectedQuoteBundleVariant.bundle.quotes[0]
  const privacyPolicyLink = mainQuote.insuranceTerms.find(
    ({ type }) => type === InsuranceTermType.PrivacyPolicy,
  )?.url
  const formik = useFormik<QuoteInput>({
    initialValues: {
      ...mainQuote,
      data: {
        ...mainQuote.data,
      },
    } as QuoteInput,
    validationSchema: getCheckoutDetailsValidationSchema(locale),
    onSubmit: (values) => reCreateQuoteBundle(values),
    validateOnMount: true,
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
    const setWindowHeight = () => {
      setWindowInnerHeight(window.innerHeight)
    }
    window.addEventListener('resize', setWindowHeight)
    return () => {
      window.removeEventListener('resize', setWindowHeight)
    }
  })

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
    if (checkoutStatus === CheckoutStatus.Signed) {
      completeCheckout()
    }
  }, [checkoutStatus, completeCheckout])

  const startSign = async () => {
    setSignUiState('STARTED')
    const { values, initialValues, submitForm } = formik
    const { firstName, lastName, email, ssn } = values

    try {
      let quoteIds = getQuoteIdsFromBundleVariant(selectedQuoteBundleVariant)
      if (
        firstName !== initialValues.firstName ||
        lastName !== initialValues.lastName ||
        email !== initialValues.email ||
        ssn !== initialValues.ssn
      ) {
        const result: FetchResult<CreateQuoteBundleMutation> = await submitForm()
        const quoteCart = result.data?.quoteCart_createQuoteBundle
        if (
          !quoteCart ||
          quoteCart?.__typename !== 'QuoteCart' ||
          !quoteCart?.bundle?.possibleVariations
        ) {
          if (quoteCart && quoteCart.__typename === 'QuoteBundleError')
            reportUnderwritingLimits(quoteCart, values)
          return setSignUiState('FAILED')
        }

        const bundleVariants = quoteCart.bundle.possibleVariations
        const updatedSelectedQuoteBundleVariant = getBundleVariantFromInsuranceTypesWithFallback(
          bundleVariants as QuoteBundleVariant[],
          selectedInsuranceTypes,
        )
        quoteIds = getQuoteIdsFromBundleVariant(
          updatedSelectedQuoteBundleVariant,
        )
        console.log('RESULT', result)
      }

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

  const reCreateQuoteBundle = (form: QuoteInput) => {
    const {
      firstName,
      lastName,
      birthDate,
      email,
      ssn,
      startDate,
      phoneNumber,
      dataCollectionId,
    } = form
    return createQuoteBundle({
      variables: {
        locale: locale.isoLocale,
        quoteCartId,
        quotes: getUniqueQuotesFromVariantList(quoteBundleVariants).map(
          ({ data: { type, typeOfContract } }) => {
            return {
              firstName,
              lastName,
              email,
              birthDate,
              ssn,
              startDate,
              phoneNumber,
              dataCollectionId,
              data: {
                ...form.data,
                type,
                typeOfContract,
              },
            }
          },
        ),
      },
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
              <DiscountTagWrapper>
                <DiscountTag offerData={offerData} />
              </DiscountTagWrapper>
              <Heading>{textKeys.CHECKOUT_HEADING()}</Heading>
              <PriceBreakdown
                offerData={offerData}
                showTotal={true}
                isLoading={isBundleCreationInProgress}
              />
              <CheckoutDetailsForm formikProps={formik} />
              <StartDateWrapper>
                <StartDateLabel>
                  {textKeys.SIDEBAR_STARTDATE_CELL_LABEL()}
                </StartDateLabel>
                <StartDate offerData={offerData} refetch={refetch} />
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
              !isBundleCreationInProgress &&
              signUiState !== 'STARTED'
            }
            checkoutMethod={checkoutMethod}
            signUiState={signUiState}
            onSignStart={startSign}
          />
        </ScrollWrapper>
      </OuterWrapper>
      <Backdrop visibilityState={visibilityState} onClick={onClose} />
      <SignFailModal
        isVisible={isShowingFailModal}
        onClose={() => setIsShowingFailModal(false)}
      />
    </>
  )
}

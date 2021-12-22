import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { FetchResult, useApolloClient } from '@apollo/react-hooks'
import { TOP_BAR_Z_INDEX } from 'components/TopBar'
import {
  QuoteBundleVariant,
  useCreateQuoteBundleMutation,
  useQuoteCartQuery,
  useStartCheckoutMutation,
  useCheckoutStatusQuery,
  CheckoutStatus,
  InsuranceTermType,
  CreateQuoteBundleMutation,
  useMemberLazyQuery,
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
import { Variation, useVariation } from 'utils/hooks/useVariation'
import { handleSignedEvent } from 'utils/tracking/signing'
import { adtraction } from 'utils/tracking/adtraction'
import { trackOfferGTM, EventName } from 'utils/tracking/gtm'
import { trackStudentkortet } from 'utils/tracking/studentkortet'
import { StartDate } from '../../OfferNew/Introduction/Sidebar/StartDate'
import { useScrollLock, VisibilityState } from '../../OfferNew/Checkout/hooks'
import { SignFailModal } from '../../OfferNew/Checkout/SignFailModal'
import { InsuranceSummary } from '../../OfferNew/Checkout/InsuranceSummary'
import { UpsellCard } from '../../OfferNew/Checkout/UpsellCard'
import { QuoteInput } from '../Introduction/DetailsModal/types'
import { apolloClient as realApolloClient } from '../../../apolloClient'
import { CheckoutSuccessRedirect } from './CheckoutSuccessRedirect'
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
  selectedQuoteBundleVariant: QuoteBundleVariant
  onUpsellAccepted: (selectedBundleVariant: QuoteBundleVariant) => void
  isOpen?: boolean
  onClose?: () => void
  refetch: () => Promise<void>
}

export const Checkout = ({
  quoteCartId,
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
  const variation = useVariation()
  const storage = useStorage()
  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()
  const [isUpsellCardVisible] = useFeature([Features.CHECKOUT_UPSELL_CARD])

  const scrollWrapper = useRef<HTMLDivElement>()
  const [isShowingFailModal, setIsShowingFailModal] = useState(false)
  const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight)
  const [visibilityState, setVisibilityState] = useState(VisibilityState.CLOSED)

  const offerData = getOfferData(selectedQuoteBundleVariant.bundle)

  const { data: { quoteCart } = {} } = useQuoteCartQuery({
    variables: { id: quoteCartId, locale: locale.isoLocale },
  })
  const checkoutMethod = quoteCart?.checkoutMethods[0]
  const initialCheckoutStatus = quoteCart?.checkout?.status
  const discountCode = quoteCart?.campaign?.code
  const isDiscountMonthlyCostDeduction =
    quoteCart?.campaign?.incentive?.__typename === 'MonthlyCostDeduction'

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
  const [fetchMember, { data: memberData }] = useMemberLazyQuery()

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

  useEffect(() => {
    if (checkoutStatus === CheckoutStatus.Signed) {
      setupQuoteCartSession({
        quoteCartId,
        apolloClientUtils: {
          client,
          subscriptionClient: realApolloClient!.subscriptionClient,
          httpLink: realApolloClient!.httpLink,
        },
        storage,
      })
    }
  }, [checkoutStatus, client, quoteCartId, storage])

  useEffect(() => {
    if (checkoutStatus === CheckoutStatus.Completed) {
      fetchMember()
    }
  }, [checkoutStatus, fetchMember])

  useEffect(() => {
    if (!memberData?.member.id) return

    const memberId = memberData?.member.id

    // AVY
    if (variation === Variation.AVY) {
      handleSignedEvent(memberId)
    }

    // useTrack()
    adtraction(
      parseFloat(
        selectedQuoteBundleVariant.bundle.bundleCost.monthlyGross.amount,
      ),
      memberId,
      mainQuote.email || '',
      offerData,
      discountCode,
    )

    trackOfferGTM(
      EventName.SignedCustomer,
      { ...offerData, memberId: memberId || '' },
      isDiscountMonthlyCostDeduction,
    )

    if (
      discountCode &&
      ['studentkortet', 'stuk2'].includes(discountCode.toLowerCase()) &&
      memberId
    ) {
      trackStudentkortet(memberId)
    }
  }, [
    memberData?.member.id,
    discountCode,
    variation,
    selectedQuoteBundleVariant.bundle.bundleCost.monthlyGross.amount,
    mainQuote.email,
    offerData,
    isDiscountMonthlyCostDeduction,
  ])

  // useUnderwritingLimitsHitReporter(
  //   createQuoteBundleData.data?.editQuote?.__typename === 'UnderwritingLimitsHit' &&
  //     editQuoteResult.data.editQuote.limits.map((limit) => limit.code),
  //   quoteIds,
  // )

  const startSign = async () => {
    setSignUiState('STARTED')
    const {
      values: { firstName, lastName, email, ssn },
      initialValues,
      submitForm,
    } = formik

    try {
      let quoteIds = getQuoteIdsFromBundleVariant(selectedQuoteBundleVariant)
      if (
        firstName !== initialValues.firstName ||
        lastName !== initialValues.lastName ||
        email !== initialValues.email ||
        ssn !== initialValues.ssn
      ) {
        const result: FetchResult<CreateQuoteBundleMutation> = await submitForm()
        const createQuoteBundle = result.data?.quoteCart_createQuoteBundle
        if (
          createQuoteBundle?.__typename !== 'QuoteCart' ||
          !createQuoteBundle?.bundle?.possibleVariations
        )
          return setSignUiState('FAILED')

        const bundleVariants = createQuoteBundle.bundle.possibleVariations
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

  if (memberData?.member.id)
    return <CheckoutSuccessRedirect offerData={offerData} />

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

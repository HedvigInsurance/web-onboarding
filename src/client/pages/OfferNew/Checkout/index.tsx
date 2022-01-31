import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { TOP_BAR_Z_INDEX } from 'components/TopBar'
import {
  useMemberQuery,
  useSignQuotesMutation,
  useSignStatusLazyQuery,
  useSignMethodForQuotesQuery,
  useEditQuoteMutation,
  SignState,
  BankIdStatus,
  QuoteBundleVariant,
  EditQuoteInput,
} from 'data/graphql'
import { getQuoteIds, getOfferData } from 'pages/OfferNew/utils'
import { PriceBreakdown } from 'pages/OfferNew/common/PriceBreakdown'
import { handleSignedEvent } from 'utils/tracking/signing'
import { useTextKeys } from 'utils/textKeys'
import { useTrack } from 'utils/tracking/tracking'
import { Variation, useVariation } from 'utils/hooks/useVariation'
import { useUnderwritingLimitsHitReporter } from 'utils/sentry-client'
import { useLockBodyScroll } from 'utils/hooks/useLockBodyScroll'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { DiscountTag } from 'components/DiscountTag/DiscountTag'
import { StartDate } from '../Introduction/Sidebar/StartDate'
import { useScrollLock, VisibilityState, useSsnError } from './hooks'
import { Sign, SignUiState } from './Sign'
import { SignDisclaimer } from './SignDisclaimer'
import { CheckoutSuccessRedirect } from './CheckoutSuccessRedirect'
import { SignFailModal } from './SignFailModal/SignFailModal'
import { UserDetailsForm } from './UserDetailsForm'
import { InsuranceSummary } from './InsuranceSummary'
import { UpsellCard } from './UpsellCard'

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

export type CheckoutProps = {
  quoteBundleVariants: QuoteBundleVariant[]
  selectedQuoteBundleVariant: QuoteBundleVariant
  onUpsellAccepted: (selectedBundleVariant: QuoteBundleVariant) => void
  isOpen?: boolean
  onClose?: () => void
  refetch: () => Promise<void>
}

export const Checkout = ({
  quoteBundleVariants,
  selectedQuoteBundleVariant,
  onUpsellAccepted,
  isOpen,
  onClose,
  refetch,
}: CheckoutProps) => {
  const textKeys = useTextKeys()
  const locale = useCurrentLocale()
  const variation = useVariation()

  const [visibilityState, setVisibilityState] = useState(VisibilityState.CLOSED)

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

  useLockBodyScroll({ isLocked: visibilityState === VisibilityState.OPEN })

  const [signUiState, setSignUiState] = useState<SignUiState>('NOT_STARTED')
  const [emailUpdateLoading, setEmailUpdateLoading] = useState(false)
  const [ssnUpdateLoading, setSsnUpdateLoading] = useState(false)
  const [isShowingFailModal, setIsShowingFailModal] = useState(false)
  const [isPhoneNumberUpdating, setIsPhoneNumberUpdating] = useState(false)
  const offerData = getOfferData(selectedQuoteBundleVariant.bundle)
  const quoteIds = getQuoteIds(offerData)

  const [startPollingSignState, signStatusQueryProps] = useSignStatusLazyQuery({
    pollInterval: 1000,
  })
  const signStatus = signStatusQueryProps.data?.signStatus ?? null

  const [signQuotes, signQuotesMutation] = useSignQuotesMutation()
  const member = useMemberQuery()
  const { data: signMethodData } = useSignMethodForQuotesQuery({
    variables: { input: quoteIds },
  })
  const [editQuote, editQuoteResult] = useEditQuoteMutation()

  const { ssnBackendError } = useSsnError(editQuoteResult)

  const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight)

  const [firstName, setFirstName] = useState(offerData.person.firstName ?? '')
  const [lastName, setLastName] = useState(offerData.person.lastName ?? '')

  const [isUpsellCardVisible] = useFeature([Features.CHECKOUT_UPSELL_CARD])

  const [isPhoneNumberRequired] = useFeature([
    Features.COLLECT_PHONE_NUMBER_AT_CHECKOUT,
  ])
  useEffect(() => {
    const setWindowHeight = () => {
      setWindowInnerHeight(window.innerHeight)
    }

    window.addEventListener('resize', setWindowHeight)

    return () => {
      window.removeEventListener('resize', setWindowHeight)
    }
  })

  const scrollWrapper = useRef<HTMLDivElement>()
  useScrollLock(visibilityState, scrollWrapper)

  useEffect(
    function syncFirstnameLastnameStates() {
      if (offerData.person.firstName) {
        setFirstName(offerData.person.firstName)
      }

      if (offerData.person.lastName) {
        setLastName(offerData.person.lastName)
      }
    },
    [offerData.person.firstName, offerData.person.lastName],
  )

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
    if (signUiState === 'STARTED' || signUiState === 'STARTED_WITH_REDIRECT') {
      startPollingSignState()
    }
  }, [signUiState, startPollingSignState])

  useEffect(() => {
    if (signStatus?.collectStatus?.status === BankIdStatus.Failed) {
      setSignUiState('FAILED')
      return
    }
  }, [signStatus?.collectStatus?.status])

  useTrack({
    offerData,
    signState: signStatus?.signState,
  })

  useEffect(() => {
    if (signStatus?.signState !== SignState.Completed) {
      return
    }
    if (variation === Variation.AVY) {
      handleSignedEvent(member.data?.member.id ?? null)
    }
  }, [member.data?.member, signStatus?.signState, variation])

  const canInitiateSign = Boolean(
    signUiState !== 'STARTED' &&
      signUiState !== 'STARTED_WITH_REDIRECT' &&
      !signQuotesMutation.loading &&
      firstName &&
      lastName &&
      offerData.person.email &&
      offerData.person.ssn,
  )

  const editQuotes = async (
    quoteIds: string[],
    input: Omit<EditQuoteInput, 'id'>,
  ) => {
    await Promise.all(
      quoteIds.map((id) =>
        editQuote({ variables: { input: { ...input, id } } }),
      ),
    )
    refetch()
  }

  const onEmailChange = async (email: string) => {
    const { email: currentEmail } = offerData.person
    if (!email || currentEmail === email) return

    setEmailUpdateLoading(true)
    await editQuotes(quoteIds, { email })
    setEmailUpdateLoading(false)
  }

  const onSsnChange = async (ssn: string) => {
    const { ssn: currentSsn } = offerData.person
    if (!ssn || currentSsn === ssn) return

    setSsnUpdateLoading(true)
    await editQuotes(quoteIds, { ssn })
    setSsnUpdateLoading(false)
  }

  const onPhoneChange = async (phoneNumber: string) => {
    const { phoneNumber: currentPhone } = offerData.person
    if (!phoneNumber || currentPhone === phoneNumber) return
    setIsPhoneNumberUpdating(true)
    await editQuotes(quoteIds, { phoneNumber })
    setIsPhoneNumberUpdating(false)
  }

  const isPhoneNumberGoodToGo = isPhoneNumberRequired
    ? !isPhoneNumberUpdating && Boolean(offerData.person.phoneNumber)
    : true

  const startSign = async () => {
    if (!canInitiateSign) {
      return
    }

    setSignUiState('PREPARING')

    const quoteIds = getQuoteIds(offerData)
    const firstAndLastNameAreSet = firstName !== null && lastName !== null
    const firstOrLastNameHasChanged =
      offerData.person.firstName !== firstName ||
      offerData.person.lastName !== lastName

    if (firstAndLastNameAreSet && firstOrLastNameHasChanged) {
      await Promise.all(
        quoteIds.map((id) =>
          editQuote({ variables: { input: { id, firstName, lastName } } }),
        ),
      )
    }

    const baseUrl = `${window.location.origin}/${locale}/new-member`
    signQuotes({
      variables: {
        quoteIds,
        successUrl: baseUrl + '/sign/success',
        failUrl: baseUrl + '/sign/fail',
      },
    })
      .then(({ data }) => {
        if (data?.signQuotes?.__typename === 'FailedToStartSign') {
          if (data?.signQuotes.errorCode === 'MANUAL_REVIEW_REQUIRED') {
            setIsShowingFailModal(true)
            return
          }
          setSignUiState('FAILED')
          return
        }
        if (data?.signQuotes && 'redirectUrl' in data?.signQuotes) {
          setSignUiState('STARTED_WITH_REDIRECT')
          if (data.signQuotes.redirectUrl) {
            window.location.href = data.signQuotes.redirectUrl
          }
          return
        }
        setSignUiState('STARTED')
      })
      .catch(() => setSignUiState('FAILED'))
  }

  useUnderwritingLimitsHitReporter(
    editQuoteResult.data?.editQuote?.__typename === 'UnderwritingLimitsHit' &&
      editQuoteResult.data.editQuote.limits.map((limit) => limit.code),
    quoteIds,
  )

  return (
    <>
      {signStatus?.signState !== SignState.Completed && (
        <>
          <OuterWrapper visibilityState={visibilityState}>
            <ScrollWrapper
              ref={
                scrollWrapper as React.MutableRefObject<HTMLDivElement | null>
              }
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
                    isLoading={ssnUpdateLoading}
                  />
                  <UserDetailsForm
                    firstName={firstName}
                    lastName={lastName}
                    onFirstNameChange={setFirstName}
                    onLastNameChange={setLastName}
                    email={offerData.person.email ?? ''}
                    onEmailChange={onEmailChange}
                    ssn={offerData.person.ssn ?? ''}
                    onSsnChange={onSsnChange}
                    ssnBackendError={ssnBackendError}
                    isFirstAndLastNameVisible={
                      !offerData.person.firstName || !offerData.person.lastName
                    }
                    onSubmit={startSign}
                    phoneNumber={offerData.person.phoneNumber ?? ''}
                    onPhoneChange={onPhoneChange}
                  />
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
                  offerData={offerData}
                  signMethod={signMethodData?.signMethodForQuotes}
                />
              </InnerWrapper>
              <Sign
                canInitiateSign={
                  canInitiateSign &&
                  !ssnUpdateLoading &&
                  !emailUpdateLoading &&
                  isPhoneNumberGoodToGo
                }
                signMethod={signMethodData?.signMethodForQuotes}
                signUiState={signUiState}
                signStatus={signStatus}
                isLoading={
                  signQuotesMutation.loading ||
                  signUiState === 'STARTED' ||
                  signUiState === 'STARTED_WITH_REDIRECT' ||
                  signUiState === 'PREPARING' ||
                  emailUpdateLoading
                }
                onSignStart={startSign}
              />
            </ScrollWrapper>
          </OuterWrapper>

          <Backdrop visibilityState={visibilityState} onClick={onClose} />
        </>
      )}
      {signStatus?.signState === SignState.Completed && (
        <CheckoutSuccessRedirect offerData={offerData} />
      )}
      <SignFailModal
        isVisible={isShowingFailModal}
        onClose={() => setIsShowingFailModal(false)}
      />
    </>
  )
}

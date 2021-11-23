import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { TOP_BAR_Z_INDEX } from 'components/TopBar'
import {
  Market,
  useCurrentLocale,
  useMarket,
} from 'components/utils/CurrentLocale'
import {
  useMemberQuery,
  useSignQuotesMutation,
  useSignStatusLazyQuery,
  useSignMethodForQuotesQuery,
  useEditQuoteMutation,
  SignState,
  BankIdStatus,
  QuoteBundleVariant,
  BundledQuote,
} from 'data/graphql'
import {
  getQuoteIds,
  getOfferData,
  isSwedishAccident,
} from 'pages/OfferNew/utils'
import { PriceBreakdown } from 'pages/OfferNew/common/PriceBreakdown'
import { handleSignedEvent } from 'utils/tracking/signing'
import { useTextKeys } from 'utils/textKeys'
import { useTrack } from 'utils/tracking/tracking'
import { Variation, useVariation } from 'utils/hooks/useVariation'
import { useLockBodyScroll } from 'utils/hooks/useLockBodyScroll'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { StartDate } from '../Introduction/Sidebar/StartDate'
import { useScrollLock, VisibilityState, useSsnError } from './hooks'
import { Sign, SignUiState } from './Sign'
import { SignDisclaimer } from './SignDisclaimer'
import { CheckoutSuccessRedirect } from './CheckoutSuccessRedirect'
import { SignFailModal } from './SignFailModal'
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
  line-height: 2.5rem;
  padding-top: 1.875rem;
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

const renderUpsellCard = (
  variants: QuoteBundleVariant[],
  selectedQuoteBundle: QuoteBundleVariant,
  onAcceptDeal: (quoteIds: string[]) => void,
  textKeys: Record<string, any>,
) => {
  const isSwedishAccidentAdded = selectedQuoteBundle.bundle.quotes.some(
    ({ quoteDetails }) => isSwedishAccident(quoteDetails),
  )
  if (isSwedishAccidentAdded) {
    return null
  }

  // Look for a bundle variant that includes Accident Insurance.
  // In case it founds it, store the bundle variant and the accident
  // insurance quote so we can use them to accept UpsellCard deal and
  // get the price of Accident Insurance.
  const remainingBundleVariants = variants.filter(
    ({ id }) => id !== selectedQuoteBundle.id,
  )
  let betterDealBundleVariant: QuoteBundleVariant | null = null
  let accidentInsuranceQuote: BundledQuote | null = null
  for (const bundleVariant of remainingBundleVariants) {
    const accidentInsuranceIndex = bundleVariant.bundle.quotes.findIndex(
      ({ quoteDetails }) => isSwedishAccident(quoteDetails),
    )

    if (accidentInsuranceIndex !== -1) {
      betterDealBundleVariant = bundleVariant
      accidentInsuranceQuote =
        betterDealBundleVariant.bundle.quotes[accidentInsuranceIndex]
      break
    }
  }

  if (betterDealBundleVariant === null || accidentInsuranceQuote === null) {
    return null
  }

  const localizedPerMonth = textKeys.SIDEBAR_PRICE_SUFFIX_INTERVAL()
  const { amount, currency } = accidentInsuranceQuote.price
  const price = `${amount} ${currency}${localizedPerMonth}`
  const betterDealQuoteIds = betterDealBundleVariant.bundle.quotes.map(
    ({ id }) => id,
  )

  return (
    <UpsellCard
      title={textKeys.UPSELL_TITLE()}
      description={textKeys.UPSELL_DESCRIPTION()}
      price={price}
      onAcceptDeal={() => onAcceptDeal(betterDealQuoteIds)}
    />
  )
}

export type CheckoutProps = {
  variants: QuoteBundleVariant[]
  selectedQuoteBundle: QuoteBundleVariant
  onAddQuotes: (quoteIds: string[]) => void
  isOpen?: boolean
  onClose?: () => void
  refetch: () => Promise<void>
}

export const Checkout = ({
  variants,
  selectedQuoteBundle,
  onAddQuotes,
  isOpen,
  onClose,
  refetch,
}: CheckoutProps) => {
  const textKeys = useTextKeys()
  const locale = useCurrentLocale()
  const market = useMarket()
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

  useLockBodyScroll({ lock: visibilityState === VisibilityState.OPEN })

  const [signUiState, setSignUiState] = useState<SignUiState>('NOT_STARTED')
  const [emailUpdateLoading, setEmailUpdateLoading] = useState(false)
  const [ssnUpdateLoading, setSsnUpdateLoading] = useState(false)
  const [isShowingFailModal, setIsShowingFailModal] = useState(false)
  const [fakeLoading, setFakeLoading] = React.useState(false)
  const [reallyLoading, setReallyLoading] = React.useState(false)

  const offerData = getOfferData(selectedQuoteBundle.bundle)
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
      handleSignedEvent(member.data?.member ?? null)
    }
  }, [member.data?.member, signStatus?.signState, variation])

  const canInitiateSign = Boolean(
    signUiState !== 'STARTED' &&
      signUiState !== 'STARTED_WITH_REDIRECT' &&
      !signQuotesMutation.loading &&
      offerData.person.email &&
      offerData.person.ssn,
  )

  const startSign = () => {
    if (!canInitiateSign) {
      return
    }

    const baseUrl = `${window.location.origin}/${locale}/new-member`
    signQuotes({
      variables: {
        quoteIds: getQuoteIds(offerData),
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
                  <Heading>{textKeys.CHECKOUT_HEADING()}</Heading>
                  <PriceBreakdown
                    offerData={offerData}
                    showTotal={true}
                    isLoading={fakeLoading || reallyLoading}
                  />
                  <UserDetailsForm
                    onSubmit={startSign}
                    email={offerData.person.email ?? ''}
                    onEmailChange={(email) => {
                      const onCompletion = new Promise<void>(
                        (resolve, reject) => {
                          Promise.all(
                            quoteIds.map((quoteId) =>
                              editQuote({
                                variables: { input: { id: quoteId, email } },
                              }),
                            ),
                          )
                            .then(() => refetch())
                            .then(() => resolve())
                            .catch((e) => {
                              reject(e)
                              throw e
                            })
                        },
                      )
                      setEmailUpdateLoading(true)
                      onCompletion.finally(() => setEmailUpdateLoading(false))
                    }}
                    ssn={offerData.person.ssn ?? ''}
                    ssnBackendError={ssnBackendError}
                    onSsnChange={(ssn) => {
                      const onCompletion = new Promise<void>(
                        (resolve, reject) => {
                          setFakeLoading(true)
                          setReallyLoading(true)
                          window.setTimeout(() => setFakeLoading(false), 1000)
                          Promise.all(
                            quoteIds.map((quoteId) =>
                              editQuote({
                                variables: { input: { id: quoteId, ssn } },
                              }),
                            ),
                          )
                            .then(() => refetch())
                            .then(() => setReallyLoading(false))
                            .then(() => resolve())
                            .catch((e) => {
                              setReallyLoading(false)
                              reject(e)
                              throw e
                            })
                        },
                      )
                      setSsnUpdateLoading(true)
                      onCompletion.finally(() => setSsnUpdateLoading(false))
                    }}
                  />
                  {market === Market.Se &&
                    renderUpsellCard(
                      variants,
                      selectedQuoteBundle,
                      onAddQuotes,
                      textKeys,
                    )}
                  <StartDateWrapper>
                    <StartDateLabel>
                      {textKeys.SIDEBAR_STARTDATE_CELL_LABEL()}
                    </StartDateLabel>
                    <StartDate offerData={offerData} refetch={refetch} />
                  </StartDateWrapper>

                  <InsuranceSummary offerData={offerData} />
                </Section>

                <SignDisclaimer
                  offerData={offerData}
                  signMethod={signMethodData?.signMethodForQuotes}
                />
              </InnerWrapper>
              <Sign
                canInitiateSign={
                  canInitiateSign && !ssnUpdateLoading && !emailUpdateLoading
                }
                signMethod={signMethodData?.signMethodForQuotes}
                signUiState={signUiState}
                signStatus={signStatus}
                isLoading={
                  signQuotesMutation.loading ||
                  signUiState === 'STARTED' ||
                  signUiState === 'STARTED_WITH_REDIRECT' ||
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

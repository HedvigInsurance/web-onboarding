import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { SemanticEvents } from 'quepasa'
import { Mount } from 'react-lifecycle-components'
import { Redirect } from 'react-router-dom'
import { BackArrow } from 'components/icons/BackArrow'
import { TOP_BAR_Z_INDEX } from 'components/TopBar'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import {
  SignState,
  useMemberQuery,
  useSignQuotesMutation,
  useSignStatusLazyQuery,
} from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import { getQuoteIds } from 'pages/OfferNew/utils'
import { handleSignedEvent } from 'utils/tracking/signing'
import {
  getContractType,
  getUtmParamsFromCookie,
  TrackAction,
  useTrack,
} from 'utils/tracking/tracking'
import { Variation, useVariation } from 'utils/hooks/useVariation'
import { CheckoutContent } from './CheckoutContent'
import { useScrollLock, VisibilityState } from './hooks'
import { Sign, SignUiState } from './Sign'
import { SignDisclaimer } from './SignDisclaimer'

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
  height: 100%;
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
  overflow-y: auto;
`

const SignComponentSpacing = styled('div')`
  height: 112px;
`

const InnerWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  min-height: 100%;
  padding: 2rem;

  @media (max-width: 40rem) {
    padding: 1rem;
  }
`

const BackButton = styled('button')`
  background: transparent;
  border: none;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  :focus {
    outline: 0;
    background: ${colorsV3.purple100};
  }
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
       z-index: 1009;
     `
    }

    return `
      opacity: 1;
      z-index: 1009;
    `
  }};
`

interface Props {
  offerData: OfferData
  isOpen?: boolean
  onClose?: () => void
  refetch: () => Promise<void>
}

export const Checkout: React.FC<Props> = ({
  offerData,
  isOpen,
  onClose,
  refetch,
}) => {
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

  const [signUiState, setSignUiState] = useState(SignUiState.NOT_STARTED)
  const [emailUpdateLoading, setEmailUpdateLoading] = useState(false)
  const [ssnUpdateLoading, setSsnUpdateLoading] = useState(false)
  const [startPollingSignState, signStatusQueryProps] = useSignStatusLazyQuery({
    pollInterval: 1000,
  })
  const signStatus = signStatusQueryProps.data?.signStatus ?? null
  const [signQuotes, signQuotesMutation] = useSignQuotesMutation()
  const member = useMemberQuery()
  const locale = useCurrentLocale()
  const variation = useVariation()

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

  useEffect(() => {
    if (
      ![SignUiState.STARTED, SignUiState.STARTED_WITH_REDIRECT].includes(
        signUiState,
      )
    ) {
      return
    }

    startPollingSignState()
  }, [signUiState, startPollingSignState])

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
  useScrollLock(visibilityState, scrollWrapper)

  const canInitiateSign = Boolean(
    signUiState !== SignUiState.STARTED &&
      signUiState !== SignUiState.STARTED_WITH_REDIRECT &&
      !signQuotesMutation.loading &&
      offerData.person.email &&
      offerData.person.ssn,
  )

  const startSign = async () => {
    if (!canInitiateSign) {
      return
    }

    const baseUrl = `${window.location.origin}/${locale}/new-member`
    const result = await signQuotes({
      variables: {
        quoteIds: getQuoteIds(offerData),
        successUrl: baseUrl + '/sign/success',
        failUrl: baseUrl + '/sign/fail',
      },
    })
    if (result.data?.signQuotes?.__typename === 'FailedToStartSign') {
      setSignUiState(SignUiState.FAILED)
      return
    }
    if (
      result.data?.signQuotes?.__typename === 'NorwegianBankIdSession' ||
      result.data?.signQuotes?.__typename === 'DanishBankIdSession'
    ) {
      setSignUiState(SignUiState.STARTED_WITH_REDIRECT)
      window.location.href = result.data.signQuotes.redirectUrl!
      return
    }
    setSignUiState(SignUiState.STARTED)
  }

  if (signStatus?.signState === SignState.Completed) {
    return (
      <TrackAction
        event={{
          name: SemanticEvents.Ecommerce.OrderCompleted,
          properties: {
            category: 'web-onboarding-steps',
            currency: offerData.cost.monthlyNet.currency,
            total: Number(offerData.cost.monthlyNet.amount),
            products: [
              {
                name: getContractType(offerData),
              },
            ],
            ...getUtmParamsFromCookie(),
          },
        }}
      >
        {({ track: trackAction }) => (
          <Mount on={trackAction}>
            <Redirect to={`/${locale}/new-member/connect-payment`} />)
          </Mount>
        )}
      </TrackAction>
    )
  }

  return (
    <>
      <OuterWrapper visibilityState={visibilityState}>
        <ScrollWrapper
          ref={scrollWrapper as React.MutableRefObject<HTMLDivElement | null>}
          windowHeight={windowInnerHeight}
        >
          <InnerWrapper>
            <BackButton onClick={onClose}>
              <BackArrow />
            </BackButton>

            <CheckoutContent
              onSubmit={startSign}
              offerData={offerData}
              onEmailUpdate={(onCompletion) => {
                setEmailUpdateLoading(true)
                onCompletion.finally(() => setEmailUpdateLoading(false))
              }}
              onSsnUpdate={(onCompletion) => {
                setSsnUpdateLoading(true)
                onCompletion.finally(() => setSsnUpdateLoading(false))
              }}
              refetch={refetch}
            />

            <SignDisclaimer offerData={offerData} />
          </InnerWrapper>
          <SignComponentSpacing />
        </ScrollWrapper>
        <Sign
          canInitiateSign={
            canInitiateSign && !ssnUpdateLoading && !emailUpdateLoading
          }
          signUiState={signUiState}
          signStatus={signStatus}
          isLoading={
            signQuotesMutation.loading ||
            signUiState === SignUiState.STARTED ||
            signUiState === SignUiState.STARTED_WITH_REDIRECT ||
            emailUpdateLoading
          }
          onSignStart={startSign}
        />
      </OuterWrapper>

      <Backdrop visibilityState={visibilityState} onClick={onClose} />
    </>
  )
}

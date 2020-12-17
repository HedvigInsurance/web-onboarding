import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { BackArrow } from 'components/icons/BackArrow'
import { TOP_BAR_Z_INDEX } from 'components/TopBar'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import {
  SignState,
  BankIdStatus,
  useMemberQuery,
  useSignQuotesMutation,
  useSignStatusLazyQuery,
} from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import { getQuoteIds } from 'pages/OfferNew/utils'
import { handleSignedEvent } from 'utils/tracking/signing'
import { useTrack } from 'utils/tracking/tracking'
import { Variation, useVariation } from 'utils/hooks/useVariation'
import { useScrollLock, VisibilityState } from './hooks'
import { CheckoutContent } from './CheckoutContent'
import { Sign, SignUiState } from './Sign'
import { SignDisclaimer } from './SignDisclaimer'
import { CheckoutSuccessRedirect } from './CheckoutSuccessRedirect'

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
       z-index: 1000;
     `
    }

    return `
      opacity: 1;
      z-index: 1000;
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

  const [signUiState, setSignUiState] = useState<SignUiState>('NOT_STARTED')
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
  useScrollLock(visibilityState, scrollWrapper)

  useEffect(() => {
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
              <Sign
                canInitiateSign={
                  canInitiateSign && !ssnUpdateLoading && !emailUpdateLoading
                }
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
    </>
  )
}

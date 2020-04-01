import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { BackArrow } from 'components/icons/BackArrow'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { SignState, useSignQuotesMutation } from 'data/graphql'
import { TOP_BAR_Z_INDEX } from 'new-components/TopBar'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
import {
  getContractType,
  getOfferPerson,
  getOfferQuoteIds,
} from 'pages/OfferNew/utils'
import { SemanticEvents } from 'quepasa'
import * as React from 'react'
import { Mount } from 'react-lifecycle-components'
import { Redirect } from 'react-router-dom'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking'
import { CheckoutContent } from './CheckoutContent'
import { useScrollLock, useTrack, VisibilityState } from './hooks'
import { Sign, SignUiState } from './Sign'
import { useSignState } from './SignStatus'

interface Openable {
  visibilityState: VisibilityState
}

const OuterWrapper = styled('div')<Openable>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  max-width: 40rem;
  width: 100%;
  overflow: hidden;
  z-index: ${TOP_BAR_Z_INDEX + 1};

  ${({ visibilityState }) =>
    visibilityState === VisibilityState.CLOSED ? 'display: none;' : ''};
`

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

const OuterScrollWrapper = styled('div')<Openable>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;

  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  transition: transform 300ms, opacity 300ms;
  ${slideInStyles};
`

const SlidingSign = styled(Sign)<Openable>`
  transition: transform 300ms, opacity 300ms;
  ${slideInStyles};
`

const InnerWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 100%;
  background: ${colorsV2.offwhite};
  padding: 5rem 8rem 2.5rem 4.5rem;

  @media (max-width: 40rem) {
    padding: 1rem;
  }
`

const BackButtonWrapper = styled('div')`
  padding-top: 1rem;
  padding-bottom: 2rem;
`
const BackButton = styled('button')`
  appearance: none;
  background: transparent;
  border: none;
  width: 2rem;
  height: 2rem;
`

const Backdrop = styled('div')<Openable>`
  position: fixed;
  background: rgba(25, 25, 25, 0.4);
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
  offerQuote: OfferQuote
  offerData: OfferData
  isOpen?: boolean
  onClose?: () => void
  refetch: () => Promise<void>
}

export const Checkout: React.FC<Props> = ({
  offerQuote,
  offerData,
  isOpen,
  onClose,
  refetch,
}) => {
  const [visibilityState, setVisibilityState] = React.useState(
    VisibilityState.CLOSED,
  )
  React.useEffect(() => {
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

  const [signUiState, setSignUiState] = React.useState(SignUiState.NOT_STARTED)
  const [emailUpdateLoading, setEmailUpdateLoading] = React.useState(false)
  const [ssnUpdateLoading, setSsnUpdateLoading] = React.useState(false)
  const [startPollingSignState, signStatus] = useSignState()
  const [signQuotes, signQuotesMutation] = useSignQuotesMutation()
  const locale = useCurrentLocale()
  const offerPerson = getOfferPerson(offerQuote)

  const outerWrapper = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    if (
      ![SignUiState.STARTED, SignUiState.STARTED_WITH_REDIRECT].includes(
        signUiState,
      )
    ) {
      return
    }

    startPollingSignState()
  }, [signUiState])

  useTrack({
    offerData,
    offerQuote,
    signState: signStatus?.signState,
    email: offerPerson.email ?? '',
  })
  useScrollLock(visibilityState, outerWrapper)

  const canInitiateSign = Boolean(
    signUiState !== SignUiState.STARTED &&
      signUiState !== SignUiState.STARTED_WITH_REDIRECT &&
      !signQuotesMutation.loading &&
      offerPerson.email &&
      offerPerson.ssn,
  )

  if (signStatus?.signState === SignState.Completed) {
    return (
      <TrackAction
        event={{
          name: SemanticEvents.Ecommerce.OrderCompleted,
          properties: {
            category: 'web-onboarding-steps',
            ...getUtmParamsFromCookie(),
          },
        }}
      >
        {({ track: trackAction }) => (
          <Mount on={trackAction}>
            <Redirect
              to={`/${locale && locale + '/'}new-member/connect-payment`}
            />
            )
          </Mount>
        )}
      </TrackAction>
    )
  }

  return (
    <>
      <OuterWrapper visibilityState={visibilityState}>
        <OuterScrollWrapper
          ref={outerWrapper as React.MutableRefObject<HTMLDivElement | null>}
          visibilityState={visibilityState}
        >
          <InnerWrapper>
            <BackButtonWrapper>
              <BackButton onClick={onClose}>
                <BackArrow />
              </BackButton>
            </BackButtonWrapper>

            <CheckoutContent
              offerQuote={offerQuote}
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
            <div />
          </InnerWrapper>
        </OuterScrollWrapper>

        <SlidingSign
          contractType={getContractType(offerData)}
          visibilityState={visibilityState}
          canInitiateSign={
            canInitiateSign && !ssnUpdateLoading && !emailUpdateLoading
          }
          signUiState={signUiState}
          signStatus={signStatus}
          loading={
            signQuotesMutation.loading ||
            signUiState === SignUiState.STARTED ||
            signUiState === SignUiState.STARTED_WITH_REDIRECT ||
            emailUpdateLoading
          }
          onSignStart={async () => {
            if (!canInitiateSign) {
              return
            }

            const baseUrl = `${window.location.origin}${
              locale ? '/' + locale : ''
            }/new-member`
            const result = await signQuotes({
              variables: {
                quoteIds: getOfferQuoteIds(offerQuote),
                successUrl: baseUrl + '/connect-payment',
                failUrl: baseUrl + '/sign/fatal',
              },
            })
            if (result.data?.signQuotes?.__typename === 'FailedToStartSign') {
              setSignUiState(SignUiState.FAILED)
              return
            }
            if (
              result.data?.signQuotes?.__typename === 'NorwegianBankIdSession'
            ) {
              setSignUiState(SignUiState.STARTED_WITH_REDIRECT)
              window.location.href = result.data.signQuotes.redirectUrl!
              return
            }
            setSignUiState(SignUiState.STARTED)
          }}
        />
      </OuterWrapper>
      <Backdrop visibilityState={visibilityState} onClick={onClose} />
    </>
  )
}

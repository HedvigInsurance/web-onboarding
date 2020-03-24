import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { BackArrow } from 'components/icons/BackArrow'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import {
  CompleteQuote,
  RedeemedCampaignsQuery,
  SignState,
  useMemberQuery,
  useRedeemedCampaignsQuery,
  useSignQuotesMutation,
} from 'data/graphql'
import { TOP_BAR_Z_INDEX } from 'new-components/TopBar'
import { Sign, SignUiState } from 'pages/OfferNew/Checkout/Sign'
import { useSignState } from 'pages/OfferNew/Checkout/SignStatus'
import { emailValidation } from 'pages/OfferNew/Checkout/UserDetailsForm'
import { getInsuranceType } from 'pages/OfferNew/utils'
import { SemanticEvents } from 'quepasa'
import * as React from 'react'
import { Mount } from 'react-lifecycle-components/dist'
import { Redirect } from 'react-router-dom'
import { InsuranceType } from 'utils/insuranceDomainUtils'
import {
  adtraction,
  getUtmParamsFromCookie,
  TrackAction,
  trackStudentkortet,
} from 'utils/tracking'
import { CheckoutContent } from './CheckoutContent'

enum VisibilityState {
  CLOSED,
  CLOSING,
  OPENING,
  OPEN,
}

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

const InnerWrapper = styled('div')<{ hasIframe: boolean }>`
  display: flex;
  flex-direction: column;
  ${({ hasIframe }) =>
    hasIframe
      ? css`
          padding-top: 20vh;
        `
      : css`
          justify-content: space-between;
        `};
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

const SignIframe = styled('iframe')`
  border: 0;
  min-height: 50vh;
`

interface Props {
  firstQuote: CompleteQuote
  isOpen?: boolean
  onClose?: () => void
  refetch: () => Promise<void>
}

export const Checkout: React.FC<Props> = ({
  firstQuote,
  isOpen,
  onClose,
  refetch,
}) => {
  const [email, setEmail] = React.useState(firstQuote.email ?? '')
  const [visibilityState, setVisibilityState] = React.useState(
    VisibilityState.CLOSED,
  )
  const [signUiState, setSignUiState] = React.useState(SignUiState.NOT_STARTED)
  const [bankIdUrl, setBankIdUrl] = React.useState<string | null>(null)
  const [ssnUpdateLoading, setSsnUpdateLoading] = React.useState(false)
  const [startPollingSignState, signStatus] = useSignState()
  const [signQuotes, signQuotesMutation] = useSignQuotesMutation({
    variables: { quoteIds: [firstQuote.id] },
  })
  const { data: redeemedCampaignsData } = useRedeemedCampaignsQuery()
  const { data: memberData } = useMemberQuery()
  const locale = useCurrentLocale()

  const outerWrapper = React.useRef<HTMLDivElement>()

  React.useEffect(() => {
    if (
      ![SignUiState.STARTED, SignUiState.STARTED_WITH_IFRAME].includes(
        signUiState,
      )
    ) {
      return
    }

    startPollingSignState()
  }, [signUiState])
  React.useEffect(() => {
    if (signStatus?.signState === SignState.Completed) {
      track(
        email!,
        firstQuote,
        memberData?.member.id!,
        redeemedCampaignsData?.redeemedCampaigns ?? [],
      )
    }
  }, [signStatus?.signState])

  React.useEffect(() => {
    const listener = (e: WheelEvent | TouchEvent) => {
      if (visibilityState !== VisibilityState.OPEN) {
        return
      }

      const { current } = outerWrapper
      if (!current) {
        return
      }

      const tryingToScrollUpButCant =
        e instanceof WheelEvent && current.scrollTop === 0 && e.deltaY < 0
      const tryingToScrollDownButCant =
        e instanceof WheelEvent &&
        current.offsetHeight + current.scrollTop >= current.scrollHeight &&
        e.deltaY > 0
      if (
        !outerWrapper.current?.contains(e.target as Node) ||
        tryingToScrollUpButCant ||
        tryingToScrollDownButCant
      ) {
        e.preventDefault()
      }
    }

    window.addEventListener('wheel', listener, { passive: false })
    window.addEventListener('touchmove', listener, { passive: false })

    return () => {
      window.removeEventListener('wheel', listener)
      window.removeEventListener('touchmove', listener)
    }
  }, [])

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

  const canInitiateSign = Boolean(
    signUiState !== SignUiState.STARTED &&
      !signQuotesMutation.loading &&
      emailValidation.isValidSync(email ?? '') &&
      firstQuote.ssn,
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
          <InnerWrapper
            hasIframe={signUiState === SignUiState.STARTED_WITH_IFRAME}
          >
            {signUiState === SignUiState.STARTED_WITH_IFRAME ? (
              <SignIframe src={bankIdUrl!} />
            ) : (
              <>
                <BackButtonWrapper>
                  <BackButton onClick={onClose}>
                    <BackArrow />
                  </BackButton>
                </BackButtonWrapper>

                <CheckoutContent
                  firstQuote={firstQuote}
                  email={email}
                  onEmailChange={setEmail}
                  onSsnUpdate={(onCompletion) => {
                    setSsnUpdateLoading(true)
                    onCompletion.finally(() => setSsnUpdateLoading(false))
                  }}
                  refetch={refetch}
                />
              </>
            )}

            <div />
          </InnerWrapper>
        </OuterScrollWrapper>

        <SlidingSign
          insuranceType={getInsuranceType(firstQuote)}
          visibilityState={visibilityState}
          canInitiateSign={canInitiateSign && !ssnUpdateLoading}
          signUiState={signUiState}
          signStatus={signStatus}
          loading={
            signQuotesMutation.loading || signUiState === SignUiState.STARTED
          }
          onSignStart={async () => {
            if (!canInitiateSign) {
              return
            }

            const result = await signQuotes()
            if (result.data?.signQuotes?.__typename === 'FailedToStartSign') {
              setSignUiState(SignUiState.FAILED)
              return
            }
            if (
              result.data?.signQuotes?.__typename === 'NorwegianBankIdSession'
            ) {
              setBankIdUrl(result.data.signQuotes.redirectUrl!)
              setSignUiState(SignUiState.STARTED_WITH_IFRAME)
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

const track = (
  email: string,
  firstQuote: CompleteQuote,
  memberId: string,
  redeemedCampaigns: RedeemedCampaignsQuery['redeemedCampaigns'],
) => {
  if (process.env.NODE_ENV === 'test') {
    return
  }

  const legacyInsuranceType: InsuranceType =
    firstQuote.quoteDetails.__typename === 'SwedishApartmentQuoteDetails'
      ? (firstQuote.quoteDetails.type as any)
      : 'HOUSE' // TODO do we have norway quotes here?

  adtraction(
    parseFloat(firstQuote.insuranceCost.monthlyGross.amount),
    memberId,
    email,
    redeemedCampaigns !== null && redeemedCampaigns.length !== 0
      ? redeemedCampaigns[0].code
      : null,
    legacyInsuranceType,
  )

  if (
    redeemedCampaigns !== null &&
    redeemedCampaigns.length !== 0 &&
    redeemedCampaigns[0].code.toLowerCase() === 'studentkortet'
  ) {
    trackStudentkortet(memberId, firstQuote.insuranceCost.monthlyGross.amount)
  }
}

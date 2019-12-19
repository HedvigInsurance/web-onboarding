import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { BackArrow } from 'components/icons/BackArrow'
import { Sign } from 'pages/OfferNew/Checkout/Sign'
import { CompleteOfferDataForMember } from 'pages/OfferNew/types'
import * as React from 'react'
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
  z-index: 1010;

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
  offer: CompleteOfferDataForMember
  isOpen?: boolean
  onClose?: () => void
}

export const Checkout: React.FC<Props> = ({ offer, isOpen, onClose }) => {
  const [email, setEmail] = React.useState('')
  const [visibilityState, setVisibilityState] = React.useState(
    VisibilityState.CLOSED,
  )
  const outerWrapper = React.useRef<HTMLDivElement>()

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
              offer={offer}
              email={email}
              onEmailChange={setEmail}
            />
          </InnerWrapper>
        </OuterScrollWrapper>

        <SlidingSign
          visibilityState={visibilityState}
          personalNumber={offer.lastQuoteOfMember.ssn}
          email={email}
          offer={offer}
        />
      </OuterWrapper>
      <Backdrop visibilityState={visibilityState} onClick={onClose} />
    </>
  )
}

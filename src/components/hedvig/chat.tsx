import { colors, fonts } from '@hedviginsurance/brand'
import { Container } from 'constate'
import * as React from 'react'
import AnimateHeight from 'react-animate-height'
import styled, { keyframes } from 'react-emotion'
import { Mount } from 'react-lifecycle-components'
import { Transition } from 'react-transition-group'
import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  TransitionStatus,
} from 'react-transition-group/Transition'
import { fadeIn, FadeIn, fadeUp } from '../animations/appearings'
import { HEIGHT_AND_SCROLL_ANIMATION_TIME } from './conversation'

const fadeOut = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
})

const ChatWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: 30,
  opacity: 1,
  maxWidth: '65%',
})

const Hedvig = styled('img')({
  height: 33,
})

const HedvigWrapper = styled('div')({})

const ChatMessageWrapper = styled('div')({
  position: 'relative',
  paddingTop: 20,
})

const TypingWrapper = styled('div')(
  ({ status }: { status: TransitionStatus }) => ({
    width: 60,
    opacity: 0,
    animation:
      status === EXITING
        ? `${fadeOut} 200ms forwards`
        : `${fadeIn} 300ms forwards`,
    position: 'absolute',
    top: 20,
    left: 0,
  }),
)

const TypingBubble = styled('div')({
  display: 'inline-block',
  background: colors.OFF_WHITE,
  padding: '5px 10px',
  borderRadius: 3,
  whiteSpace: 'nowrap',
})

const bounce = keyframes({
  '0%': { transform: 'translateY(0)' },
  '25%': { transform: 'translateY(-10px)' },
  '50%': { transform: 'translateY(0)' },
  '100%': { transform: 'translateY(0)' },
})

const TypingBall = styled('div')(({ delay }: { delay: number }) => ({
  display: 'inline-block',
  marginLeft: 10,
  '&:first-of-type': {
    marginLeft: 0,
  },
  width: 9,
  height: 9,
  borderRadius: 10,
  backgroundColor: '#C9DCDF',
  animation: `${bounce} 750ms cubic-bezier(0.35, 0.00, 0.00, 0.7)`,
  animationIterationCount: 'infinite',
  animationDelay: `${delay}ms`,
}))

export const Typing: React.SFC<{ status: TransitionStatus }> = ({ status }) => (
  <TypingWrapper status={status}>
    <TypingBubble>
      <TypingBall delay={0} />
      <TypingBall delay={100} />
      <TypingBall delay={200} />
    </TypingBubble>
  </TypingWrapper>
)

export const ChatMessageTextWrapper = styled('div')(
  ({ isVisible, appear }: { isVisible: boolean; appear: boolean }) => ({
    display: 'inline-block',
    maxWidth: '100%',
    padding: '15px 18px',
    backgroundColor: colors.OFF_WHITE,
    color: colors.BLACK_PURPLE,
    fontFamily: fonts.MERRIWEATHER,
    fontSize: '0.95em',
    fontWeight: 300,
    borderRadius: 8,
    opacity: appear ? 1 : 0,
    animation:
      isVisible && !appear
        ? `${fadeUp} 200ms forwards, ${fadeIn} 300ms forwards`
        : 'none',
  }),
)

export interface ChatMessageProps {
  appear?: boolean
  isCurrentMessage?: boolean
  typingDuration?: number
  onTyped?: () => void
}

const HedvigIcon: React.SFC = () => (
  <HedvigWrapper>
    <Hedvig src="https://cdn.hedvig.com/identity/graphics/hedvig-symbol-color.svg" />
  </HedvigWrapper>
)

export const ChatMessage: React.SFC<ChatMessageProps> = ({
  children,
  appear = false,
  isCurrentMessage = false,
  typingDuration = 500,
  onTyped,
}) => (
  <ChatWrapper>
    <Container<{ hasMounted: boolean }, { mount: () => void }>
      initialState={{ hasMounted: appear }}
      actions={{ mount: () => () => ({ hasMounted: true }) }}
    >
      {({ hasMounted, mount }) => (
        <Mount on={mount}>
          <AnimateHeight
            duration={HEIGHT_AND_SCROLL_ANIMATION_TIME}
            height={hasMounted ? 'auto' : 0}
          >
            <AnimateHeight
              duration={HEIGHT_AND_SCROLL_ANIMATION_TIME}
              height={isCurrentMessage && hasMounted ? 33 : 0}
            >
              {appear ? (
                <HedvigIcon />
              ) : (
                <FadeIn>
                  <HedvigIcon />
                </FadeIn>
              )}
            </AnimateHeight>
            <Transition
              timeout={appear ? 0 : typingDuration}
              appear
              in
              onEntered={
                appear
                  ? () => {
                      /* noop */
                    }
                  : onTyped
              }
            >
              {(appearStatus) => (
                <ChatMessageWrapper>
                  <Transition
                    timeout={500}
                    appear
                    in={appearStatus === ENTERING && !appear}
                  >
                    {(typingTransitionStatus) =>
                      typingTransitionStatus !== EXITED && (
                        <Typing status={typingTransitionStatus} />
                      )
                    }
                  </Transition>
                  <ChatMessageTextWrapper
                    appear={appear}
                    isVisible={[ENTERED, EXITING].includes(appearStatus)}
                  >
                    {children}
                  </ChatMessageTextWrapper>
                </ChatMessageWrapper>
              )}
            </Transition>
          </AnimateHeight>
        </Mount>
      )}
    </Container>
  </ChatWrapper>
)

import { colors, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import styled, { keyframes } from 'react-emotion'
import { Transition } from 'react-transition-group'
import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  TransitionStatus,
} from 'react-transition-group/Transition'
import { fadeIn, FadeIn, fadeUp } from '../animations/appearings'
import { LazyLottie } from '../animations/LazyLottie'

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
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginBottom: 10,
})
const Hedvig = styled('img')({
  height: 40,
})
const HedvigWrapper = styled(FadeIn)({
  paddingRight: 20,
})

const ChatMessageWrapper = styled('div')({
  position: 'relative',
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
    bottom: 0,
    left: 0,
  }),
)

export const Typing: React.SFC<{ status: TransitionStatus }> = ({ status }) => (
  <TypingWrapper status={status}>
    <LazyLottie
      width={60}
      options={{ animationData: import('./typing.json') }}
    />
  </TypingWrapper>
)

export const ChatMessageTextWrapper = styled('div')(
  ({ isVisible }: { isVisible: boolean }) => ({
    display: 'inline-block',
    backgroundColor: colors.OFF_WHITE,
    color: colors.OFF_BLACK,
    fontFamily: fonts.MERRIWEATHER,
    padding: '1rem 2rem',
    fontSize: '.9rem',
    borderRadius: 8,
    opacity: 0,
    animation: isVisible
      ? `${fadeUp} 200ms forwards, ${fadeIn} 300ms forwards`
      : 'none',
  }),
)

export interface ChatMessageProps {
  typingDuration?: number
  onTyped?: () => void
}

export const ChatMessage: React.SFC<ChatMessageProps> = ({
  children,
  typingDuration = 500,
  onTyped,
}) => (
  <ChatWrapper>
    <HedvigWrapper>
      <Hedvig src="/assets/identity/graphics/hedvig-symbol-color.svg" />
    </HedvigWrapper>
    <Transition timeout={typingDuration} appear in onEntered={onTyped}>
      {(appearStatus) => (
        <ChatMessageWrapper>
          <Transition timeout={500} appear in={appearStatus === ENTERING}>
            {(typingTransitionStatus) =>
              typingTransitionStatus !== EXITED && (
                <Typing status={typingTransitionStatus} />
              )
            }
          </Transition>
          <ChatMessageTextWrapper
            isVisible={[ENTERED, EXITING].includes(appearStatus)}
          >
            {children}
          </ChatMessageTextWrapper>
        </ChatMessageWrapper>
      )}
    </Transition>
  </ChatWrapper>
)

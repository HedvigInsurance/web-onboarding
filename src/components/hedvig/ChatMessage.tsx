import * as React from 'react'
import styled, { keyframes } from 'react-emotion'
import { colors } from '@hedviginsurance/brand'
import { Transition } from 'react-transition-group'
import { LazyLottie } from '../animations/LazyLottie'
import { TimedMount } from '../../utils/TimedMount'
import {
  TransitionStatus,
  EXITING,
  EXITED,
} from 'react-transition-group/Transition'

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})
const fadeOut = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
})
const fadeUp = keyframes({
  from: {
    transform: 'translateY(20%)',
  },
  to: {
    transform: 'translateY(0%)',
  },
})

const ChatMessageWrapper = styled('div')({
  position: 'relative',
  marginBottom: 10,
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
    top: 0,
    left: 0,
  }),
)

const Typing: React.SFC<{ status: TransitionStatus }> = ({ status }) => (
  <TypingWrapper status={status}>
    <LazyLottie
      width={60}
      options={{ animationData: import('./typing.json') }}
    />
  </TypingWrapper>
)

const ChatMessageTextWrapper = styled('div')(
  ({ isVisible }: { isVisible: boolean }) => ({
    display: 'inline-block',
    backgroundColor: colors.OFF_WHITE,
    padding: '1rem 2rem',
    borderRadius: 8,
    opacity: 0,
    animation: isVisible
      ? `${fadeUp} 200ms forwards, ${fadeIn} 300ms forwards`
      : 'none',
  }),
)

export interface ChatMessageProps {
  typingDuration?: number
}

export const ChatMessage: React.SFC<ChatMessageProps> = ({
  children,
  typingDuration = 500,
}) => (
  <TimedMount duration={typingDuration}>
    {({ hasFired }) => (
      <ChatMessageWrapper>
        <Transition timeout={500} appear in={!hasFired}>
          {(status) => status !== EXITED && <Typing status={status} />}
        </Transition>
        <ChatMessageTextWrapper isVisible={hasFired}>
          {children}
        </ChatMessageTextWrapper>
      </ChatMessageWrapper>
    )}
  </TimedMount>
)

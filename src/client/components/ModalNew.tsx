import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import React, { ReactNode, useRef, useEffect } from 'react'
import { useScrollLock, VisibilityState } from 'utils/hooks/useScrollLock'
import { MEDIUM_SCREEN_MEDIA_QUERY } from '../utils/mediaQueries'
import { CloseButton } from './CloseButton/CloseButton'

export type ModalProps = {
  isVisible: boolean
  dynamicHeight?: boolean
  onClose?: () => void
  className?: string
  children?: ReactNode
}

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3000;
`

const Background = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(25, 25, 25, 0.4);
`
const ButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`

type ModalContainerProps = {
  dynamicHeight?: boolean
}

const ModalContainer = styled(motion.div)<ModalContainerProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  max-width: 56rem;
  max-height: 100vh;

  ${({ dynamicHeight }) =>
    !dynamicHeight &&
    `
  min-height: 25rem;
  max-height: 56rem;`}
  background: ${colorsV3.gray100};
  border-radius: 8px;
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.06);
  overflow-y: auto;

  @media (max-height: 900px) {
    max-height: calc(100vh - 2rem);
  }

  @media (max-width: 900px) {
    max-width: calc(100% - 2rem);
  }

  @media (max-width: 600px) {
    max-width: 100%;
    max-height: 100%;
    min-height: 15rem;
  }
`

const ModalInnerContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const Modal = ({
  isVisible,
  dynamicHeight,
  className,
  onClose,
  children,
}: ModalProps) => {
  const scrollWrapper = useRef<HTMLDivElement | null>(null)
  useScrollLock(
    isVisible ? VisibilityState.OPEN : VisibilityState.CLOSED,
    scrollWrapper,
  )

  const hasOnCloseFunction = Boolean(onClose)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <Wrapper
      initial={'hidden'}
      animate={isVisible ? 'visible' : 'hidden'}
      variants={{
        visible: {
          visibility: 'visible',
        },
        hidden: {
          visibility: 'hidden',
          transition: {
            delay: 0.5,
          },
        },
      }}
    >
      <Background
        onClick={onClose}
        initial={'hidden'}
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{
          visible: {
            opacity: 1,
          },
          hidden: {
            opacity: 0,
          },
        }}
      />
      <ModalContainer
        ref={scrollWrapper}
        dynamicHeight={dynamicHeight}
        className={className}
        initial={'hidden'}
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 50,
        }}
        variants={{
          visible: {
            opacity: 1,
            x: '-50%',
            y: '-50%',
            transition: {
              type: 'spring',
              stiffness: 500,
              damping: 50,
              delay: 0.15,
            },
          },
          hidden: {
            opacity: 0,
            x: '-50%',
            y: '50%',
          },
        }}
      >
        <ModalInnerContainer>{children}</ModalInnerContainer>
        {hasOnCloseFunction && (
          <ButtonWrapper>
            <CloseButton onClick={onClose} />
          </ButtonWrapper>
        )}
      </ModalContainer>
    </Wrapper>
  )
}

export const ModalContent = styled.div(() => ({
  padding: '3rem 1rem',

  [MEDIUM_SCREEN_MEDIA_QUERY]: {
    padding: '3rem 3.5rem',
  },
}))

type ModalFooterProps = {
  sticky?: boolean
  children?: ReactNode
}

const Footer = styled.div<ModalFooterProps>`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ sticky }) =>
    sticky &&
    `
    box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.05), 0px -8px 16px rgba(0, 0, 0, 0.05);
    background: ${colorsV3.white};
    position: sticky;
    bottom: 0;
`}
`

export const ModalFooter = ({ children, sticky = true }: ModalFooterProps) => {
  return <Footer sticky={sticky}>{children}</Footer>
}

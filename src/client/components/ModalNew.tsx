import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import React from 'react'
import { useLockBodyScroll } from '../utils/hooks/useLockBodyScroll'
import { CloseButton } from './CloseButton/CloseButton'

export interface ModalProps {
  isVisible: boolean
  dynamicHeight?: boolean
  onClose: () => void
  className?: string
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

interface ModalContainerProps {
  dynamicHeight?: boolean
}

const ModalContainer = styled(motion.div)<ModalContainerProps>`
  position: relative;
  left: 50%;
  top: 50%;
  width: 100%;
  max-width: 56rem;
  max-height: 100vh;

  ${(props) =>
    !props.dynamicHeight &&
    `
  min-height: 25rem;
  max-height: 56rem;`}
  background: ${colorsV3.white};
  border-radius: 8px;
  position: absolute;
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

const ModalInnerContainer = styled('div')`
  width: 100%;
  height: 100%;
`

export const Modal: React.FC<ModalProps> = ({
  isVisible,
  dynamicHeight,
  className,
  onClose,
  children,
}) => {
  useLockBodyScroll({ isLocked: isVisible })
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
        <ButtonWrapper>
          <CloseButton onClick={onClose} />
        </ButtonWrapper>
      </ModalContainer>
    </Wrapper>
  )
}

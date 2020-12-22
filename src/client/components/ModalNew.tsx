import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import React from 'react'
import { Cross } from './icons/Cross'

export interface ModalProps {
  isVisible: boolean
  dynamicHeight?: boolean
  onClose: () => void
}

const Wrapper = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 3000;
`

const Background = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(25, 25, 25, 0.4);
`

interface ModalContainerProps {
  dynamicHeight?: boolean
}

const ModalContainer = styled(motion.div)<ModalContainerProps>`
  position: relative;
  width: 100%;
  max-width: 56rem;
  max-height: 100vh;
  ${(props) =>
    !props.dynamicHeight &&
    `
  height: 100%;
  min-height: 25rem;
  max-height: 56rem;`}
  background: ${colorsV3.white};
  border-radius: 9px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  overflow-x: scroll;

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

const CloseButton = styled('button')`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: ${colorsV3.gray500};
  border-radius: 50%;
  border: none;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    background-color: ${colorsV3.gray900};
  }

  svg {
    width: 100%;
    height: 100%;
    fill: ${colorsV3.white};
  }
`

export const Modal: React.FC<ModalProps> = ({
  isVisible,
  dynamicHeight,
  onClose,
  children,
}) => {
  React.useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [isVisible])

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
        initial={'hidden'}
        animate={isVisible ? 'visible' : 'hidden'}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 100,
        }}
        variants={{
          visible: {
            opacity: 1,
            transform: 'translateX(-50%) translateY(-50%) scale(1)',
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 100,
              delay: 0.15,
            },
          },
          hidden: {
            opacity: 0,
            transform: 'translateX(-50%) translateY(50%) scale(0.9)',
          },
        }}
      >
        <ModalInnerContainer>{children}</ModalInnerContainer>
        <CloseButton onClick={onClose}>
          <Cross />
        </CloseButton>
      </ModalContainer>
    </Wrapper>
  )
}

import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import * as React from 'react'
import { Cross } from './icons/Cross'

export interface ModalProps {
  isVisible: boolean
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
  z-index: 2000;
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

const ModalContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 56rem;
  height: 100%;
  min-height: 25rem;
  max-height: 56rem;
  background: ${colorsV2.white};
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
  background-color: ${colorsV2.gray};
  border-radius: 50%;
  border: none;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    background-color: ${colorsV2.darkgray};
  }

  svg {
    width: 100%;
    height: 100%;
    fill: ${colorsV2.white};
  }
`

export const Modal: React.FC<ModalProps> = (props) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const handleClick = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      props.onClose()
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <Wrapper
      initial={'hidden'}
      animate={props.isVisible ? 'visible' : 'hidden'}
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
        initial={'hidden'}
        animate={props.isVisible ? 'visible' : 'hidden'}
        variants={{
          visible: {
            opacity: 1,
          },
          hidden: {
            opacity: 0,
          },
        }}
      >
        <ModalContainer
          initial={'hidden'}
          animate={props.isVisible ? 'visible' : 'hidden'}
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
          <ModalInnerContainer ref={containerRef}>
            {props.children}
          </ModalInnerContainer>
          <CloseButton onClick={props.onClose}>
            <Cross />
          </CloseButton>
        </ModalContainer>
      </Background>
    </Wrapper>
  )
}

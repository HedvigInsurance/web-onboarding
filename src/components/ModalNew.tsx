import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
const hexToRgba = require('hex-to-rgba')
import { motion } from 'framer-motion'
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
  background-color: ${hexToRgba(colorsV2.white, 0.75)};
`

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 100%;
  min-height: 400px;
  max-height: 900px;
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
    max-height: calc(100vh - 32px);
  }

  @media (max-width: 900px) {
    max-width: calc(100% - 32px);
  }
`

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
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

export const Modal = (props: React.PropsWithChildren<ModalProps>) => {
  const containerRef = React.useRef(null)

  const handleClick = (e: MouseEvent) => {
    // @ts-ignore
    !containerRef.current.contains(e.target) && props.onClose()
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
        <Container
          ref={containerRef}
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
          {props.children}
          <CloseButton onClick={() => props.onClose()}>
            <Cross />
          </CloseButton>
        </Container>
      </Background>
    </Wrapper>
  )
}

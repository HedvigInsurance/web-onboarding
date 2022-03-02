import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

type Props = {
  zIndex?: number
}

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  },
`

export const Overlay = styled.div<Props>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000066;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 9999)};
  animation: ${fadeIn} 300ms ease-in-out;
`

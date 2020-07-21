import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
export const slideIn = keyframes`
  from {
    transform: translateY(3%);
  }
  to {
    transform: translateY(0);
  }
`

export const TextContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  text-align: center;
  height: 100%;
  width: 100%;
  max-width: 40rem;
  padding: 1.5rem;
  font-size: 2rem;
  color: ${colorsV3.gray100};
  opacity: 0;
  animation: ${slideIn} 1500ms forwards, ${fadeIn} 1500ms forwards;
`

import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import React from 'react'

const spin = keyframes`
  0% {
    opacity: 0.25;
  }
  50% {
    opacity: 1;
    transform: scale(1.33)
  }
  100% {
    opacity: 0.25;
  }
`

const Dots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Dot = styled.span`
  width: 0.375rem;
  height: 0.375rem;
  margin: 0.25rem;
  border-radius: 100%;
  background-color: ${colorsV3.gray100};
  opacity: 0.25;
  opacity: 0.25;
  animation: ${spin} 1000ms both infinite;

  &:nth-of-type(2) {
    animation-delay: 150ms;
  }

  &:last-of-type {
    animation-delay: 300ms;
  }
`

export const LoadingDots: React.FC<{ loading?: boolean }> = () => {
  return (
    <Dots>
      <Dot />
      <Dot />
      <Dot />
    </Dots>
  )
}

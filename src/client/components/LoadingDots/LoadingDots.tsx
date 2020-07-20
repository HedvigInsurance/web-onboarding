import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import React from 'react'

interface DotsProps {
  color?: string
}

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

const Dots = styled.div<DotsProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color};
`

const Dot = styled.span`
  width: 0.375rem;
  height: 0.375rem;
  margin: 0.25rem;
  border-radius: 100%;
  background-color: currentColor;
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

export const LoadingDots: React.FC<DotsProps> = ({
  color = colorsV3.gray100,
}) => {
  return (
    <Dots color={color}>
      <Dot />
      <Dot />
      <Dot />
    </Dots>
  )
}

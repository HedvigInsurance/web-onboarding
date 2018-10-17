import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled, { keyframes } from 'react-emotion'

const popIn = keyframes({
  from: {
    opacity: 0,
    transform: 'scale(.95)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1)',
  },
})

const Wrapper = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: colors.GREEN,
  color: colors.WHITE,
  animation: `${popIn} 300ms forwards`,
  transformOrigin: 'bottom center',
  zIndex: 999,
})

export const LoadingScreen = () => <Wrapper>loading</Wrapper>

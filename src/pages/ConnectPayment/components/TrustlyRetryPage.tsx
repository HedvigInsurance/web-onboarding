import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled, { keyframes } from 'react-emotion'

const Wrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

const Spinner = styled('span')({
  display: 'inline-block',
  width: 32,
  height: 32,
  border: `2px solid ${colors.LIGHT_GRAY}`,
  borderTopColor: 'transparent',
  borderRadius: '1em',
  animation: `${spin} 500ms linear infinite`,
})

export const TrustlyRetryPage: React.FC = () => (
  <Wrapper>
    <Spinner />
  </Wrapper>
)

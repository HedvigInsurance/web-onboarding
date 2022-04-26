import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'

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
  border: `2px solid ${colorsV3.gray300}`,
  borderTopColor: 'transparent',
  borderRadius: '1em',
  animation: `${spin} 500ms linear infinite`,
})

export const TrustlySpinnerPage: React.FC = () => (
  <Wrapper>
    <Spinner />
  </Wrapper>
)

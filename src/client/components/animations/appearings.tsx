import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'

export const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

export const FadeIn = styled('div')({
  animation: `${fadeIn} 300ms forwards`,
})

export const fadeUp = keyframes({
  from: {
    transform: 'translateY(20%)',
  },
  to: {
    transform: 'translateY(0%)',
  },
})

export const FadeUp = styled('div')({
  animation: `${fadeUp} 300ms forwards`,
})

import { keyframes } from 'emotion'
import styled from 'react-emotion'

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

export const slideUp = (maxHeight: number, initialMaxHeight = 0) =>
  keyframes({
    from: {
      maxHeight: initialMaxHeight,
    },
    to: {
      maxHeight,
    },
  })

export const SlideUp = styled('div')(
  ({
    maxHeight = 300,
    initialMaxHeight = 0,
  }: {
    maxHeight?: number
    initialMaxHeight?: number
  }) => ({
    maxHeight: initialMaxHeight,
    animation: `${slideUp(maxHeight, initialMaxHeight)} 500ms forwards`,
  }),
)

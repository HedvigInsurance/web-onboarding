import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand/dist'
import * as React from 'react'

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '90vh',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: colors.BLACK_PURPLE,
  maxWidth: 500,
  margin: '2rem auto',
  padding: '0 1rem',
})

const HedvigWrapper = styled('div')({
  position: 'relative',
  width: '15vh',
  padding: '1rem',
})
const Hedvig = styled('img')({})

const snore = keyframes({
  '0%': { transform: 'rotate(-20deg) translateY(0) translateX(0)', opacity: 0 },
  '60%': { opacity: 1 },
  '80%': {
    transform: 'rotate(-20deg) translateY(-40px) translateX(40px)',
    opacity: 0,
  },
  '100%': {
    transform: 'rotate(-20deg) translateY(0px) translateX(0px)',
    opacity: 0,
  },
})
const Snore = styled('div')<{ delay?: number }>(({ delay = 0 }) => ({
  position: 'absolute',
  top: '10%',
  left: '40%',
  transform: 'rotate(-20deg)',
  animation: `${snore} 4000ms linear infinite`,
  animationDelay: delay ? `${delay}ms` : undefined,
  fontSize: '2rem',
  opacity: 0,
}))

const OpeningHours = styled('div')({
  width: '100%',
})

export const HedvigIsSleeping = () => (
  <Wrapper>
    <h1>Hedvig sover...</h1>
    <HedvigWrapper>
      <Snore>Zzzz...</Snore>
      <Snore delay={1000}>Zzzz...</Snore>
      <Snore delay={2000}>Zzzz...</Snore>
      <Snore delay={3000}>Zzzz...</Snore>
      <Hedvig src="https://cdn.hedvig.com/identity/graphics/hedvig-symbol-color.svg" />
    </HedvigWrapper>
    <OpeningHours>
      ..men vaknar och kan svara på dina frågor igen vid 9. ⏰
    </OpeningHours>
  </Wrapper>
)

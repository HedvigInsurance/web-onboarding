import * as React from 'react'
import Helmet from 'react-helmet-async'
import { DontPanic } from './DontPanic'
import { DontPanicContainer } from './DontPanicContainer'
import { HedvigIsSleeping } from './HedvigIsSleeping'

const isSleepingHours = () => {
  const now = new Date()
  const isBefore9 = now.getHours() < 9
  const isAfter23 = now.getHours() > 22

  return isBefore9 || isAfter23
}

export const LazyDontPanic = () => (
  <DontPanicContainer>
    {({ initialVisibleSteps }) => {
      const isHedvigAwake =
        !isSleepingHours() ||
        (initialVisibleSteps && initialVisibleSteps.length > 0)
      return (
        <>
          <Helmet>
            <title>Don't Panic by Hedvig</title>
          </Helmet>
          {isHedvigAwake && <DontPanic />}
          {!isHedvigAwake && <HedvigIsSleeping />}
        </>
      )
    }}
  </DontPanicContainer>
)

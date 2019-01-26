import * as React from 'react'
import Helmet from 'react-helmet-async'
import { DontPanic } from './DontPanic'
import { DontPanicContainer } from './DontPanicContainer'
import { HedvigIsSleeping } from './HedvigIsSleeping'

const isSleepingHours = () => {
  const now = new Date()
  const isBefore9 = now.getHours() + now.getTimezoneOffset() / 60 < 8 // 9 CET
  const isAfter23 = now.getHours() + now.getTimezoneOffset() / 60 >= 22 //  23 CET

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
            <meta name="title" content="Don't Panic by Hedvig" />
            <meta
              name="description"
              content="Livet händer. Låt Hedvig hjälpa dig. Hedvig svarar på allt som rör ditt hem och hemförsäkringar."
            />
            <meta
              property="og:image"
              content="https://www.hedvig.com/new-member-assets/dont-panic/dont-panic.png"
            />
          </Helmet>
          {isHedvigAwake && <DontPanic />}
          {!isHedvigAwake && <HedvigIsSleeping />}
        </>
      )
    }}
  </DontPanicContainer>
)

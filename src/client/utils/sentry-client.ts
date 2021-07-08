import * as Sentry from '@sentry/react'
import { useEffect } from 'react'

export const captureSentryError = (
  e: Error | string,
  data?: Record<string, any>,
) => {
  Sentry.captureException(e, data)

  console.error(e, { data })
}

export const useUnderwritingLimitsHitReporter = (
  hitUnderwritingLimits: ReadonlyArray<string> | undefined | false,
  quoteIds?: ReadonlyArray<string>,
) => {
  useEffect(() => {
    if (hitUnderwritingLimits && hitUnderwritingLimits.length > 0) {
      captureSentryError(
        Error(
          'Underwriting limits hit when editing quote: ' +
            hitUnderwritingLimits.join(', '),
        ),
        { quoteIds },
      )
    }
  }, [hitUnderwritingLimits, quoteIds])
}

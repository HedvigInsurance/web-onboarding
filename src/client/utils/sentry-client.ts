import { useEffect } from 'react'

export const captureSentryError = (
  e: Error | string | any,
  data?: Record<string, any>,
) => {
  const { Sentry } = window as any

  if (Sentry !== undefined) {
    Sentry.captureException(e, { data })
  }

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

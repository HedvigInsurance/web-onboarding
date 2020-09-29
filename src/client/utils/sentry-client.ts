export const captureSentryError = (e: Error, data?: Record<string, any>) => {
  const { Sentry } = window as any

  if (Sentry !== undefined) {
    Sentry.captureException(e, { data })
  } else {
    console.error(e, { data })
  }
}

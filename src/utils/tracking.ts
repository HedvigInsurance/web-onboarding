export const trackEvent = (
  eventName: string,
  properties?: { [key: string]: any },
  options?: { [key: string]: any },
) => {
  const castedWindow = window as any
  if (castedWindow && castedWindow.analytics) {
    castedWindow.analytics.track(eventName, properties, options)
  }
}

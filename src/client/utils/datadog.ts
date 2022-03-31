import { datadogRum } from '@datadog/browser-rum'

export const initRum = () => {
  datadogRum.init({
    ...window.hedvigClientConfig.datadog,
    site: 'datadoghq.eu',
    service: 'web-onboarding',
    sampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel: 'mask-user-input',
    env: window.hedvigClientConfig.appEnvironment,
    allowedTracingOrigins: [
      window.hedvigClientConfig.giraffeHost,
      window.location.origin,
    ],
  })

  datadogRum.startSessionReplayRecording()
}

import { datadogRum } from '@datadog/browser-rum'
import { getCurrentLocale, getLocaleParamFromPath } from 'l10n/useCurrentLocale'

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

  const localeUrlParam = getLocaleParamFromPath(
    window.location.pathname.toLowerCase(),
  )
  const { marketLabel } = getCurrentLocale(localeUrlParam)
  datadogRum.setRumGlobalContext({ market: marketLabel })

  datadogRum.startSessionReplayRecording()
}

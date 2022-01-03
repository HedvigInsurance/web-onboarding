import { Feature } from 'shared/clientConfig'
import { getLocaleParamFromPath } from 'l10n/useCurrentLocale'
import { locales } from '../l10n/locales'

export const checkFeature = (feature: Feature) => {
  const localeUrlParam = getLocaleParamFromPath(
    window.location.pathname.toLowerCase(),
  )
  const currentLocale = locales[localeUrlParam]
  const marketLabel = currentLocale.marketLabel

  const enabledMarkets = window.hedvigClientConfig.features[feature]

  if (!enabledMarkets) {
    throw new Error(`Unknown feature: ${feature}`)
  }

  return enabledMarkets.includes(marketLabel)
}

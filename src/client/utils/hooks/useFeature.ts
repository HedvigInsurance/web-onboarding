import { Feature } from 'shared/clientConfig'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

export { Feature as Features } from 'shared/clientConfig'

export const useFeature = (features: Feature[] = []) => {
  const { marketLabel } = useCurrentLocale()

  return features.map((feature) => {
    const enabledMarkets = window.hedvigClientConfig.features[feature]

    if (!enabledMarkets) {
      throw new Error(`Unknown feature: ${feature}`)
    }

    return enabledMarkets.includes(marketLabel)
  })
}

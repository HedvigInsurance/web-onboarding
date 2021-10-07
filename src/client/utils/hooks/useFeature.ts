import { AppEnvironment } from 'src/shared/clientConfig'
import { Market, useMarket } from 'components/utils/CurrentLocale'

export enum Features {
  OFFER_PAGE_INSURANCE_TOGGLE = 'OFFER_PAGE_INSURANCE_TOGGLE',
  OFFER_PAGE_SWITCH_SAFETY = 'OFFER_PAGE_SWITCH_SAFETY',
  TEST_FEATURE = 'TEST_FEATURE', // For unit testing purposes
}

interface FeatureConfig {
  name: Features
  envs: AppEnvironment[]
  markets: Market[]
}

const Config: readonly FeatureConfig[] = [
  {
    name: Features.OFFER_PAGE_INSURANCE_TOGGLE,
    envs: ['development', 'staging'],
    markets: [Market.Se],
  },
  {
    name: Features.OFFER_PAGE_SWITCH_SAFETY,
    envs: ['development', 'staging', 'production'],
    markets: [Market.Se, Market.No],
  },
  {
    name: Features.TEST_FEATURE,
    envs: ['development', 'staging'],
    markets: [Market.Se],
  },
]

const isFeatureEnabled = ({
  config,
  env,
  market,
}: {
  config?: FeatureConfig
  env: AppEnvironment
  market: Market
}) => {
  if (!config) return false
  return config.envs.includes(env) && config.markets.includes(market)
}

export const useFeature = (features: Features[] = []) => {
  const market = useMarket()
  const env = window.hedvigClientConfig.appEnvironment

  return features.reduce((acc, feature) => {
    const featureConfig = Config.find((x) => x.name === feature)
    const isEnabled = isFeatureEnabled({ config: featureConfig, env, market })
    return [...acc, isEnabled]
  }, [] as boolean[])
}

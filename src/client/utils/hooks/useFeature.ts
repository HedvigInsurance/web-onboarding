import { AppEnvironment } from 'src/shared/clientConfig'
import { Market, useMarket } from 'components/utils/CurrentLocale'

export enum Features {
  OFFER_PAGE_INSURANCE_TOGGLE = 'OFFER_PAGE_INSURANCE_TOGGLE',
  CHECKOUT_CREDIT_CHECK = 'CHECKOUT_CREDIT_CHECK',
  TEST_FEATURE = 'TEST_FEATURE', // For unit testing purposes
}

type Env = 'staging' | 'production'

interface FeatureConfig {
  name: Features
  envs: Env[]
  markets: Market[]
}

const Config: readonly FeatureConfig[] = [
  {
    name: Features.OFFER_PAGE_INSURANCE_TOGGLE,
    envs: ['staging'],
    markets: [Market.Se],
  },
  {
    name: Features.CHECKOUT_CREDIT_CHECK,
    envs: ['staging', 'production'],
    markets: [Market.No],
  },
  {
    name: Features.TEST_FEATURE,
    envs: ['staging'],
    markets: [Market.Se],
  },
]

const isFeatureEnabled = ({
  config,
  env,
  market,
}: {
  config: FeatureConfig
  env: AppEnvironment
  market: Market
}) => {
  if (env === 'development') {
    return config.envs.includes('staging') && config.markets.includes(market)
  } else {
    return config.envs.includes(env) && config.markets.includes(market)
  }
}

export const useFeature = (features: Features[] = []) => {
  const market = useMarket()
  const env = window.hedvigClientConfig.appEnvironment

  return features.reduce<Array<boolean>>((acc, feature) => {
    const featureConfig = Config.find((item) => item.name === feature)
    if (featureConfig) {
      const isEnabled = isFeatureEnabled({ config: featureConfig, env, market })
      return [...acc, isEnabled]
    } else {
      throw new Error(`Unknown feature: ${feature}`)
    }
  }, [])
}

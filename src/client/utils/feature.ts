import { getMarket } from 'l10n/getMarket'
import { AppEnvironment } from 'src/shared/clientConfig'
import { MarketLabel } from 'l10n/locales'

export enum Feature {
  OFFER_PAGE_INSURANCE_TOGGLE = 'OFFER_PAGE_INSURANCE_TOGGLE',
  CHECKOUT_CREDIT_CHECK = 'CHECKOUT_CREDIT_CHECK',
  TEST_FEATURE = 'TEST_FEATURE', // For unit testing purposes
  CHECKOUT_UPSELL_CARD = 'CHECKOUT_UPSELL_CARD',
}

type Env = 'staging' | 'production'

interface FeatureConfig {
  name: Feature
  envs: Env[]
  markets: MarketLabel[]
}

const Config: readonly FeatureConfig[] = [
  {
    name: Feature.OFFER_PAGE_INSURANCE_TOGGLE,
    envs: ['staging', 'production'],
    markets: ['SE'],
  },
  {
    name: Feature.CHECKOUT_CREDIT_CHECK,
    envs: ['staging', 'production'],
    markets: ['NO'],
  },
  {
    name: Feature.TEST_FEATURE,
    envs: ['staging'],
    markets: ['SE'],
  },
  {
    name: Feature.CHECKOUT_UPSELL_CARD,
    envs: ['staging', 'production'],
    markets: ['SE'],
  },
]

const checkIsFeatureEnabled = ({
  config,
  env,
  market,
}: {
  config: FeatureConfig
  env: AppEnvironment
  market: MarketLabel
}) => {
  if (env === 'development') {
    return config.envs.includes('staging') && config.markets.includes(market)
  } else {
    return config.envs.includes(env) && config.markets.includes(market)
  }
}

export const isFeatureEnabled = (feature: Feature) => {
  const market = getMarket()
  const env = window.hedvigClientConfig?.appEnvironment ?? 'development'

  const featureConfig = Config.find((item) => item.name === feature)
  if (featureConfig) {
    return checkIsFeatureEnabled({ config: featureConfig, env, market })
  } else {
    throw new Error(`Unknown feature: ${feature}`)
  }
}

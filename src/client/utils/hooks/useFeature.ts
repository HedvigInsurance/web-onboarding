import { AppEnvironment } from 'src/shared/clientConfig'
import { MarketLabel } from 'l10n/locales'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

export enum Features {
  OFFER_PAGE_INSURANCE_TOGGLE = 'OFFER_PAGE_INSURANCE_TOGGLE',
  CHECKOUT_CREDIT_CHECK = 'CHECKOUT_CREDIT_CHECK',
  QUOTE_CART_API = 'QUOTE_CART_API',
  TEST_FEATURE = 'TEST_FEATURE', // For unit testing purposes
  CHECKOUT_UPSELL_CARD = 'CHECKOUT_UPSELL_CARD',
  CUSTOMER_SERVICE_PHONE_NUMBER = 'CUSTOMER_SERVICE_PHONE_NUMBER',
}

type Env = 'staging' | 'production'

interface FeatureConfig {
  name: Features
  envs: Env[]
  markets: MarketLabel[]
}

const Config: readonly FeatureConfig[] = [
  {
    name: Features.OFFER_PAGE_INSURANCE_TOGGLE,
    envs: ['staging', 'production'],
    markets: ['SE'],
  },
  {
    name: Features.CHECKOUT_CREDIT_CHECK,
    envs: ['staging', 'production'],
    markets: ['NO'],
  },
  {
    name: Features.TEST_FEATURE,
    envs: ['staging'],
    markets: ['SE'],
  },
  {
    name: Features.QUOTE_CART_API,
    envs: process.env.ENABLE_QUOTE_CART_API === 'true' ? ['staging'] : [],
    markets: ['SE', 'DK', 'NO'],
  },
  {
    name: Features.CHECKOUT_UPSELL_CARD,
    envs: ['staging', 'production'],
    markets: ['SE'],
  },
  {
    name: Features.CUSTOMER_SERVICE_PHONE_NUMBER,
    envs: ['staging', 'production'],
    markets: [],
  },
]

const isFeatureEnabled = ({
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

export const useFeature = (features: Features[] = []) => {
  const { marketLabel } = useCurrentLocale()
  const env = window.hedvigClientConfig?.appEnvironment ?? 'development'

  return features.reduce<Array<boolean>>((acc, feature) => {
    const featureConfig = Config.find((item) => item.name === feature)
    if (featureConfig) {
      const isEnabled = isFeatureEnabled({
        config: featureConfig,
        env,
        market: marketLabel,
      })
      return [...acc, isEnabled]
    } else {
      throw new Error(`Unknown feature: ${feature}`)
    }
  }, [])
}

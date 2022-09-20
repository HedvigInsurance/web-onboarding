import * as dotenv from 'dotenv'

import {
  Feature,
  FeatureMap,
  MarketLabel,
  AdyenEnvironment,
} from 'shared/clientConfig'

dotenv.config()

export const GIRAFFE_HOST =
  process.env.NODE_ENV === 'development'
    ? process.env.GIRAFFE_HOST ?? 'https://graphql.dev.hedvigit.com'
    : process.env.GIRAFFE_HOST!
export const GIRAFFE_WS_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? process.env.GIRAFFE_WS_ENDPOINT ??
      'wss://graphql.dev.hedvigit.com/subscriptions'
    : process.env.GIRAFFE_WS_ENDPOINT!
export const CONTENT_SERVICE_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? process.env.CONTENT_SERVICE_ENDPOINT ?? 'https://graphql.dev.hedvigit.com'
    : process.env.CONTENT_SERVICE_ENDPOINT!

export const ADYEN_CLIENT_KEY = process.env.ADYEN_CLIENT_KEY!
export const ADYEN_ENVIRONMENT = process.env
  .ADYEN_ENVIRONMENT as AdyenEnvironment

export const HEROKU_SLUG_COMMIT = process.env.HEROKU_SLUG_COMMIT!
export const DATADOG_APPLICATION_ID = process.env.DATADOG_APPLICATION_ID!
export const DATADOG_CLIENT_TOKEN = process.env.DATADOG_CLIENT_TOKEN!

export const APP_ENVIRONMENT = process.env.APP_ENVIRONMENT ?? 'development'

export const INSURELY_CLIENT_ID = process.env.INSURELY_CLIENT_ID!

export const EMBARK_STORY_NO = process.env.EMBARK_STORY_NO ?? 'onboarding-NO-v2'
export const EMBARK_STORY_DK = process.env.EMBARK_STORY_DK ?? 'onboarding-DK'

export const FEATURES = (Object.keys(Feature) as Array<Feature>).reduce(
  (featureMap, key) => {
    const envKey = `FEATURE_${key}`
    if (envKey in process.env) {
      const markets = process.env[envKey]?.split(',') ?? []
      featureMap[key] = markets as Array<MarketLabel>
    } else {
      featureMap[key] = []
    }
    return featureMap
  },
  {} as FeatureMap,
)

import * as dotenv from 'dotenv'
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

export const ADYEN_ORIGIN_KEY = process.env.ADYEN_ORIGIN_KEY!
export const ADYEN_ENVIRONMENT = process.env.ADYEN_ENVIRONMENT!

export const APP_ENVIRONMENT = process.env.APP_ENVIRONMENT ?? 'development'

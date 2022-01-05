export type AppEnvironment = 'development' | 'staging' | 'production'

export type MarketLabel = 'SE' | 'NO' | 'DK'

export enum Feature {
  TEST_FEATURE = 'TEST_FEATURE', // For unit testing purposes
  OFFER_PAGE_INSURANCE_TOGGLE = 'OFFER_PAGE_INSURANCE_TOGGLE',
  CHECKOUT_CREDIT_CHECK = 'CHECKOUT_CREDIT_CHECK',
  QUOTE_CART_API = 'QUOTE_CART_API',
  CHECKOUT_UPSELL_CARD = 'CHECKOUT_UPSELL_CARD',
  CUSTOMER_SERVICE_PHONE_NUMBER = 'CUSTOMER_SERVICE_PHONE_NUMBER',
  COLLECT_PHONE_NUMBER_AT_CHECKOUT = 'COLLECT_PHONE_NUMBER_AT_CHECKOUT',
}

export type FeatureMap = Record<Feature, Array<MarketLabel>>

export interface ClientConfig {
  adyenEnvironment: string
  adyenOriginKey: string
  contentServiceEndpoint: string
  giraffeEndpoint: string
  giraffeWsEndpoint: string
  appEnvironment: AppEnvironment
  features: FeatureMap
}

declare global {
  interface Window {
    hedvigClientConfig: ClientConfig
  }
}

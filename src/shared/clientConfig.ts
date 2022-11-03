import { RumInitConfiguration } from '@datadog/browser-rum'

export type AppEnvironment = 'development' | 'staging' | 'production'

export type MarketLabel = 'SE' | 'NO' | 'DK'

export enum Feature {
  TEST_FEATURE = 'TEST_FEATURE', // For unit testing purposes
  OFFER_PAGE_INSURANCE_TOGGLE = 'OFFER_PAGE_INSURANCE_TOGGLE',
  OFFER_PAGE_PRODUCT_SELECTOR = 'OFFER_PAGE_PRODUCT_SELECTOR',
  CHECKOUT_CREDIT_CHECK = 'CHECKOUT_CREDIT_CHECK',
  QUOTE_CART_API = 'QUOTE_CART_API',
  CHECKOUT_UPSELL_CARD = 'CHECKOUT_UPSELL_CARD',
  CUSTOMER_SERVICE_PHONE_NUMBER = 'CUSTOMER_SERVICE_PHONE_NUMBER',
  CONNECT_PAYMENT_AT_SIGN = 'CONNECT_PAYMENT_AT_SIGN',
  LANGUAGE_PICKER_CLIENT_SIDE_NAVIGATION = 'LANGUAGE_PICKER_CLIENT_SIDE_NAVIGATION',
  HOUSE_INSURANCE = 'HOUSE_INSURANCE',
  COMPARISON_TABLE = 'COMPARISON_TABLE',
  CONFIRMATION_PAGE_CROSS_SELL = 'CONFIRMATION_PAGE_CROSS_SELL',
  CAR_CANCELLATION = 'CAR_CANCELLATION',
  AB_TEST_PURCHASE_FLOWS = 'AB_TEST_PURCHASE_FLOWS',
}

export type FeatureMap = Record<Feature, Array<MarketLabel>>

export type AdyenEnvironment = 'test' | 'live'

export type ClientConfigServerData = {
  referer: string | null
}

export type ClientConfig = {
  adyenEnvironment: AdyenEnvironment
  adyenClientKey: string
  contentServiceEndpoint: string
  giraffeHost: string
  giraffeEndpoint: string
  giraffeWsEndpoint: string
  appEnvironment: AppEnvironment
  features: FeatureMap
  datadog: RumInitConfiguration
  insurelyHomeClientId: string
  insurelyCarClientId: string
  embarkStory: { NO: string; DK: string }
} & ClientConfigServerData

declare global {
  interface Window {
    hedvigClientConfig: ClientConfig
  }
}

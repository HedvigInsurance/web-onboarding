export type AppEnvironment = 'development' | 'staging' | 'production'

export interface ClientConfig {
  adyenEnvironment: string
  adyenOriginKey: string
  contentServiceEndpoint: string
  giraffeEndpoint: string
  giraffeWsEndpoint: string
  appEnvironment: AppEnvironment
}

declare global {
  interface Window {
    hedvigClientConfig: ClientConfig
  }
}

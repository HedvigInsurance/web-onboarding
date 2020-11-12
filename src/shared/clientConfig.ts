export interface ClientConfig {
  adyenEnvironment: string
  adyenOriginKey: string
  contentServiceEndpoint: string
  giraffeEndpoint: string
  giraffeWsEndpoint: string
  appEnvironment: 'development' | 'staging' | 'production'
}

declare global {
  interface Window {
    hedvigClientConfig: ClientConfig
  }
}

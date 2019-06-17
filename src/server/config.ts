import { getGiraffeEndpoint } from '../utils/apolloClient'

export const GIRAFFE_ENDPOINT = getGiraffeEndpoint(
  'GIRAFFE_ENDPOINT',
  'https://graphql.dev.hedvigit.com/graphql',
)

export const GIRAFFE_WS_ENDPOINT = getGiraffeEndpoint(
  'GIRAFFE_WS_ENDPOINT',
  'wss://graphql.dev.hedvigit.com/subscriptions',
)

export const FIREBASE_LINK_DOMAIN =
  process.env.FIREBASE_LINK_DOMAIN || 'https://hedvig.page.link'

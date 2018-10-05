import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { notNullable } from './nullables'

let realGiraffeEndpoint: string
if (
  typeof window !== 'undefined' &&
  (window as any).GIRAFFE_ENDPOINT !== undefined
) {
  realGiraffeEndpoint = (window as any).GIRAFFE_ENDPOINT
} else if (process.env.NODE_ENV === 'development') {
  realGiraffeEndpoint =
    process.env.GIRAFFE_ENDPOINT || 'https://graphql.dev.hedvigit.com/graphql'
} else if (
  process.env.NODE_ENV !== 'development' &&
  !process.env.GIRAFFE_ENDPOINT
) {
  throw new Error('Unable to find giraffe endpoint 🦒')
} else {
  realGiraffeEndpoint = notNullable(process.env.GIRAFFE_ENDPOINT)
}

export const GIRAFFE_ENDPOINT = realGiraffeEndpoint

export const cache = (ssrMode: boolean) => {
  if (ssrMode) {
    return new InMemoryCache()
  }
  return new InMemoryCache().restore((window as any).__INITIAL_STATE__)
}

export const link = (ssrMode: boolean) =>
  new BatchHttpLink({
    uri: GIRAFFE_ENDPOINT,
    fetch: ssrMode ? require('node-fetch') : undefined,
  })

export const createApolloClient = (ssrMode: boolean) =>
  new ApolloClient({
    ssrMode,
    cache: cache(ssrMode),
    link: link(ssrMode),
  })

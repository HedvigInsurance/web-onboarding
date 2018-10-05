import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { BatchHttpLink } from 'apollo-link-batch-http'

export const GIRAFFE_ENDPOINT =
  typeof window !== 'undefined' &&
  (window as any).GIRAFFE_ENDPOINT !== undefined
    ? (window as any).GIRAFFE_ENDPOINT
    : process.env.GIRAFFE_ENDPOINT || 'https://graphql.dev.hedvigit.com/graphql'

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

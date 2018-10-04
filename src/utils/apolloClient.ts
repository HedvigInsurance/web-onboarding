import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { BatchHttpLink } from 'apollo-link-batch-http'

export const cache = (ssrMode: boolean) => {
  if (ssrMode) {
    return new InMemoryCache()
  }
  return new InMemoryCache().restore((window as any).__INITIAL_STATE__)
}

export const link = (ssrMode: boolean) =>
  new BatchHttpLink({
    uri: 'https://graphql.dev.hedvigit.com/graphql',
    fetch: ssrMode ? require('node-fetch') : undefined,
  })

export const createApolloClient = (ssrMode: boolean) =>
  new ApolloClient({
    ssrMode,
    cache: cache(ssrMode),
    link: link(ssrMode),
  })

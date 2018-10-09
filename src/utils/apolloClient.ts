import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, concat } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import * as uuidV4 from 'uuid/v4'
import { notNullable } from './nullables'

export const getGiraffeEndpoint = (): string => {
  if (
    typeof window !== 'undefined' &&
    (window as any).GIRAFFE_ENDPOINT !== undefined
  ) {
    return (window as any).GIRAFFE_ENDPOINT
  } else if (process.env.NODE_ENV === 'development') {
    return (
      process.env.GIRAFFE_ENDPOINT || 'https://graphql.dev.hedvigit.com/graphql'
    )
  } else if (
    process.env.NODE_ENV !== 'development' &&
    !process.env.GIRAFFE_ENDPOINT
  ) {
    throw new Error('Unable to find giraffe endpoint 🦒')
  } else {
    return notNullable(process.env.GIRAFFE_ENDPOINT)
  }
}

export const cache = (ssrMode: boolean) => {
  if (ssrMode) {
    return new InMemoryCache()
  }
  return new InMemoryCache().restore((window as any).__INITIAL_STATE__)
}

const requestIdMiddleware = (requestId?: string) =>
  new ApolloLink((operation, forward) => {
    operation.setContext({ headers: { 'x-request-id': requestId || uuidV4() } })
    return notNullable(forward)(operation)
  })

export const link = (ssrMode: boolean, requestId?: string) =>
  concat(
    requestIdMiddleware(requestId),
    new BatchHttpLink({
      uri: getGiraffeEndpoint(),
      fetch: ssrMode ? require('node-fetch') : undefined,
    }),
  )

export const createApolloClient = (ssrMode: boolean, requestId?: string) =>
  new ApolloClient({
    ssrMode,
    cache: cache(ssrMode),
    link: link(ssrMode, requestId),
  })

import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, concat } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { WebSocketLink } from 'apollo-link-ws'
import { CookieStorage } from 'cookie-storage'
import * as React from 'react'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import * as uuidV4 from 'uuid/v4'
import { notNullable } from './nullables'
import { createSession, Session } from './sessionStorage'

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

export const getGiraffeWsEndpoint = (): string => {
  if (
    typeof window !== 'undefined' &&
    (window as any).GIRAFFE_WS_ENDPOINT !== undefined
  ) {
    return (window as any).GIRAFFE_WS_ENDPOINT
  } else if (process.env.NODE_ENV === 'development') {
    return (
      process.env.GIRAFFE_WS_ENDPOINT ||
      'wss://graphql.dev.hedvigit.com/subscriptions'
    )
  } else if (
    process.env.NODE_ENV !== 'development' &&
    !process.env.GIRAFFE_WS_ENDPOINT
  ) {
    throw new Error('Unable to find giraffe websocket endpoint 🦒')
  } else {
    return notNullable(process.env.GIRAFFE_WS_ENDPOINT)
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
    ssrMode
      ? new BatchHttpLink({
          uri: getGiraffeEndpoint(),
          fetch: ssrMode ? require('node-fetch') : undefined,
        })
      : new WebSocketLink(
          new SubscriptionClient(getGiraffeWsEndpoint(), {
            reconnect: true,
            connectionParams: () => ({ Authorization: Math.random() }), // FIXME
          }),
        ),
  )

export const createServerApolloClient = (requestId?: string) =>
  new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: concat(
      requestIdMiddleware(requestId),
      new BatchHttpLink({
        uri: getGiraffeEndpoint(),
        fetch: require('node-fetch'),
      }),
    ),
  })

export const createClientApolloClient = () => {
  if (typeof WebSocket === 'undefined' || process.env.NODE_ENV === 'test') {
    return undefined
  }
  const subscriptionClient = new SubscriptionClient(getGiraffeWsEndpoint(), {
    reconnect: true,
    connectionParams: () => ({
      Authorization: createSession<Session>(new CookieStorage()).getSession()!
        .token,
    }),
  })
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache().restore((window as any).__INITIAL_STATE),
    link: new WebSocketLink(subscriptionClient),
  })

  return { subscriptionClient, apolloClient }
}

export const createApolloSubscriptionContext = () =>
  React.createContext<
    Partial<
      | {
          subscriptionClient: SubscriptionClient
          apolloClient: ApolloClient<any>
        }
      | undefined
    >
  >(createClientApolloClient())

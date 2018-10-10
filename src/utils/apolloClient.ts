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

export const getGiraffeEndpoint = (
  constant: 'GIRAFFE_ENDPOINT' | 'GIRAFFE_WS_ENDPOINT',
  defaultEndpoint: string,
) => {
  if (
    typeof window !== 'undefined' &&
    (window as any)[constant] !== undefined
  ) {
    return (window as any)[constant]
  } else if (process.env.NODE_ENV === 'development') {
    return process.env[constant] || defaultEndpoint
  } else if (process.env.NODE_ENV !== 'development' && !process.env[constant]) {
    throw new Error('Unable to find giraffe endpoint 🦒')
  } else {
    return notNullable(process.env[constant])
  }
}

const requestIdMiddleware = (requestId?: string) =>
  new ApolloLink((operation, forward) => {
    operation.setContext({ headers: { 'x-request-id': requestId || uuidV4() } })
    return notNullable(forward)(operation)
  })

export const createServerApolloClient = (requestId?: string) =>
  new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: concat(
      requestIdMiddleware(requestId),
      new BatchHttpLink({
        uri: getGiraffeEndpoint(
          'GIRAFFE_ENDPOINT',
          'https://graphql.dev.hedvigit.com/graphql',
        ),
        fetch: require('node-fetch'),
      }),
    ),
  })

export const createClientApolloClient = () => {
  if (process.env.NODE_ENV === 'test') {
    return undefined
  }

  if (typeof window === 'undefined') {
    return undefined
  }

  if (typeof WebSocket === 'undefined') {
    throw new Error("typeof WebSocket is undefined, can't connect to remote")
  }
  const subscriptionClient = new SubscriptionClient(
    getGiraffeEndpoint(
      'GIRAFFE_WS_ENDPOINT',
      'wss://graphql.dev.hedvigit.com/subscriptions',
    ),
    {
      reconnect: true,
      connectionParams: () => ({
        Authorization: createSession<Session>(new CookieStorage()).getSession()!
          .token,
      }),
    },
  )
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache().restore((window as any).__INITIAL_STATE__),
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

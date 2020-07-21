import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { CookieStorage } from 'cookie-storage'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { dataIdFromObject } from 'utils/apolloClient'
import introspectionQueryResultData from '../fragmentTypes.json'
import { createSession, Session } from '../shared/sessionStorage'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

export interface ApolloClientAndSubscriptionClient {
  subscriptionClient: SubscriptionClient
  client: ApolloClient<object>
}

export const apolloClient = (() => {
  if (typeof window === 'undefined') {
    return undefined
  }

  if (typeof WebSocket === 'undefined') {
    throw new Error("typeof WebSocket is undefined, can't connect to remote")
  }
  const subscriptionClient = new SubscriptionClient(
    (window as any).GIRAFFE_WS_ENDPOINT,
    {
      reconnect: true,
      connectionParams: () => ({
        Authorization: createSession<Session>(new CookieStorage()).getSession()!
          .token,
      }),
    },
  )
  const client = new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher, dataIdFromObject }),
    link: new WebSocketLink(subscriptionClient),
  })

  return { subscriptionClient, client }
})()

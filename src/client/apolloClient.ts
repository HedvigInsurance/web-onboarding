import { ApolloClient, InMemoryCache } from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'
import { CookieStorage } from 'cookie-storage'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { Quote } from 'data/graphql'
import { createSession, Session } from '../shared/sessionStorage'
import possibleTypes from '../../possibleGraphqlTypes.json'

export interface ApolloClientAndSubscriptionClient {
  subscriptionClient: SubscriptionClient
  // eslint-disable-next-line  @typescript-eslint/ban-types
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
    window.hedvigClientConfig.giraffeWsEndpoint,
    {
      reconnect: true,
      connectionParams: () => ({
        Authorization: createSession<Session>(new CookieStorage()).getSession()!
          .token,
      }),
    },
  )
  const client = new ApolloClient({
    cache: new InMemoryCache({
      possibleTypes,
      typePolicies: {
        QuoteBundle: {
          keyFields: (bundle) =>
            (bundle.quotes as Quote[]).map((q) => q.id).join(','),
        },
        ActiveReferral: {
          keyFields: (referral) => referral.name as string,
        },
        InProgressReferral: {
          keyFields: (referral) => referral.name as string,
        },
      },
    }),
    link: new WebSocketLink(subscriptionClient),
  })

  return { subscriptionClient, client }
})()

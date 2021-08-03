import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'
import { CookieStorage } from 'cookie-storage'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { Quote } from 'data/graphql'
import { createSession, Session } from '../shared/sessionStorage'
import possibleTypes from '../../possibleGraphqlTypes.json'

export interface ApolloClientUtils {
  subscriptionClient: SubscriptionClient
  // eslint-disable-next-line  @typescript-eslint/ban-types
  client: ApolloClient<object>
  httpLink: HttpLink
}

export const apolloClient = (() => {
  if (typeof window === 'undefined') {
    return undefined
  }

  if (typeof WebSocket === 'undefined') {
    throw new Error("typeof WebSocket is undefined, can't connect to remote")
  }

  const authorizationToken = createSession<Session>(
    new CookieStorage(),
  ).getSession()!.token

  const subscriptionClient = new SubscriptionClient(
    window.hedvigClientConfig.giraffeWsEndpoint,
    {
      reconnect: true,
      connectionParams: () => ({
        Authorization: authorizationToken,
      }),
    },
  )

  const httpLink = new HttpLink({
    credentials: 'omit',
    uri: window.hedvigClientConfig.giraffeEndpoint,
    headers: {
      authorization: authorizationToken,
    },
  })

  const client = new ApolloClient({
    name: 'Web:Onboarding',
    cache: new InMemoryCache({
      possibleTypes,
      typePolicies: {
        QuoteBundle: {
          keyFields: (bundle) =>
            (bundle.quotes as Quote[]).map((q) => q.id).join(','),
        },
        AutoCompleteResponse: { keyFields: ['address'] },
        ActiveReferral: {
          keyFields: (referral) => referral.name as string,
        },
        InProgressReferral: {
          keyFields: (referral) => referral.name as string,
        },
      },
    }),
    link: from([
      split(
        (op) => {
          const definition = getMainDefinition(op.query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        new WebSocketLink(subscriptionClient),
        httpLink,
      ),
    ]),
  })

  return { subscriptionClient, client, httpLink }
})()

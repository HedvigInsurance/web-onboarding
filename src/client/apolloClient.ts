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
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'
import { Quote } from 'data/graphql'
import { captureSentryError } from 'utils/sentry-client'
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
  const errorHandler = onError((err) => {
    if (err.graphQLErrors) {
      err.graphQLErrors.forEach((graphqlError) =>
        captureSentryError(
          `GraphQL error: ${graphqlError.message}`,
          graphqlError,
        ),
      )
    }
    if (err.networkError) {
      captureSentryError(err.networkError)
    }
  })
  const httpLink = new HttpLink({
    credentials: 'include',
    uri: window.hedvigClientConfig.giraffeEndpoint,
    headers: {
      authorization: authorizationToken,
    },
  })

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
    link: from([
      errorHandler,
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

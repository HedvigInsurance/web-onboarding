import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split,
  QueryOptions,
  OperationVariables,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'
import { CookieStorage } from 'cookie-storage'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { datadogRum } from '@datadog/browser-rum'
import { getLocaleParamFromPath, getCurrentLocale } from 'l10n/useCurrentLocale'
import possibleTypes from '../../possibleGraphqlTypes.json'
import { createSession, Session, DEVICE_ID_KEY } from '../shared/sessionStorage'

export interface ApolloClientUtils {
  subscriptionClient: SubscriptionClient
  // eslint-disable-next-line  @typescript-eslint/ban-types
  client: ApolloClient<object>
  httpLink: HttpLink
  runQuery<T = any, TVariables = OperationVariables>(
    options: QueryOptions<TVariables, T>,
  ): Promise<T | undefined>
}

export const apolloClient = (() => {
  if (typeof window === 'undefined') {
    return undefined
  }

  if (typeof WebSocket === 'undefined') {
    throw new Error("typeof WebSocket is undefined, can't connect to remote")
  }

  const cookieStorage = new CookieStorage()
  const authorizationToken = createSession<Session>(cookieStorage).getSession()!
    .token

  const subscriptionClient = new SubscriptionClient(
    window.hedvigClientConfig.giraffeWsEndpoint,
    {
      reconnect: true,
      connectionParams: () => ({
        Authorization: authorizationToken,
      }),
    },
  )

  const localeLabel = getLocaleParamFromPath(window.location.pathname)
  const locale = getCurrentLocale(localeLabel)

  const httpLink = new HttpLink({
    credentials: 'omit',
    uri: window.hedvigClientConfig.giraffeEndpoint,
    headers: {
      authorization: authorizationToken,
      'hedvig-device-id': cookieStorage.getItem(DEVICE_ID_KEY),
      'accept-language': locale.isoLocale,
    },
  })

  const client = new ApolloClient({
    name: 'Web:Onboarding',
    cache: new InMemoryCache({
      possibleTypes,
      typePolicies: {
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

  const runQuery = async <T = any, TVariables = OperationVariables>(
    options: QueryOptions<TVariables, T>,
  ): Promise<T | undefined> => {
    try {
      const apolloQuery = await client.query<T>(options)
      if (apolloQuery.error) {
        datadogRum.addError(apolloQuery.error, options)
        return
      } else return apolloQuery.data
    } catch (e) {
      datadogRum.addError(e, options)
      return
    }
  }

  return { subscriptionClient, client, httpLink, runQuery }
})()

import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, concat } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import fetch from 'node-fetch'
import { v4 as uuidV4 } from 'uuid'
import { dataIdFromObject } from 'utils/apolloClient'
import { notNullable } from '../client/utils/nullables'
import introspectionData from '../fragmentTypes.json'
import { GIRAFFE_ENDPOINT } from './config'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionData,
})

const requestIdMiddleware = (requestId?: string) =>
  new ApolloLink((operation, forward) => {
    operation.setContext({ headers: { 'x-request-id': requestId || uuidV4() } })
    return notNullable(forward)(operation)
  })

export const createServerApolloClient = (requestId?: string, token?: string) =>
  new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache({ fragmentMatcher, dataIdFromObject }),
    link: concat(
      requestIdMiddleware(requestId),
      new BatchHttpLink({
        uri: GIRAFFE_ENDPOINT,
        fetch: fetch as any,
        headers: token && {
          Authorization: token,
        },
      }),
    ),
  })

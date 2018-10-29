import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, concat } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import * as uuidV4 from 'uuid/v4'
import { notNullable } from '../utils/nullables'
import { GIRAFFE_ENDPOINT } from './config'

const requestIdMiddleware = (requestId?: string) =>
  new ApolloLink((operation, forward) => {
    operation.setContext({ headers: { 'x-request-id': requestId || uuidV4() } })
    return notNullable(forward)(operation)
  })

export const createServerApolloClient = (requestId?: string, token?: string) =>
  new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: concat(
      requestIdMiddleware(requestId),
      new BatchHttpLink({
        uri: GIRAFFE_ENDPOINT,
        fetch: require('node-fetch'),
        headers: token && {
          Authorization: token,
        },
      }),
    ),
  })

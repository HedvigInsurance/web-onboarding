import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, concat } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import * as uuidV4 from 'uuid/v4'
import { getGiraffeEndpoint } from '../utils/apolloClient'
import { notNullable } from '../utils/nullables'

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

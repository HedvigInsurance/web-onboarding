import gql from 'graphql-tag'
import { apolloClient } from '../../client/apolloClient'
import { CREATE_SESSION_TOKEN_MUTATION } from '../../containers/SessionContainer'
import { afterTick } from './utils'

export const graphQLQuery = (storage: any) => async (
  query: string,
  variables: { [key: string]: any },
) => {
  if (!apolloClient) {
    throw new Error('Missing apollo client')
  }

  if (!storage.session.getSession().token) {
    const sessionResult = await apolloClient.client.mutate({
      mutation: CREATE_SESSION_TOKEN_MUTATION,
    })
    await afterTick(() => {
      apolloClient!.subscriptionClient.close(true, true)
      storage.setToken(sessionResult.data.createSessionV2.token)
    })
  }

  const result = await apolloClient.client.query({
    query: gql(query),
    variables,
    errorPolicy: 'all',
  })

  return result
}

export const graphQLMutation = (storage: any) => async (
  mutation: string,
  variables: { [key: string]: any },
) => {
  if (!apolloClient) {
    throw new Error('Missing apollo client')
  }

  if (!storage.session.getSession().token) {
    const sessionResult = await apolloClient.client.mutate({
      mutation: CREATE_SESSION_TOKEN_MUTATION,
    })
    await afterTick(() => {
      apolloClient!.subscriptionClient.close(true, true)
      storage.setToken(sessionResult.data.createSessionV2.token)
    })
  }

  const result = await apolloClient.client.mutate({
    mutation: gql(mutation),
    variables,
    errorPolicy: 'all',
  })

  return result
}

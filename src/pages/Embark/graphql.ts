import { setupSession } from 'containers/SessionContainer'
import { Locale } from 'data/graphql'
import gql from 'graphql-tag'
import { Storage } from 'utils/StorageContainer'
import { apolloClient } from '../../client/apolloClient'

export const graphQLQuery = (storage: Storage, pickedLocale: Locale) => async (
  query: string,
  variables: { [key: string]: any },
) => {
  await setupSession(apolloClient!, storage, pickedLocale)

  const result = await apolloClient!.client.query({
    query: gql(query),
    variables,
    errorPolicy: 'all',
  })

  return result
}

export const graphQLMutation = (
  storage: Storage,
  pickedLocale: Locale,
) => async (mutation: string, variables: { [key: string]: any }) => {
  await setupSession(apolloClient!, storage, pickedLocale)

  const result = await apolloClient!.client.mutate({
    mutation: gql(mutation),
    variables,
    errorPolicy: 'all',
  })

  return result
}

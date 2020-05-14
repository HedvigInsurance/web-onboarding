import { setupSession } from 'containers/SessionContainer'
import { Locale } from 'data/graphql'
import gql from 'graphql-tag'
import { captureSentryError } from 'utils/sentry-client'
import { Storage } from 'utils/StorageContainer'
import { apolloClient } from '../../client/apolloClient'

export const graphQLQuery = (storage: Storage, pickedLocale: Locale) => async (
  query: string,
  variables: { [key: string]: any },
) => {
  try {
    await setupSession(apolloClient!, storage, pickedLocale)

    const result = await apolloClient!.client.query({
      query: gql(query),
      variables,
      errorPolicy: 'all',
    })

    return result
  } catch (e) {
    captureSentryError(e, { query })
    throw e
  }
}

export const graphQLMutation = (
  storage: Storage,
  pickedLocale: Locale,
) => async (mutation: string, variables: { [key: string]: any }) => {
  try {
    await setupSession(apolloClient!, storage, pickedLocale)

    const result = await apolloClient!.client.mutate({
      mutation: gql(mutation),
      variables,
      errorPolicy: 'all',
    })

    return result
  } catch (e) {
    captureSentryError(e, { mutation })
    throw e
  }
}

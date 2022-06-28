import gql from 'graphql-tag'
import { datadogRum } from '@datadog/browser-rum'
import { apolloClient } from 'apolloClient'
import { setupSession } from 'containers/SessionContainer'
import { Locale } from 'data/graphql'
import { Storage } from 'utils/StorageContainer'

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
  } catch (error) {
    datadogRum.addError(error, { query })
    throw error
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
  } catch (error) {
    datadogRum.addError(error, { mutation })
    throw error
  }
}

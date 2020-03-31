import { useApolloClient } from '@apollo/react-hooks'
import { FetchPolicy } from 'apollo-client'
import {
  QuoteBundle,
  QuoteBundleDocument,
  QuoteBundleQuery,
} from 'data/graphql'
import * as React from 'react'

export interface UseQuoteBundleState {
  loading: boolean
  refetch: () => Promise<QuoteBundle>
}

export type UseQuoteBundleReturnTuple = [
  QuoteBundle | undefined,
  UseQuoteBundleState,
]

export const useQuoteBundle = (
  quoteIds: ReadonlyArray<string>,
): UseQuoteBundleReturnTuple => {
  const [quoteBundle, setQuoteBundle] = React.useState<QuoteBundle | undefined>(
    undefined,
  )
  const [loading, setLoading] = React.useState(true)
  const apolloClient = useApolloClient()

  const fetch = (fetchPolicy?: FetchPolicy) => {
    setLoading(true)
    return apolloClient
      .query<QuoteBundleQuery>({
        query: QuoteBundleDocument,
        variables: {
          input: {
            ids: quoteIds,
          },
        },
        fetchPolicy,
      })
      .then((result) => {
        const resultData = result.data.quoteBundle
        setQuoteBundle(resultData)
        setLoading(false)
        return result.data.quoteBundle
      })
      .catch((e) => {
        setLoading(false)
        throw e // FIXME Better error handling?
      })
  }

  React.useEffect(() => {
    fetch()
  }, [...quoteIds])

  return [quoteBundle, { loading, refetch: () => fetch('network-only') }]
}

import { useApolloClient } from '@apollo/react-hooks'
import { FetchPolicy } from 'apollo-client'
import { QuoteDocument, QuoteQuery } from 'data/graphql'
import * as React from 'react'
import { Quote } from './graphql'

export interface UseQuoteState {
  loading: boolean
  refetch: () => Promise<Quote>
}

export type UseQuoteReturnTuple = [Quote | undefined, UseQuoteState]

export const useQuote = (quoteId: string): UseQuoteReturnTuple => {
  const [quote, setQuote] = React.useState<Quote | undefined>(undefined)
  const [loading, setLoading] = React.useState(true)
  const apolloClient = useApolloClient()

  const fetch = (fetchPolicy?: FetchPolicy) => {
    setLoading(true)
    return apolloClient
      .query<QuoteQuery>({
        query: QuoteDocument,
        variables: { id: quoteId },
        fetchPolicy,
      })
      .then((result) => {
        setQuote(result.data.quote)
        setLoading(false)
        return result.data.quote
      })
      .catch((e) => {
        setLoading(false)
        throw e // FIXME Better error handling?
      })
  }

  React.useEffect(() => {
    fetch()
  }, [quoteId])

  return [quote, { loading, refetch: () => fetch('network-only') }]
}

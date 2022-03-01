import { useQuoteDetailsDataQuery } from 'data/graphql'
import { QuoteDetailsData } from 'api/quoteDetailsDataTypes'
import { useQuoteCartIdFromUrl } from './useQuoteCartIdFromUrl'

export const useQuoteDetailsData = () => {
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const { data, loading: isLoading, error } = useQuoteDetailsDataQuery({
    variables: { id: quoteCartId },
  })

  const quotes = data?.quoteCart.bundle?.quotes

  if (!quotes) {
    return { quoteDetailsData: null, isLoading, error }
  }

  const quoteDetailsData: QuoteDetailsData = quotes.map(({ data }) => data)

  return { quoteDetailsData, isLoading, error }
}

import { useQuoteDetailsDataQuery } from 'data/graphql'
import { QuoteDetails } from 'api/quoteDetailsDataTypes'
import { useQuoteCartIdFromUrl } from './useQuoteCartIdFromUrl'

export type QuoteDetailsData = QuoteDetails[]

export const useQuoteDetailsData = () => {
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const { data, loading: isLoading, error } = useQuoteDetailsDataQuery({
    variables: { id: quoteCartId },
  })

  const quotes = data?.quoteCart.bundle?.quotes

  if (!quotes) {
    return { quoteDetailsData: null, isLoading, error }
  }

  const quoteDetailsData: QuoteDetailsData = quotes.map(({ data }) => {
    const {
      id,
      street,
      zipCode,
      numberCoInsured,
      livingSpace,
      typeOfContract,
      isStudent,
      isYouth,
    } = data

    return {
      id,
      typeOfContract,
      numberCoInsured,
      ...('isYouth' in data && { isYouth }),
      ...('isStudent' in data && { isStudent }),
      ...(street && { street }),
      ...(zipCode && { zipCode }),
      ...(livingSpace && { livingSpace }),
    }
  })

  return { quoteDetailsData, isLoading, error }
}

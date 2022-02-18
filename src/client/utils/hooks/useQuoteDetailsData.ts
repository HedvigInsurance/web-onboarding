import { useQuoteDetailsDataQuery } from 'data/graphql'
import { QuoteDetails } from 'api/quoteDetailsDataTypes'
import { useQuoteCartIdFromUrl } from './useQuoteCartIdFromUrl'

type QuoteDetailsData = QuoteDetails[]

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
      typeOfContract,
      numberCoInsured,
      street,
      zipCode,
      livingSpace,
      isStudent,
      isYouth,
    } = data

    return {
      id,
      typeOfContract,
      numberCoInsured,
      ...(street && { street }),
      ...(zipCode && { zipCode }),
      ...(livingSpace && { livingSpace }),
      ...('isStudent' in data && { isStudent }),
      ...('isYouth' in data && { isYouth }),
    }
  })

  return { quoteDetailsData, isLoading, error }
}

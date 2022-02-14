import { useQuoteDetailsDataQuery, TypeOfContract } from 'data/graphql'
import { MainQuoteDetails } from 'api/quoteDetailsDataTypes'
import { useQuoteCartIdFromUrl } from './useQuoteCartIdFromUrl'

type QuoteDetailsData = {
  [value in TypeOfContract]?: MainQuoteDetails
}

export const useQuoteDetailsData = () => {
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const { data, loading: isLoading, error } = useQuoteDetailsDataQuery({
    variables: { id: quoteCartId },
  })

  const quoteDetailsData = data?.quoteCart.bundle?.quotes.reduce(
    (quoteDetails, currentValue) => {
      const typeOfContract = currentValue.data.typeOfContract

      if (!Object.keys(quoteDetails)) {
        return { [typeOfContract]: currentValue.data }
      }

      return {
        ...quoteDetails,
        [typeOfContract]: currentValue.data,
      }
    },
    {} as QuoteDetailsData,
  )

  return { quoteDetailsData, isLoading, error }
}

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

  const quoteDetailsData: QuoteDetailsData = quotes.map(({ data }) => {
    const {
      id,
      typeOfContract,
      numberCoInsured,
      street,
      zipCode,
      livingSpace,
      floor,
      apartment,
      isStudent,
      isYouth,
      ancillaryArea,
      yearOfConstruction,
      numberOfBathrooms,
      extraBuildings,
      isSubleted,
    } = data

    return {
      id,
      typeOfContract,
      numberCoInsured,
      ...(street && { street }),
      ...(zipCode && { zipCode }),
      ...(livingSpace && { livingSpace }),
      ...('floor' in data && { floor }),
      ...('apartment' in data && { apartment }),
      ...('isStudent' in data && { isStudent }),
      ...('isYouth' in data && { isYouth }),
      ...('ancillaryArea' in data && { ancillaryArea }),
      ...('yearOfConstruction' in data && { yearOfConstruction }),
      ...('numberOfBathrooms' in data && { numberOfBathrooms }),
      ...('extraBuildings' in data && { extraBuildings }),
      ...('isSubleted' in data && { isSubleted }),
    }
  })

  return { quoteDetailsData, isLoading, error }
}

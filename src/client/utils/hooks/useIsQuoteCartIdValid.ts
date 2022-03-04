import { useQuoteCartIdQuery } from 'data/graphql'
import { useQuoteCartIdFromUrl } from './useQuoteCartIdFromUrl'

export const useIsQuoteCartIdValid = () => {
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const { error } = useQuoteCartIdQuery({
    variables: {
      id: quoteCartId,
    },
  })

  const hasError = Boolean(error)

  return { isQuoteCartValid: !hasError }
}

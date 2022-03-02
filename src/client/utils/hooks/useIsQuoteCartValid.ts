import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useQuoteCartQuery } from 'data/graphql'
import { useQuoteCartIdFromUrl } from './useQuoteCartIdFromUrl'

export const useIsQuoteCartValid = () => {
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const { isoLocale } = useCurrentLocale()
  const { error } = useQuoteCartQuery({
    variables: {
      id: quoteCartId,
      locale: isoLocale,
    },
  })

  const hasError = Boolean(error)

  return { isQuoteCartValid: !hasError }
}

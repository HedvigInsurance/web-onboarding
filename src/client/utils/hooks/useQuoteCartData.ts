import { useParams } from 'react-router-dom'
import { useQuoteCartQuery } from 'data/graphql'
import { useCurrentLocale } from 'src/client/l10n/useCurrentLocale'

export const useQuoteCartData = () => {
  const { id: quoteCartId } = useParams<{ id: string }>()
  const { isoLocale } = useCurrentLocale()

  const { data, loading, error } = useQuoteCartQuery({
    variables: {
      id: quoteCartId,
      locale: isoLocale,
    },
  })

  return {
    quoteCartQueryData: data,
    isLoadingQuoteCart: loading,
    quoteCartError: error,
  }
}

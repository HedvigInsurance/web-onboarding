import { useParams } from 'react-router-dom'

export const useQuoteCartIdFromUrl = () => {
  const { id: quoteCartId } = useParams<{ id: string }>()

  return { quoteCartId }
}

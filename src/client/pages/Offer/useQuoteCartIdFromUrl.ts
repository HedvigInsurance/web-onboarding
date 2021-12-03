import { useParams } from 'react-router'

export const useQuoteCartIdFromUrl = () => {
  const { id } = useParams<{ id: string }>()

  if (id === undefined) {
    throw new Error('This hook needs to be called on the offer page')
  }

  return id
}

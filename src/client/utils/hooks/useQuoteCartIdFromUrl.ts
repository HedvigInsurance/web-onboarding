import { useParams, useLocation, matchPath } from 'react-router-dom'
import { routePaths } from '../../../routes'

export const useQuoteCartIdFromUrl = () => {
  const { id: quoteCartId } = useParams<{ id: string }>()

  return { quoteCartId }
}

// use this outside of <Route> components
export const useMatchedQuoteCartIdFromUrl = () => {
  const location = useLocation()
  const quoteCartId = matchPath<{ id: string }>(location.pathname, {
    path: routePaths,
    exact: true,
  })?.params?.id
  return { quoteCartId }
}

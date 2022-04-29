import { useParams, useLocation, matchPath } from 'react-router-dom'
import { routePaths } from '../../../routes'

export const useQuoteCartIdFromUrl = () => {
  const { quoteCartId } = useParams<{ quoteCartId: string }>()

  return { quoteCartId }
}

// use this outside of <Route> components
export const useMatchedQuoteCartIdFromUrl = () => {
  const location = useLocation()
  const quoteCartId = matchPath<{ quoteCartId: string }>(location.pathname, {
    path: routePaths,
    exact: true,
  })?.params?.quoteCartId
  return { quoteCartId }
}

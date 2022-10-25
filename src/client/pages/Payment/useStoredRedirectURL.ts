import { useLocation } from 'react-router'
import { useMemo, useEffect } from 'react'

const QUERY_PARAMETER = 'redirect_url'
const SESSION_STORAGE_KEY = `_hedvig_${QUERY_PARAMETER}`

/**
 * Hook to get redirect URL
 * - From URL when user first lands on the site
 * - From Session Storage if payment flow caused user to leave the site (3DS etc.)
 */
export const useStoredRedirectURL = () => {
  const { search } = useLocation()
  const query = useMemo(() => new URLSearchParams(search), [search])

  useEffect(() => {
    const value = query.get(QUERY_PARAMETER)
    if (value) {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, value)
    }
  }, [query])

  return useMemo(() => {
    const value = query.get(QUERY_PARAMETER)
    if (value) return value

    return window.sessionStorage.getItem(SESSION_STORAGE_KEY)
  }, [query])
}

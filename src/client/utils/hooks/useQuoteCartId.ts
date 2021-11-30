import { useState, useEffect, useCallback, useMemo } from 'react'

const STORAGE_KEY = 'HEDVIG_QUOTE_CART'
const QUERY_PARAMETER = 'cart'

export const QuoteCartId = {
  get: () => window.sessionStorage.getItem(STORAGE_KEY),
  save: (cartId: string) => window.sessionStorage.setItem(STORAGE_KEY, cartId),
  clear: () => window.sessionStorage.removeItem(STORAGE_KEY),
  queryParameter: QUERY_PARAMETER,
}

export const sessionStorageInitializer = () => QuoteCartId.get()

export const useQuoteCartId = (initialId?: string) => {
  const [quoteCartId, setQuoteCartId] = useState<string | null>(
    () => initialId ?? sessionStorageInitializer(),
  )

  useEffect(() => {
    const handle = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setQuoteCartId(event.newValue)
      }
    }
    window.addEventListener('storage', handle)
    return () => window.removeEventListener('storage', handle)
  }, [])

  const changeQuoteCartId = useCallback((cartId: string) => {
    setQuoteCartId(cartId)
    QuoteCartId.save(cartId)
  }, [])

  return [quoteCartId, changeQuoteCartId] as const
}

export const queryParamInitializer = () =>
  new URLSearchParams(window.location.search).get(QUERY_PARAMETER)

export const useQuoteCartIdFromQueryParam = () => {
  const quoteCartId = useMemo(queryParamInitializer, [])

  useEffect(() => {
    if (quoteCartId) {
      QuoteCartId.save(quoteCartId)
    }
  }, [quoteCartId])

  return quoteCartId
}

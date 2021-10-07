import queryString from 'querystring'
import { Location } from 'history'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { StorageState, useStorage } from '../StorageContainer'

export const useQuoteIds = () => {
  const storage = useStorage()
  const location = useLocation()
  const [quoteIds, setQuoteIds] = useState<ReadonlyArray<string>>()
  const [selectedQuoteIds, setSelectedQuoteIds] = useState<
    ReadonlyArray<string>
  >()

  useEffect(() => {
    if (!quoteIds && !selectedQuoteIds) {
      const { quoteIds: ids, selectedQuoteIds: selected } = getQuoteIds(
        storage,
        location,
      )
      setQuoteIds(ids)
      setSelectedQuoteIds(selected)
    }
  }, [location, storage, quoteIds, selectedQuoteIds])

  return {
    isLoading: quoteIds === null,
    quoteIds: quoteIds ?? [],
    selectedQuoteIds: selectedQuoteIds ?? [],
  }
}

const getQuoteIds = (
  storage: StorageState,
  location: Location,
): {
  quoteIds: ReadonlyArray<string>
  selectedQuoteIds: ReadonlyArray<string>
} => {
  const storedIds = storage.session.getSession()?.quoteIds
  const selectedQuoteIds = storage.session.getSession()?.selectedQuoteIds
  if (storedIds?.length) {
    return {
      quoteIds: storedIds,
      selectedQuoteIds: selectedQuoteIds?.length ? selectedQuoteIds : storedIds,
    }
  }

  return getQuoteIdsFromUrlParamsAndSetToStorage(storage, location)
}

const getQuoteIdsFromUrlParamsAndSetToStorage = (
  storage: StorageState,
  location: Location,
) => {
  const { quoteIds: queryParamQuoteIds } = queryString.parse(
    location.search.substr(1),
  )

  if (queryParamQuoteIds && typeof queryParamQuoteIds === 'string') {
    const withoutBrackets = queryParamQuoteIds.replace(/[[\]]/g, '')
    const splitted = withoutBrackets.split(',')
    storage.session.setSession({
      ...storage.session.getSession(),
      quoteIds: splitted,
      selectedQuoteIds: splitted,
    })

    return {
      quoteIds: splitted,
      selectedQuoteIds: splitted,
    }
  }

  return { quoteIds: [], selectedQuoteIds: [] }
}

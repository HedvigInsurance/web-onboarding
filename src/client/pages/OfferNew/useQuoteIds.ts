import queryString from 'querystring'
import { Location } from 'history'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { StorageState, useStorage } from 'src/client/utils/StorageContainer'

export const useQuoteIds = () => {
  const storage = useStorage()
  const location = useLocation()
  const [quoteIds, setQuoteIds] = useState<ReadonlyArray<string> | null>(null)

  useEffect(() => {
    if (quoteIds) {
      return
    }
    const qids = getQuoteIds(storage, location)
    setQuoteIds(qids)
  }, [location, storage, quoteIds])

  return quoteIds
}

const getQuoteIds = (
  storage: StorageState,
  location: Location,
): ReadonlyArray<string> => {
  const storedIds = storage.session.getSession()?.quoteIds
  if (storedIds) {
    return storedIds
  }

  const { quoteIds: queryParamQuoteIds } = queryString.parse(
    location.search.substr(1),
  )

  if (queryParamQuoteIds && typeof queryParamQuoteIds === 'string') {
    const withoutBrackets = queryParamQuoteIds.replace(/[[\]]/g, '')
    const splitted = withoutBrackets.split(',')
    storage.session.setSession({
      ...storage.session.getSession(),
      quoteIds: splitted,
    })
    return splitted
  }

  return []
}

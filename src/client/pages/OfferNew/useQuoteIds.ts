import queryString from 'querystring'
import { History } from 'history'
import { useEffect, useState } from 'react'
import { StorageState } from 'src/client/utils/StorageContainer'

export const useQuoteIds = (storage: StorageState, history: History) => {
  const [quoteIds, setQuoteIds] = useState<ReadonlyArray<string> | null>(null)

  useEffect(() => {
    if (quoteIds) {
      return
    }
    const qids = getQuoteIds(storage, history)
    setQuoteIds(qids)
  }, [history, storage, quoteIds])

  return quoteIds
}

const getQuoteIds = (
  storage: StorageState,
  history: History,
): ReadonlyArray<string> => {
  const storedIds = storage.session.getSession()?.quoteIds
  if (storedIds) {
    return storedIds
  }

  const { quoteIds: queryParamQuoteIds } = queryString.parse(
    history.location.search.substr(1),
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

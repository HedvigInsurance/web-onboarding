import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { IdGetter, IdGetterObj } from 'apollo-cache-inmemory/lib/types'
import { ActiveReferral, InProgressReferral, QuoteBundle } from 'data/graphql'

const isQuoteBundle = (obj: IdGetterObj): obj is QuoteBundle =>
  obj.__typename === 'QuoteBundle'

export const dataIdFromObject: IdGetter = (obj) => {
  if (isQuoteBundle(obj)) {
    return `QuoteBundle:${obj.quotes.map((q) => q.id).join(',')}`
  }

  if (obj.__typename === 'ActiveReferral') {
    return `ActiveReferral:${(obj as ActiveReferral).name}`
  }
  if (obj.__typename === 'InProgressReferral') {
    return `InProgressReferral:${(obj as InProgressReferral).name}`
  }

  return defaultDataIdFromObject(obj)
}

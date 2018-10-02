import { CookieStorage } from 'cookie-storage'
import { defaultTo, pipe } from 'ramda'
import { State as ChatState } from '../pages/Chat/state'
import { MinimalStorage } from './storage/MinimalStorage'

const SESSION_KEY = '_hvsession'

export interface Session {
  chat: ChatState
}

export interface IsomorphicSessionStorage<T> {
  setSession: (value: T) => void
  getSession: () => T | undefined
}

export const createSession = <T>(
  storage: MinimalStorage | CookieStorage,
): IsomorphicSessionStorage<T> => ({
  setSession: (value: T): void => {
    storage.setItem(SESSION_KEY, JSON.stringify(value))
  },
  getSession: (): T | undefined => {
    try {
      return pipe(
        defaultTo('{}') as (thing: string | null | undefined) => string,
        JSON.parse,
      )(storage.getItem(SESSION_KEY))
    } catch (e) {
      return undefined
    }
  },
})

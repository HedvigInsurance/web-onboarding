import { CookieStorage } from 'cookie-storage'
import { MinimalStorage } from './storage/MinimalStorage'

const SESSION_KEY = '_hvsession'

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
      return JSON.parse(storage.getItem(SESSION_KEY) || '{}')
    } catch (e) {
      return undefined
    }
  },
})

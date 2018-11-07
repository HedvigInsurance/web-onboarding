import { CookieStorage } from 'cookie-storage'
import { State as ChatState } from '../pages/Chat/state'
import { MinimalStorage } from './storage/MinimalStorage'

export const SESSION_KEY = '_hvsession'
export const KA_SESSION_KEY = '_hvsessionexpiry'
const SESSION_EXPIRY_TIMEOUT = 30 * 60 * 1000

export interface Session {
  chat: ChatState
  token?: string
}

export interface IsomorphicSessionStorage<T> {
  setSession: (value: T) => void
  getSession: () => T | undefined
  keepAlive: () => void
}

const clearExpiredSession = (storage: MinimalStorage | CookieStorage) => {
  const kaTimestamp = storage.getItem(KA_SESSION_KEY)
  if (
    kaTimestamp &&
    Date.now() - SESSION_EXPIRY_TIMEOUT > Number(kaTimestamp)
  ) {
    storage.removeItem(SESSION_KEY)
    storage.removeItem(KA_SESSION_KEY)
  }
}

export const createSession = <T>(
  storage: MinimalStorage | CookieStorage,
): IsomorphicSessionStorage<T> => ({
  setSession: (value: T): void => {
    storage.setItem(SESSION_KEY, JSON.stringify(value))
  },
  getSession: (): T | undefined => {
    try {
      clearExpiredSession(storage)
      return JSON.parse(storage.getItem(SESSION_KEY) || '{}')
    } catch (e) {
      return undefined
    }
  },
  keepAlive: () => {
    clearExpiredSession(storage)
    storage.setItem(KA_SESSION_KEY, String(Date.now()))
  },
})

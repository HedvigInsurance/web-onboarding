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

const clearExpiredSession = (
  storage: MinimalStorage | CookieStorage,
  sessionKey: string = SESSION_KEY,
) => {
  const kaTimestamp = storage.getItem(KA_SESSION_KEY)
  if (
    kaTimestamp &&
    Date.now() - SESSION_EXPIRY_TIMEOUT > Number(kaTimestamp)
  ) {
    storage.removeItem(sessionKey)
    storage.removeItem(KA_SESSION_KEY)
  }
}

export const createSession = <T>(
  storage: MinimalStorage | CookieStorage,
  storageKey: string = SESSION_KEY,
): IsomorphicSessionStorage<T> => ({
  setSession: (value: T): void => {
    storage.setItem(storageKey, JSON.stringify(value))
  },
  getSession: (): T | undefined => {
    try {
      clearExpiredSession(storage, storageKey)
      return JSON.parse(storage.getItem(storageKey) || '{}')
    } catch (e) {
      return undefined
    }
  },
  keepAlive: () => {
    clearExpiredSession(storage, storageKey)
    storage.setItem(KA_SESSION_KEY, String(Date.now()))
  },
})

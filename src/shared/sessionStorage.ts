import { CookieStorage } from 'cookie-storage'
import { CookieOptions } from 'cookie-storage/lib/cookie-options'
import { MinimalStorage } from 'utils/storage/MinimalStorage'

export const SESSION_KEY = '_hvsession'
export const KA_SESSION_KEY = '_hvsessionexpiry'
export const ONBOARDING_QUOTE_CART_COOKIE_KEY = '_hv_onboarding_quote_cart'
const SESSION_EXPIRY_TIMEOUT = 3 * 60 * 60 * 1000
export const DEVICE_ID_KEY = '_hv_device_id'

export interface Session {
  token?: string
  code?: string
  partner?: string
  quoteIds?: ReadonlyArray<string>
  selectedQuoteIds?: ReadonlyArray<string>
}

export interface IsomorphicSessionStorage<T> {
  setSession: (value: T) => void
  getSession: () => T | undefined
  keepAlive: () => void
  clearSession: () => void
}

export class SavingCookieStorage implements MinimalStorage {
  private inMemoryStore: Record<string, string> = {}

  constructor(private cookieStorage: MinimalStorage) {}

  public getItem(item: string): string | null {
    if (Object.keys(this.inMemoryStore).includes(item)) {
      return this.inMemoryStore[item]
    }

    return this.cookieStorage.getItem(item)
  }

  public removeItem(item: string, options?: CookieOptions): void {
    delete this.inMemoryStore[item]
    this.cookieStorage.removeItem(item, options)
  }

  public setItem(item: string, value: string, options?: CookieOptions): void {
    this.inMemoryStore[item] = value
    this.cookieStorage.setItem(item, value, options)
  }
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
    storage.setItem(storageKey, JSON.stringify(value), {
      path: '/',
      ...(process.env.NODE_ENV !== 'development' && {
        sameSite: 'None',
        secure: true,
      }),
    })
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
    storage.setItem(KA_SESSION_KEY, String(Date.now()), {
      path: '/',
      ...(process.env.NODE_ENV !== 'development' && {
        sameSite: 'None',
        secure: true,
      }),
    })
  },
  clearSession: () => {
    storage.removeItem(storageKey)
    storage.removeItem(KA_SESSION_KEY)
  },
})

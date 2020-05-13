import { CookieStorage } from 'cookie-storage'
import { CookieOptions } from 'cookie-storage/lib/cookie-options'
import { MinimalStorage } from './storage/MinimalStorage'

export const SESSION_KEY = '_hvsession'

export interface Session {
  token?: string
  code?: string
  partner?: string
  quoteIds?: ReadonlyArray<string>
}

export interface IsomorphicSessionStorage<T> {
  setSession: (value: T) => void
  getSession: () => T | undefined
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

export const createSession = <T>(
  storage: MinimalStorage | CookieStorage,
  storageKey: string = SESSION_KEY,
): IsomorphicSessionStorage<T> => ({
  setSession: (value: T): void => {
    storage.setItem(storageKey, JSON.stringify(value), { path: '/' })
  },
  getSession: (): T | undefined => {
    try {
      return JSON.parse(storage.getItem(storageKey) || '{}')
    } catch (e) {
      return undefined
    }
  },
})

import { CookieStorage } from 'cookie-storage'
import { CookieOptions } from 'cookie-storage/lib/cookie-options'
import { Context } from 'koa'
import { omit } from 'ramda'

export class ServerCookieStorage {
  constructor(private readonly requestCtx: Context) {}

  public getItem(item: string): string | null {
    return this.requestCtx.cookies.get(item, { signed: false })
  }

  // tslint:disable-next-line variable-name
  public setItem(item: string, value: string, options?: CookieOptions): void {
    this.requestCtx.cookies.set(item, value, {
      ...omit(['date'], options),
      signed: false,
    })
  }
}

const SESSION_KEY = '_hvsession'

export interface IsomorphicSessionStorage<T> {
  setSession: (value: T) => void
  getSession: () => T
}

export const createSession = <T>(
  storage: ServerCookieStorage | CookieStorage,
): IsomorphicSessionStorage<T> => ({
  setSession: (value: T): void => {
    storage.setItem(SESSION_KEY, JSON.stringify(value))
  },
  getSession: (): T => JSON.parse(storage.getItem(SESSION_KEY) || '{}'),
})

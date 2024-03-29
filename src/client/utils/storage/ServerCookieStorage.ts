import { CookieOptions } from 'cookie-storage/lib/cookie-options'
import { Context } from 'koa'
import { MinimalStorage } from './MinimalStorage'

export class ServerCookieStorage implements MinimalStorage {
  private changedItems: Record<string, string> = {}
  constructor(private readonly requestCtx: Context) {}

  public getItem(item: string): string | null {
    if (item in this.changedItems) {
      return this.changedItems[item]
    }

    const value = this.requestCtx.cookies.get(item, { signed: false })
    return value ? decodeURIComponent(value) : null
  }

  public setItem(item: string, value: string, options?: CookieOptions): void {
    this.changedItems[item] = value
    this.requestCtx.cookies.set(item, encodeURIComponent(value), {
      ...({ ...options, date: undefined } as any),
      signed: false,
      expires: undefined,
      path: '/',
      httpOnly: false,
      ...(process.env.NODE_ENV !== 'development' && {
        sameSite: 'None',
        secure: true,
      }),
    })
  }

  public removeItem(item: string, options?: CookieOptions): void {
    this.setItem(item, '', options)
  }
}

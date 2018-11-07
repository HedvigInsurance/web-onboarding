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

    return decodeURIComponent(
      this.requestCtx.cookies.get(item, { signed: false }),
    )
  }

  public setItem(item: string, value: string, options?: CookieOptions): void {
    this.changedItems[item] = value
    this.requestCtx.cookies.set(item, value, {
      ...({ ...options, date: undefined } as any),
      signed: false,
      expires: undefined,
      path: '/new-member',
    })
  }

  public removeItem(item: string, options?: CookieOptions): void {
    this.setItem(item, '', options)
  }
}

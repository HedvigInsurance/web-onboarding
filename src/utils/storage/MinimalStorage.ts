import { CookieOptions } from 'cookie-storage/lib/cookie-options'

export interface MinimalStorage {
  getItem(item: string): string | null
  setItem(item: string, value: string, options?: CookieOptions): void
}

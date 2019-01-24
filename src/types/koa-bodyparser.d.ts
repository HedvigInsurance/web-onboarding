declare module 'koa-bodyparser' {
  import { Context, Middleware } from 'koa'

  const body: (opts?: {
    enableTypes?: string[]
    encoding?: string
    jsonLimit?: string | number
    textLimit?: string | number
    strict?: boolean
    detectJSON?: (ctx: Context) => boolean
    extendTypes?: { json?: string[]; text?: string[] }
    onerror?: (error: Error, ctx: Context) => void
  }) => Middleware

  export = body
}

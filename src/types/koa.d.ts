import 'koa'

declare module 'koa' {
  interface Request {
    body: any
    disableBodyParser?: boolean
  }
}

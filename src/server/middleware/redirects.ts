import { Middleware } from 'koa'
import { Logger } from 'typescript-logging'

export const permanentRedirect = (to: string): Middleware => async (ctx) => {
  ;(ctx.state.getLogger('request') as Logger).info(
    `Permanently redirecting to ${to}`,
  )
  ctx.set('location', to)
  ctx.status = 301
}

export const forceHost = ({ host }: { host: string }): Middleware => async (
  ctx,
  next,
) => {
  if (ctx.get('host') !== host) {
    ;(ctx.state.getLogger('request') as Logger).info(
      `Redirecting to "${host}" because of host mismatch (got "${ctx.host}")`,
    )
    ctx.redirect(`${ctx.request.protocol}://${host}${ctx.request.originalUrl}`)
    ctx.status = 301
    return
  }

  await next()
}

export const redirectEmptyLanguageToSweden: Middleware = (ctx, next) => {
  if (ctx.path.startsWith('/new-member')) {
    ctx.set('location', '/se' + ctx.originalUrl)
    ctx.status = 301
    return
  }

  return next()
}

export const redirectEnLanguageToSweden: Middleware = (ctx, next) => {
  if (ctx.path.startsWith('/en/new-member')) {
    ctx.set('location', '/se-en' + ctx.originalUrl.replace(/^\/en/, ''))
    ctx.status = 301
    return
  }

  return next()
}

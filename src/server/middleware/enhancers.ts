import * as https from 'https'
import { Context, Middleware } from 'koa'
import { Logger } from 'typescript-logging'
import * as uuidV4 from 'uuid/v4'
import { loggerFactory } from '../logging'

export const setRequestUuidMiddleware: Middleware = async (ctx, next) => {
  ctx.state.requestUuid = ctx.get('x-request-id') || uuidV4()

  await next()
}

export const setLoggerMiddleware: Middleware = async (ctx, next) => {
  ctx.state.getLogger = (name: string) =>
    loggerFactory.getLogger(
      `requestUuid="${ctx.state.requestUuid}"${name ? `:${name}` : ''}`,
    )

  await next()
}

export const logRequestMiddleware: Middleware = async (ctx, next) => {
  const log = (e?: Error) =>
    ctx.state
      .getLogger('request')
      .info(
        `${ctx.get('x-forwarded-proto') || ctx.request.protocol} ${
          ctx.request.method
        } ${ctx.request.originalUrl} - ${e !== undefined ? 500 : ctx.status}`,
      )

  try {
    await next()
    log()
  } catch (e) {
    ctx.state.getLogger('request').error('Uncaught error in request', e)
    log(e)
    throw e
  }
}

const handleSuperFatalError = (ctx: Context) => (superFatalError: Error) => {
  ;(ctx.state.getLogger('emergency') as Logger).fatal(
    'SUPER-FATAL ERROR! Uncaught error in request, but failed to get error page. Throwing error again to trigger super-fatal error page',
    superFatalError,
  )
  return superFatalError
}

export const inCaseOfEmergency: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.status = 500
    try {
      ;(ctx.state.getLogger('emergency') as Logger).error(
        'Uncaught error in request, requesting 500 page',
        e,
      )
      try {
        await new Promise((resolve, reject) => {
          https.get('https://cdn.hedvig.com/500.html', (errorPageResponse) => {
            errorPageResponse
              .pipe(ctx.res)
              .on('error', (superFatalError) => {
                reject(handleSuperFatalError(ctx)(superFatalError))
              })
              .on('end', resolve)
          })
        })
      } catch (superFatalError) {
        throw handleSuperFatalError(ctx)(superFatalError)
      }
    } catch (superFatalError) {
      throw handleSuperFatalError(ctx)(superFatalError)
    }
  }
}

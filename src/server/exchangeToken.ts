import Axios from 'axios'
import Router from 'koa-router'
import { ParameterizedContext } from 'koa'
import { createSession } from 'shared/sessionStorage'
import { ServerCookieStorage } from 'utils/storage/ServerCookieStorage'
import { WithLoggerState } from './middleware/enhancers'

enum SearchParams {
  AuthorizationCode = 'authorization_code',
  Next = 'next',
}

export const exchangeTokenMiddleware: Router.IMiddleware<
  WithLoggerState,
  any
> = async (ctx: ParameterizedContext) => {
  const logger = ctx.state.getLogger('exchangeTokenMiddleware')

  const nextPath = ctx.URL.searchParams.get(SearchParams.Next)
  if (!nextPath) {
    throw new Error(`Search param ${SearchParams.Next} is required`)
  }
  // Safe way of building redirect URL. We don't want to redirect to external site
  const nextUrl = new URL('', ctx.URL)
  nextUrl.host = process.env.HOST_URL || nextUrl.host
  nextUrl.pathname = nextPath
  nextUrl.searchParams.delete(SearchParams.Next)
  nextUrl.searchParams.delete(SearchParams.AuthorizationCode)

  const authorizationCode = ctx.URL.searchParams.get(
    SearchParams.AuthorizationCode,
  )
  if (!authorizationCode) {
    throw new Error(
      `Search param ${SearchParams.AuthorizationCode} is required`,
    )
  }

  try {
    const accessToken = await exchangeAuthorizationCode(authorizationCode)
    const session = createSession(new ServerCookieStorage(ctx))
    session.setSession({ token: accessToken })
  } catch (err) {
    if (err.isAxiosError) {
      const message = `Failed to exchange authorization_code to token: HTTP${err.response.status}`
      logger.error(message, err)
      throw new Error(message)
    } else {
      throw err
    }
  }

  return ctx.redirect(nextUrl.toString())
}

export const exchangeAuthorizationCode = async (
  authorizationCode: string,
): Promise<string> => {
  const resp = await Axios.post(
    `${process.env.AUTH_ENDPOINT}/oauth/token`,
    {
      grant_type: 'authorization_code',
      authorization_code: authorizationCode,
    },
    { responseType: 'json' },
  )
  const accessToken = resp.data.access_token
  if (!accessToken) {
    throw new Error('No access_token field in response')
  }
  return accessToken
}

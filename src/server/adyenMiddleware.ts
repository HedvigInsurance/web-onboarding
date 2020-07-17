import Sentry from '@sentry/node'
import Axios from 'axios'
import Router from 'koa-router'
import { GIRAFFE_ENDPOINT } from 'server/config'
import { WithLoggerState } from 'server/middleware/enhancers'
import { createSession, Session } from 'utils/sessionStorage'
import { ServerCookieStorage } from 'utils/storage/ServerCookieStorage'

interface Adyen3dsDetails {
  MD: string
  PaRes: string
}

const httpClient = Axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const handleAdyen3dsPostRedirect: Router.IMiddleware<
  WithLoggerState,
  any
> = async (ctx, _next) => {
  const { MD: md, PaRes: pares } = (ctx.request as any).body as Adyen3dsDetails
  const session = createSession<Session>(new ServerCookieStorage(ctx))
  const Authorization = session.getSession()?.token

  try {
    const result = await httpClient.post(
      GIRAFFE_ENDPOINT,
      {
        operationName: 'SubmitAdyenRedirection',
        query: `
          mutation SubmitAdyenRedirection($md: String!, $pares: String!) {
            submitAdyenRedirection(req: { md: $md, pares: $pares }) {
              resultCode
            }
          }
        `,
        variables: {
          md,
          pares,
        },
      },
      {
        headers: { Authorization },
      },
    )

    if (result.status !== 200) {
      throw new Error(
        `Expected status code from Graphql endpoint to be 200 when submitting adyen redirection, but was really ${result.status}`,
      )
    }

    if (
      ['Authorised', 'Pending'].includes(
        result.data?.data?.submitAdyenRedirection?.resultCode,
      )
    ) {
      ctx.redirect(
        ctx.params.locale
          ? `/${ctx.params.locale}/new-member/download`
          : '/new-member/connect-download',
      )
      ctx.body = 'Loading'
      return
    }

    const message = `Received error adyen resultCode "${result.data?.data?.submitAdyenRedirection?.resultCode}" when submitting adyen redirection`
    Sentry.captureException(new Error(message))
    ctx.state.getLogger('ayden').error(message)
    ctx.redirect(
      ctx.params.locale
        ? `/${ctx.params.locale}/new-member/connect-payment?error=yes` // todo handle client side
        : '/new-member/connect-payment?error=yes',
    )
    ctx.body = 'Loading'
  } catch (e) {
    Sentry.captureException(e)
    ctx.state.getLogger('ayden').error(e.message)
    throw e
  }
}

import * as Sentry from '@sentry/node'
import Axios from 'axios'
import Router from 'koa-router'
import { ServerCookieStorage } from 'utils/storage/ServerCookieStorage'
import { createSession, Session } from '../shared/sessionStorage'
import { GIRAFFE_HOST } from './config'
import { WithLoggerState } from './middleware/enhancers'

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
  const paymentTokenId = session.getSession()?.paymentTokenId

  try {
    const result = await httpClient.post(GIRAFFE_HOST + '/graphql', {
      operationName: 'SubmitAdyenRedirection',
      query: `
          mutation SubmitAdyenRedirection($paymentTokenId: ID!, $input: SubmitAdyenRedirectionInput!) {
            paymentConnection_submitAdyenRedirection(paymentTokenId: $paymentTokenId, input: $input) {
              status
            }
          }
        `,
      variables: {
        paymentTokenId,
        input: { md, pares },
      },
    })

    console.log('result', result)

    if (result.status !== 200) {
      throw new Error(
        `Expected status code from Graphql endpoint to be 200 when submitting adyen redirection, but was really ${result.status}`,
      )
    }

    if (
      ['Authorised', 'Pending'].includes(
        result.data?.data?.paymentConnection_submitAdyenRedirection?.status,
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
    // console.log(e)
    Sentry.captureException(e)
    ctx.state.getLogger('ayden').error(e.message)
    throw e
  }
}

import Axios from 'axios'
import * as Koa from 'koa'
import { GIRAFFE_ENDPOINT } from 'server/config'
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

// FIXME use this
export const handleAdyen3dsPostRedirect: Koa.Middleware<object> = async (
  ctx,
  _next,
) => {
  const { MD, PaRes } = ctx.request.body as Adyen3dsDetails
  const session = createSession<Session>(new ServerCookieStorage(ctx))
  const Authorization = session.getSession()?.token

  try {
    const result = await httpClient.post(
      GIRAFFE_ENDPOINT,
      {
        operationName: 'SubmitAdyenRedirectionResult',
        query: `
          mutation SubmitAdyenRedirectionResult($MD: String!, $PaRes: String!) {
            submitAdyenRedirectionResult(MD: $MD, PaRes: $PaRes) {
              resultCode
            }
          }
        `,
        variables: {
          MD,
          PaRes,
        },
      },
      {
        headers: { Authorization },
      },
    )
    ctx.body = JSON.stringify(
      { status: result.status, data: result.data },
      null,
      2,
    )
  } catch (e) {
    // TODO how to handle?
    throw e
  }
}

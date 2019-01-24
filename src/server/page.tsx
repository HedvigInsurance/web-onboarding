import { getScriptLocation } from '@hedviginsurance/web-survival-kit'
import { min as createMinifiedSegmentSnippet } from '@segment/snippet'
import { renderStylesToString } from 'emotion-server'
import * as Koa from 'koa'
import * as path from 'path'
import * as React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { renderToString } from 'react-dom/server'
import { FilledContext, HelmetProvider } from 'react-helmet-async'
import { StaticRouter, StaticRouterContext } from 'react-router'
import { App } from '../App'
import { sentryConfig } from '../utils/sentry'
import { createSession, Session } from '../utils/sessionStorage'
import { ServerCookieStorage } from '../utils/storage/ServerCookieStorage'
import { createServerApolloClient } from './apolloClient'
import { GIRAFFE_ENDPOINT, GIRAFFE_WS_ENDPOINT } from './config'

const scriptLocation = getScriptLocation({
  statsLocation: path.resolve(__dirname, 'assets'),
  webpackPublicPath: process.env.WEBPACK_PUBLIC_PATH || '',
})

const segmentSnippet = createMinifiedSegmentSnippet({
  apiKey: process.env.SEGMENT_API_KEY || '',
  page: true,
  load: true,
})
const template = (
  body: string,
  helmetContext: FilledContext['helmet'],
  initialState: any,
  cspNonce: string,
) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=1.2, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  ${helmetContext.title}
  ${helmetContext.link}
  ${helmetContext.meta}
  <script src="https://browser.sentry-cdn.com/4.2.3/bundle.min.js" crossorigin="anonymous"></script>
  <script nonce="${cspNonce}">
    Sentry.init(${JSON.stringify(sentryConfig())})
  </script>
  <script key="segment-snippet" nonce="${cspNonce}">${segmentSnippet}</script>
</head>
<body>
  <div id="react-root">${body}</div>

  <script nonce="${cspNonce}">
    window.GIRAFFE_WS_ENDPOINT= ${JSON.stringify(GIRAFFE_WS_ENDPOINT)}
    window.GIRAFFE_ENDPOINT= ${JSON.stringify(GIRAFFE_ENDPOINT)}
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
  </script>
  <script src="${scriptLocation}"></script>
</body>
</html>
`

export const getPage: Koa.Middleware = async (ctx) => {
  const session = createSession<Session>(new ServerCookieStorage(ctx))
  const dontPanicSession = createSession<any>(
    new ServerCookieStorage(ctx),
    '_hv_dp',
  )
  const unwrappedSession = session.getSession()
  const apolloClient = createServerApolloClient(
    ctx.state.requestUuid,
    unwrappedSession && unwrappedSession.token,
  )
  const routerContext: StaticRouterContext & { statusCode?: number } = {}
  const helmetContext = {}
  const serverApp = (
    <StaticRouter location={ctx.request.originalUrl} context={routerContext}>
      <HelmetProvider context={helmetContext}>
        <ApolloProvider client={apolloClient}>
          <App session={session} dontPanicSession={dontPanicSession} />
        </ApolloProvider>
      </HelmetProvider>
    </StaticRouter>
  )
  await getDataFromTree(serverApp)
  const reactBody = renderStylesToString(renderToString(serverApp))

  if (routerContext.statusCode) {
    ctx.status = routerContext.statusCode
  }
  if (routerContext.url) {
    ctx.redirect(routerContext.url)
    return
  }

  ctx.body = template(
    reactBody,
    (helmetContext as FilledContext).helmet,
    apolloClient.extract(),
    (ctx.res as any).cspNonce,
  )

  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Headers', 'content-type')
}

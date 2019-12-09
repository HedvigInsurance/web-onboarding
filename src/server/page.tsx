import { getScriptLocation } from '@hedviginsurance/web-survival-kit'
import { min as createMinifiedSegmentSnippet } from '@segment/snippet'
import { renderStylesToString } from 'emotion-server'
import { isMobile } from 'is-mobile'
import * as Koa from 'koa'
import * as path from 'path'
import * as React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { renderToString } from 'react-dom/server'
import { FilledContext, HelmetProvider } from 'react-helmet-async'
import { StaticRouter, StaticRouterContext } from 'react-router'
import { MobileContext } from 'utils/mobileContext'
import { App } from '../App'
import { sentryConfig } from '../utils/sentry'
import {
  createSession,
  SavingCookieStorage,
  Session,
} from '../utils/sessionStorage'
import { ServerCookieStorage } from '../utils/storage/ServerCookieStorage'
import { createServerApolloClient } from './apolloClient'
import {
  ANDROID_MINIMUM_VERSION,
  ANDROID_PACKAGE_NAME,
  APP_STORE_ID,
  APPLE_BUNDLE_ID,
  FIREBASE_LINK_DOMAIN,
  GIRAFFE_ENDPOINT,
  GIRAFFE_WS_ENDPOINT,
  IOS_MINIMUM_VERSION,
} from './config'

const scriptLocation = getScriptLocation({
  statsLocation: path.resolve(__dirname, 'assets'),
  webpackPublicPath: process.env.WEBPACK_PUBLIC_PATH || '',
})

const segmentSnippet = createMinifiedSegmentSnippet({
  apiKey: process.env.SEGMENT_API_KEY || '',
  page: true,
  load: true,
})

const template = (helmetContext: FilledContext['helmet'], cspNonce: string) => `
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
  <script defer src="https://adtr.io/jsTag?ap=1412531808"></script>
</head>
<body>
  <div id="react-root"></div>

  <script nonce="${cspNonce}">
    window.GIRAFFE_WS_ENDPOINT= ${JSON.stringify(GIRAFFE_WS_ENDPOINT)}
    window.GIRAFFE_ENDPOINT= ${JSON.stringify(GIRAFFE_ENDPOINT)}
    window.FIREBASE_LINK_DOMAIN=${JSON.stringify(FIREBASE_LINK_DOMAIN)}
    window.ANDROID_PACKAGE_NAME=${JSON.stringify(ANDROID_PACKAGE_NAME)}
    window.ANDROID_MINIMUM_VERSION=${JSON.stringify(ANDROID_MINIMUM_VERSION)}
    window.APPLE_BUNDLE_ID=${JSON.stringify(APPLE_BUNDLE_ID)}
    window.APP_STORE_ID=${JSON.stringify(APP_STORE_ID)}
    window.IOS_MINIMUM_VERSION=${JSON.stringify(IOS_MINIMUM_VERSION)}
  </script>
  <script src="${scriptLocation}"></script>
</body>
</html>
`

export const getPage: Koa.Middleware = async (ctx) => {
  const serverCookieStorage = new SavingCookieStorage(
    new ServerCookieStorage(ctx),
  )
  const session = createSession<Session>(serverCookieStorage)

  const dontPanicSession = createSession<any>(
    new ServerCookieStorage(ctx),
    '_hv_dp',
  )
  const unwrappedSession = session.getSession()

  if (ctx.query.partner) {
    serverCookieStorage.setItem('_hvpartner', ctx.query.partner.toLowerCase())
  }
  if (
    serverCookieStorage.getItem('_hvpartner') &&
    serverCookieStorage.getItem('_hvpartner') !== 'undefined'
  ) {
    session.setSession({
      ...(session.getSession() || ({} as any)),
      partner: serverCookieStorage.getItem('_hvpartner'),
    })
  }
  if (ctx.query.code) {
    serverCookieStorage.setItem('_hvcode', ctx.query.code.toLowerCase())
  }
  if (
    serverCookieStorage.getItem('_hvcode') &&
    serverCookieStorage.getItem('_hvcode') !== 'undefined'
  ) {
    session.setSession({
      ...(session.getSession() || ({} as any)),
      code: serverCookieStorage.getItem('_hvcode'),
    })
  }

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
          <MobileContext.Provider
            value={isMobile({
              ua: ctx.req.headers['user-agent'],
              tablet: true,
            })}
          >
            <App session={session} dontPanicSession={dontPanicSession} />
          </MobileContext.Provider>
        </ApolloProvider>
      </HelmetProvider>
    </StaticRouter>
  )
  await getDataFromTree(serverApp)

  if (routerContext.statusCode) {
    ctx.status = routerContext.statusCode
  }
  if (routerContext.url) {
    ctx.redirect(routerContext.url)
    return
  }

  ctx.body = template(
    (helmetContext as FilledContext).helmet,
    (ctx.res as any).cspNonce,
  )

  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Headers', 'content-type')
}

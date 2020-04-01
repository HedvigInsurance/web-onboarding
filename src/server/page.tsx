import { ApolloProvider } from '@apollo/react-common'
import { getScriptLocation } from '@hedviginsurance/web-survival-kit'
import { min as createMinifiedSegmentSnippet } from '@segment/snippet'
import { isMobile } from 'is-mobile'
import * as Koa from 'koa'
import * as path from 'path'
import * as React from 'react'
import {
  ApolloProvider as LegacyApolloProvider,
  getDataFromTree,
} from 'react-apollo'
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
  CONTENT_SERVICE_ENDPOINT,
  FIREBASE_LINK_DOMAIN,
  GIRAFFE_ENDPOINT,
  GIRAFFE_WS_ENDPOINT,
  IOS_MINIMUM_VERSION,
} from './config'
import { favicons } from './favicons'

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
  ${favicons}
  ${helmetContext.title}
  ${helmetContext.link}
  ${helmetContext.meta}
  <script src="https://browser.sentry-cdn.com/4.2.3/bundle.min.js" crossorigin="anonymous"></script>
  <script nonce="${cspNonce}">
    Sentry.init(${JSON.stringify(sentryConfig())})
  </script>

  <!-- Google Tag Manager -->
  <script nonce="${cspNonce}">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;var n=d.querySelector('[nonce]');
  n&&j.setAttribute('nonce',n.nonce||n.getAttribute('nonce'));f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-WWMKHK5');</script>
  <!-- End Google Tag Manager -->

  <script key="segment-snippet" nonce="${cspNonce}">${segmentSnippet}</script>
  <script defer src="https://adtr.io/jsTag?ap=1412531808"></script>
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWMKHK5"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <div id="react-root"></div>

  <script nonce="${cspNonce}">
    window.GIRAFFE_WS_ENDPOINT= ${JSON.stringify(GIRAFFE_WS_ENDPOINT)}
    window.GIRAFFE_ENDPOINT= ${JSON.stringify(GIRAFFE_ENDPOINT)}
    window.CONTENT_SERVICE_ENDPOINT= ${JSON.stringify(CONTENT_SERVICE_ENDPOINT)}
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
          <LegacyApolloProvider client={apolloClient}>
            <MobileContext.Provider
              value={isMobile({
                ua: ctx.req.headers['user-agent'],
                tablet: true,
              })}
            >
              <App session={session} />
            </MobileContext.Provider>
          </LegacyApolloProvider>
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

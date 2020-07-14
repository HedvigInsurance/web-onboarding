import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { min as createMinifiedSegmentSnippet } from '@segment/snippet'
import fs from 'fs'
import { isMobile } from 'is-mobile'
import Router from 'koa-router'
import path from 'path'
import React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { FilledContext, HelmetProvider } from 'react-helmet-async'
import { StaticRouter, StaticRouterContext } from 'react-router'
import { MobileContext } from 'utils/mobileContext'
import { App } from '../App'
import { sentryConfig } from '../utils/sentry-server'
import {
  createSession,
  SavingCookieStorage,
  Session,
} from '../utils/sessionStorage'
import { ServerCookieStorage } from '../utils/storage/ServerCookieStorage'
import { createServerApolloClient } from './apolloClient'
import {
  ADYEN_ENVIRONMENT,
  ADYEN_ORIGIN_KEY,
  CONTENT_SERVICE_ENDPOINT,
  GIRAFFE_ENDPOINT,
  GIRAFFE_WS_ENDPOINT,
} from './config'
import { favicons } from './favicons'
import { WithRequestUuid } from './middleware/enhancers'

const scriptLocation =
  process.env.NODE_ENV === 'production'
    ? '/new-member-assets/' +
      JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, '../../build/new-member-assets/stats.json'),
          'utf-8',
        ),
      ).assetsByChunkName.app[0]
    : '/new-member-assets/app.js'

const segmentSnippet = createMinifiedSegmentSnippet({
  apiKey: process.env.SEGMENT_API_KEY || '',
  page: true,
  load: true,
})

const template = (
  helmetContext: FilledContext['helmet'],
  cspNonce: string,
  adtractionTag: string,
) => `
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
  <script defer src="${adtractionTag}"></script>
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWMKHK5"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <div id="react-root"></div>

  <script nonce="${cspNonce}">
    window.GIRAFFE_WS_ENDPOINT = ${JSON.stringify(GIRAFFE_WS_ENDPOINT)};
    window.GIRAFFE_ENDPOINT = ${JSON.stringify(GIRAFFE_ENDPOINT)};
    window.CONTENT_SERVICE_ENDPOINT = ${JSON.stringify(
      CONTENT_SERVICE_ENDPOINT,
    )};
    window.ADYEN_ORIGIN_KEY = ${JSON.stringify(ADYEN_ORIGIN_KEY)};
    window.ADYEN_ENVIRONMENT = ${JSON.stringify(ADYEN_ENVIRONMENT)};
  </script>
  <script src="${scriptLocation}"></script>
</body>
</html>
`

export const getPage: Router.IMiddleware<WithRequestUuid, any> = async (
  ctx,
) => {
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
    <ApolloProvider client={apolloClient}>
      <ApolloHooksProvider client={apolloClient}>
        <StaticRouter
          location={ctx.request.originalUrl}
          context={routerContext}
        >
          <HelmetProvider context={helmetContext}>
            <MobileContext.Provider
              value={isMobile({
                ua: ctx.req.headers['user-agent'],
                tablet: true,
              })}
            >
              <App session={session} />
            </MobileContext.Provider>
          </HelmetProvider>
        </StaticRouter>
      </ApolloHooksProvider>
    </ApolloProvider>
  )
  await getDataFromTree(serverApp)

  if (routerContext.statusCode) {
    ctx.status = routerContext.statusCode
  }
  if (routerContext.url) {
    ctx.redirect(routerContext.url)
    return
  }

  const ADRTRACTION_NO = 'https://cdn.adt387.com/jsTag?ap=1492109567'
  const ADTRACTION_SE = 'https://adtr.io/jsTag?ap=1412531808'
  ctx.body = template(
    (helmetContext as FilledContext).helmet,
    (ctx.res as any).cspNonce,
    ['no', 'no-en'].includes(ctx.params.locale)
      ? ADRTRACTION_NO
      : ADTRACTION_SE,
  )

  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Headers', 'content-type')
}

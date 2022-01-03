import { min as createMinifiedSegmentSnippet } from '@segment/snippet'
import escapeHTML from 'escape-html'
import Router from 'koa-router'
import { ClientConfig } from 'shared/clientConfig'
import { LocaleLabel, locales } from '../client/l10n/locales'
import { ServerCookieStorage } from '../client/utils/storage/ServerCookieStorage'
import { ServerSideRoute } from '../routes'
import {
  createSession,
  SavingCookieStorage,
  Session,
} from '../shared/sessionStorage'
import {
  ADYEN_ENVIRONMENT,
  ADYEN_ORIGIN_KEY,
  APP_ENVIRONMENT,
  CONTENT_SERVICE_ENDPOINT,
  GIRAFFE_WS_ENDPOINT,
  FEATURES,
} from './config'
import { favicons } from './favicons'
import { getPageMeta } from './meta'
import { WithRequestUuid } from './middleware/enhancers'
import { getClientScripts } from './assets'

const segmentSnippet = createMinifiedSegmentSnippet({
  apiKey: process.env.SEGMENT_API_KEY || '',
  page: true,
  load: true,
})

const clientConfig: ClientConfig = {
  adyenEnvironment: ADYEN_ENVIRONMENT,
  adyenOriginKey: ADYEN_ORIGIN_KEY,
  contentServiceEndpoint: CONTENT_SERVICE_ENDPOINT,
  giraffeEndpoint: '/new-member/graphql',
  giraffeWsEndpoint: GIRAFFE_WS_ENDPOINT,
  appEnvironment: APP_ENVIRONMENT as ClientConfig['appEnvironment'],
  features: FEATURES,
}

const template = (
  route: ServerSideRoute,
  locale: string,
  cspNonce: string,
  adtractionTag: string | null,
  code: string | null,
) => {
  const pageMeta = getPageMeta(locale, route, code)

  return `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=1.2, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${favicons}
    <title>${escapeHTML(pageMeta?.metaTitle)}</title>
    <meta property="og:title" content="${escapeHTML(pageMeta?.metaTitle)}" />
    ${
      pageMeta?.ogDescription
        ? `<meta property="og:description" content="${escapeHTML(
            pageMeta.ogDescription,
          )}" />`
        : ''
    }
    <meta
        property="og:image"
        content="${route.ogImage ||
          'https://www.hedvig.com/f/62762/1920x1080/a8d806bbbf/background.png'}"
     />
     <meta name="google-site-verification" content="AZ5rW7lm8fgkGEsSI8BbV4i45ylXAnGEicXf6HPQE-Q" />

    <script nonce="${cspNonce}">
      dataLayer = [];
    </script>

    <!-- Google Tag Manager -->
    <script id="gtmScript" nonce="${cspNonce}" data-nonce="${cspNonce}">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;j.setAttribute('nonce','${cspNonce}');f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WWMKHK5');</script>
    <!-- End Google Tag Manager -->

    <script key="segment-snippet" nonce="${cspNonce}">${segmentSnippet}</script>
    ${
      adtractionTag
        ? `<script nonce="${cspNonce}" defer src="${adtractionTag}"></script>`
        : ''
    }
  </head>
  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WWMKHK5"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div id="react-root"></div>

    <script nonce="${cspNonce}">
      Object.defineProperty(window, 'hedvigClientConfig', {
        value: Object.freeze(${JSON.stringify(clientConfig)}),
        writable: false,
      })
    </script>
    ${getClientScripts()
      .map((script) => `<script nonce="${cspNonce}" src="${script}"></script>`)
      .join('')}
  </body>
  </html>
  `
}

export const getPage = (
  route: ServerSideRoute,
): Router.IMiddleware<WithRequestUuid, any> => async (ctx) => {
  const serverCookieStorage = new SavingCookieStorage(
    new ServerCookieStorage(ctx),
  )
  const session = createSession<Session>(serverCookieStorage)

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

  if (route.status) {
    ctx.status = route.status
  }

  const adtractionScriptSrc =
    locales[ctx.params.locale as LocaleLabel]?.adtractionScriptSrc ?? null

  ctx.body = template(
    route,
    ctx.params.locale,
    (ctx.res as any).cspNonce,
    adtractionScriptSrc,
    ctx.params.code ?? null,
  )

  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Headers', 'content-type')
}

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
import { allTracking, gtmNoScript } from './tracking'

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
  serverRouteData: ServerSideRoute,
  locale: string,
  cspNonce: string,
  adtractionTag: string | null,
  code: string | null,
) => {
  const pageMeta = getPageMeta(locale, serverRouteData, code)
  const htmlLang = locales[locale as LocaleLabel]?.htmlLang ?? 'en'

  return `<!doctype html>
  <html lang=${htmlLang}>
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
        content="${serverRouteData.ogImage ||
          'https://www.hedvig.com/f/62762/1920x1080/a8d806bbbf/background.png'}"
     />
     <meta name="google-site-verification" content="AZ5rW7lm8fgkGEsSI8BbV4i45ylXAnGEicXf6HPQE-Q" />

    ${allTracking(cspNonce, clientConfig.appEnvironment)}
    
    ${
      adtractionTag
        ? `<script nonce="${cspNonce}" defer src="${adtractionTag}"></script>`
        : ''
    }
  </head>
  <body>
  ${
    clientConfig.appEnvironment === 'production'
      ? gtmNoScript.prod
      : gtmNoScript.dev
  }

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
  serverRouteData: ServerSideRoute,
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

  if (serverRouteData.status) {
    ctx.status = serverRouteData.status
  }

  const adtractionScriptSrc =
    locales[ctx.params.locale as LocaleLabel]?.adtractionScriptSrc ?? null

  ctx.body = template(
    serverRouteData,
    ctx.params.locale,
    (ctx.res as any).cspNonce,
    adtractionScriptSrc,
    ctx.params.code ?? null,
  )

  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Headers', 'content-type')
}

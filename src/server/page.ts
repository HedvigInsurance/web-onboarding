import escapeHTML from 'escape-html'
import Router from 'koa-router'
import { v4 as uuidv4 } from 'uuid'
import { ClientConfig, ClientConfigServerData } from 'shared/clientConfig'
import { LocaleLabel, locales } from '../client/l10n/locales'
import { ServerCookieStorage } from '../client/utils/storage/ServerCookieStorage'
import { ServerSideRoute } from '../routes'
import {
  createSession,
  SavingCookieStorage,
  Session,
  DEVICE_ID_KEY,
} from '../shared/sessionStorage'

import {
  ADYEN_ENVIRONMENT,
  ADYEN_CLIENT_KEY,
  APP_ENVIRONMENT,
  CONTENT_SERVICE_ENDPOINT,
  GIRAFFE_WS_ENDPOINT,
  FEATURES,
  HEROKU_SLUG_COMMIT,
  DATADOG_APPLICATION_ID,
  DATADOG_CLIENT_TOKEN,
  GIRAFFE_HOST,
  EMBARK_STORY_NO,
  EMBARK_STORY_DK,
  INSURELY_CAR_CLIENT_ID,
  INSURELY_HOME_CLIENT_ID,
} from './config'
import { favicons } from './favicons'
import { getPageMeta } from './meta'
import { WithRequestUuid } from './middleware/enhancers'
import { getClientScripts } from './assets'
import { allTracking, gtmNoScript } from './tracking'

const clientConfig: ClientConfig = {
  adyenEnvironment: ADYEN_ENVIRONMENT,
  adyenClientKey: ADYEN_CLIENT_KEY,
  contentServiceEndpoint: CONTENT_SERVICE_ENDPOINT,
  giraffeHost: GIRAFFE_HOST,
  giraffeEndpoint: '/new-member/graphql',
  giraffeWsEndpoint: GIRAFFE_WS_ENDPOINT,
  appEnvironment: APP_ENVIRONMENT as ClientConfig['appEnvironment'],
  features: FEATURES,

  datadog: {
    applicationId: DATADOG_APPLICATION_ID,
    clientToken: DATADOG_CLIENT_TOKEN,
    version: HEROKU_SLUG_COMMIT,
  },
  referer: null,
  insurelyHomeClientId: INSURELY_HOME_CLIENT_ID,
  insurelyCarClientId: INSURELY_CAR_CLIENT_ID,
  embarkStory: {
    NO: EMBARK_STORY_NO,
    DK: EMBARK_STORY_DK,
  },
}

const template = (
  serverRouteData: ServerSideRoute,
  locale: string,
  cspNonce: string,
  adtractionTag: string | null,
  code: string | null,
  clientConfigData: ClientConfigServerData,
) => {
  const pageMeta = getPageMeta(locale, serverRouteData, code)
  const htmlLang = locales[locale as LocaleLabel]?.htmlLang ?? 'en'
  const config = { ...clientConfig, ...clientConfigData }

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

    ${
      pageMeta?.canonical
        ? `<link
      rel="canonical"
      href="${pageMeta?.canonical}"
    />`
        : ''
    }
    ${
      serverRouteData.alternateLinks
        ? serverRouteData.alternateLinks.reduce(
            (prev, { hrefLang, locale, href }) =>
              `${prev}<link
          rel="alternate"
          hrefLang="${hrefLang}"
          href="${href}"
          key="${locale}"
        />`,
            '',
          )
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
        value: Object.freeze(${JSON.stringify(config)}),
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

  const clientConfigData: ClientConfigServerData = {
    referer: ctx.req.headers.referer ?? null,
  }

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

  const deviceId = serverCookieStorage.getItem(DEVICE_ID_KEY)
  if (!deviceId || deviceId === 'undefined') {
    serverCookieStorage.setItem(DEVICE_ID_KEY, uuidv4())
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
    clientConfigData,
  )

  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Headers', 'content-type')
}

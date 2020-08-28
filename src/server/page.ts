import { min as createMinifiedSegmentSnippet } from '@segment/snippet'
import { getLocaleIsoCode } from 'components/utils/CurrentLocale'
import { Locale } from 'data/graphql'
import escapeHTML from 'escape-html'
import fs from 'fs'
import Router from 'koa-router'
import path from 'path'
import { sentryConfig } from '../client/utils/sentry-server'
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
  CONTENT_SERVICE_ENDPOINT,
  GIRAFFE_ENDPOINT,
  GIRAFFE_WS_ENDPOINT,
} from './config'
import { favicons } from './favicons'
import { WithRequestUuid } from './middleware/enhancers'
import { replacePlaceholders, translations } from './tmp-translations'

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

const getOgDescription = (
  route: ServerSideRoute,
  code: string | null,
  localeIsoCode: Locale,
): string | null => {
  if (!route.metaDescriptionTextKey) {
    return null
  }

  let ogDescription: string

  if (code === null) {
    ogDescription = translations[localeIsoCode][route.metaDescriptionTextKey]
  } else {
    ogDescription = replacePlaceholders(
      { CODE: code.toUpperCase() },
      translations[localeIsoCode][route.metaDescriptionTextKey],
    )
  }

  return ogDescription
}

const template = (
  route: ServerSideRoute,
  locale: string,
  cspNonce: string,
  adtractionTag: string,
  code: string | null,
) => {
  let localeIsoCode: Locale
  try {
    localeIsoCode = getLocaleIsoCode(locale)
  } catch (_e) {
    localeIsoCode = Locale.EnSe
  }
  const metaTitle = translations[localeIsoCode][route.titleTextKey]
  const ogDescription = getOgDescription(route, code, localeIsoCode)

  return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=1.2, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${favicons}
    <title>${escapeHTML(metaTitle)}</title>
    <meta property="og:title" content="${escapeHTML(metaTitle)}" />
    ${
      ogDescription
        ? `<meta property="og:description" content="${escapeHTML(
            ogDescription,
          )}" />`
        : ''
    }
    <meta
        property="og:image"
        content="${route.ogImage ||
          'https://www.hedvig.com/f/62762/1920x1080/a8d806bbbf/background.png'}"
     />
     <meta name="google-site-verification" content="AZ5rW7lm8fgkGEsSI8BbV4i45ylXAnGEicXf6HPQE-Q" />

    <script src="https://browser.sentry-cdn.com/4.2.3/bundle.min.js" crossorigin="anonymous"></script>
    <script nonce="${cspNonce}">
      Sentry.init(${JSON.stringify(sentryConfig())})
    </script>

    <script nonce="${cspNonce}">
      dataLayer = [];
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

  const ADRTRACTION_NO = 'https://cdn.adt387.com/jsTag?ap=1492109567'
  const ADTRACTION_SE = 'https://adtr.io/jsTag?ap=1412531808'
  ctx.body = template(
    route,
    ctx.params.locale,
    (ctx.res as any).cspNonce,
    ['no', 'no-en'].includes(ctx.params.locale)
      ? ADRTRACTION_NO
      : ADTRACTION_SE,
    ctx.params.code ?? null,
  )

  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Headers', 'content-type')
}

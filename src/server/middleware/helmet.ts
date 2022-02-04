import koaHelmet from 'koa-helmet'
import { v4 as uuidV4 } from 'uuid'
import { CONTENT_SERVICE_ENDPOINT, GIRAFFE_WS_ENDPOINT } from '../config'

const defaultSrc = [
  "'self'",
  'localhost:8040',
  'hedvig.com',
  'ion.hedvig.com',
  'www.hedvig.com',
  'cdn.hedvig.com',
  '*.hotjar.com',
  '*.hotjar.io',
  'wss://*.hotjar.com',
  '*.intercom.io',
  '*.intercomcdn.com',
  '*.intercomassets.com',
  '*.intercomusercontent.com',
  'wss://nexus-websocket-a.intercom.io',
  'app.getsentry.com',
  'sentry.io',
  'www.google-analytics.com',
  'www.googletagmanager.com',
  'https://tagmanager.google.com',
  'https://www.googletagmanager.com',
  'www.googleadservices.com',
  'www.gstatic.com',
  'https://fonts.gstatic.com',
  'https://optimize.google.com',
  'www.google.com',
  'www.google.se',
  'tpc.googlesyndication.com',
  'translate.google.com',
  '*.facebook.net',
  '*.facebook.com',
  'tr.snapchat.com',
  'sc-static.net',
  's.pinimg.com',
  'ct.pinterest.com',
  't.co',
  'analytics.twitter.com',
  'static.ads-twitter.com',
  'online.adservicemedia.dk',
  '*.doubleclick.net',
  'adtr.io',
  'track.adtraction.com',
  'c.adtraction.net',
  'cnv.adt670.com',
  'cnv.adt686.net',
  'cdn.adt387.com',
  'bnc.lt',
  'app.link',
  'hedvig.app.link',
  'hedvig.test-app.link',
  'trustly.com',
  '*.trustly.com',
  'cdn.mxpnl.com',
  'cdn.segment.com',
  'cdn.cookielaw.org',
  'api.segment.io',
  'https://api-js.mixpanel.com',
  'checkoutshopper-live.adyen.com',
  'checkoutshopper-test.adyen.com',
  'https://aff.addreax.com',
  'js.go2sdk.com',
  'secure.adnxs.com',
  'snap.licdn.com',
  'https://bat.bing.com',
  'https://analytics.tiktok.com',
  GIRAFFE_WS_ENDPOINT!,
  CONTENT_SERVICE_ENDPOINT!,
]

export const helmet = koaHelmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc,
      scriptSrc: [
        "'unsafe-eval'",
        'https://browser.sentry-cdn.com',
        ...defaultSrc,
        (_request: any, response: any) => {
          response.cspNonce = uuidV4()
          return `'nonce-${response.cspNonce}'`
        },
      ],
      styleSrc: [
        "'unsafe-inline'",
        "'self'",
        'checkoutshopper-live.adyen.com',
        'https://tagmanager.google.com',
        'https://www.googletagmanager.com',
        'https://fonts.googleapis.com',
        'https://optimize.google.com',
      ],
      objectSrc: ["'none'"],
      imgSrc: [
        "'self'",
        'data:',
        'hedvig.com',
        '*.hedvig.com',
        CONTENT_SERVICE_ENDPOINT!,
        'checkoutshopper-live.adyen.com',
        'checkoutshopper-test.adyen.com',
        't.co',
        'ct.pinterest.com',
        'googleads.g.doubleclick.net',
        'stats.g.doubleclick.net',
        'www.googletagmanager.com',
        'www.google-analytics.com',
        'www.gstatic.com',
        'https://optimize.google.com',
        'https://ssl.gstatic.com',
        'www.google.com',
        'www.google.se',
        'www.google.no',
        'www.google.dk',
        'www.facebook.com',
        'downloads.intercomcdn.com',
        'online.adservicemedia.dk',
        'js.intercomcdn.com',
        'static.intercomassets.com',
        'hedvig.intercom-attachments-5.com',
        'gifs.intercomcdn.com',
        'cnv.adt686.net',
        'cnv.adt387.com',
        'https://px.ads.linkedin.com',
        'https://px4.ads.linkedin.com',
        'www.linkedin.com',
        'https://bat.bing.com',
      ],
      reportUri:
        process.env.CSP_REPORT_ENDPOINT || '/new-member/_report-csp-violation',
      upgradeInsecureRequests: true,
    },
  },
  frameguard: false,
})

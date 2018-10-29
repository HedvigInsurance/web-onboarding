import * as koaHelmet from 'koa-helmet'
import * as uuidV4 from 'uuid/v4'

export const helmet = koaHelmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        "'self'",
        'cdn.hedvig.com',
        process.env.GIRAFFE_ENDPOINT as string,
        process.env.GIRAFFE_WS_ENDPOINT as string,
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-eval'",
        'cdn.hedvig.com',
        'browser.sentry-cdn.com',
        'cdn.segment.com',
        // tslint:disable-next-line variable-name
        (_request, response) => {
          ;(response as any).cspNonce = uuidV4()
          return `'nonce-${(response as any).cspNonce}'`
        },
      ],
      styleSrc: ["'self'", "'unsafe-inline'", 'cdn.hedvig.com'],
      upgradeInsecureRequests: true,
      objectSrc: ["'none'"],
      reportUri: '/new-member/_report-csp-violation',
    },
  },
})

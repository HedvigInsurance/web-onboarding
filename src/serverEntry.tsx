import { createKoaServer } from '@hedviginsurance/web-survival-kit' // tslint:disable-line ordered-imports
import * as Sentry from '@sentry/node' // tslint:disable-line ordered-imports
import * as bodyParser from 'koa-bodyparser'
import * as proxy from 'koa-proxies'
import { handleAdyen3dsPostRedirect } from 'server/adyenMiddleware'
import 'source-map-support/register'
import { Logger } from 'typescript-logging'
import {
  LOCALE_PATH_PATTERN,
  reactPageRoutes,
  serverSideRedirects,
} from './routes'
import {
  ASSET_FALLBACK_PROXY,
  GIRAFFE_ENDPOINT,
  GIRAFFE_WS_ENDPOINT,
} from './server/config'
import { appLogger } from './server/logging'
import {
  inCaseOfEmergency,
  logRequestMiddleware,
  setLoggerMiddleware,
  setRequestUuidMiddleware,
} from './server/middleware/enhancers'
import { helmet } from './server/middleware/helmet'
import {
  forceHost,
  permanentRedirect,
  redirectEmptyLanguageToSweden,
  redirectEnLanguageToSweden,
  referralsRedirectEmptyLanguageToSwedenSwedish,
  referralsRedirectEnLanguageToSwedenEnglish,
} from './server/middleware/redirects'
import { getPage } from './server/page'
import { notNullable } from './utils/nullables'
import { sentryConfig } from './utils/sentry-server'

Sentry.init({
  ...sentryConfig(),
  serverName: process.env.HEROKU_DYNO_ID,
  attachStacktrace: true,
})

const getPort = () => (process.env.PORT ? Number(process.env.PORT) : 8080)

appLogger.info(`Booting server on ${getPort()} 👢`)
appLogger.info(
  `Sentry is ${
    Boolean(sentryConfig().enabled) ? 'enabled' : 'disabled'
  }, with environment "${sentryConfig().environment}"`,
)
appLogger.info(
  `Using giraffe at batchHttp:"${GIRAFFE_ENDPOINT}" ws:"${GIRAFFE_WS_ENDPOINT}" 🦒`,
)

const server = createKoaServer({
  publicPath: '/new-member-assets',
  assetLocation: __dirname + '/assets',
})

if (ASSET_FALLBACK_PROXY) {
  server.app.use(
    proxy('/new-member-assets', {
      target: ASSET_FALLBACK_PROXY,
      logs: true,
      changeOrigin: true,
    }),
  )
}

if (process.env.FORCE_HOST) {
  appLogger.info(`Forcing host to be ${process.env.FORCE_HOST}`)
  server.router.use(forceHost({ host: process.env.FORCE_HOST! }))
}

server.router.use('/new-member*', redirectEmptyLanguageToSweden)
server.router.use('/en/new-member*', redirectEnLanguageToSweden)

server.router.use('/referrals/*', referralsRedirectEmptyLanguageToSwedenSwedish)
server.router.use('/en/referrals/*', referralsRedirectEnLanguageToSwedenEnglish)

serverSideRedirects.forEach(({ from, to }) => {
  server.router.use(from, permanentRedirect(to))
})

server.router.use(
  bodyParser({
    extendTypes: { json: ['application/csp-report'] },
  }),
)

if (process.env.USE_HELMET === 'true') {
  appLogger.info('Using helmet and strict CSP ⛑')
  server.app.use(helmet)
  server.router.use(helmet)
} else if (process.env.NODE_ENV !== 'development') {
  appLogger.warn(
    'NOT using any helmet or CSP headers. This is not recommended for production usage',
  )
}
server.app.use(setRequestUuidMiddleware)
server.app.use(setLoggerMiddleware)
server.app.use(logRequestMiddleware)
server.router.use(setRequestUuidMiddleware)
server.router.use(setLoggerMiddleware)
server.router.use(logRequestMiddleware)
server.app.use(inCaseOfEmergency)
server.router.use(inCaseOfEmergency)
if (process.env.USE_AUTH) {
  appLogger.info(
    `Protecting server using basic auth with user ${process.env.AUTH_NAME} 💂‍`,
  )
  const basicAuth = require('koa-basic-auth') // tslint:disable-line no-var-requires
  const basicAuthMidleware = basicAuth({
    name: notNullable(process.env.AUTH_NAME),
    pass: notNullable(process.env.AUTH_PASS),
  })
  server.app.use(basicAuthMidleware)
  server.router.use(basicAuthMidleware)
} else {
  appLogger.info('Not using any auth, server is open to the public')
}

server.router.get('/panic-room', async () => {
  throw new Error(
    'Entered the panic room, this is an expected error. Carry on 👜',
  )
})

server.router.post('/new-member/_report-csp-violation', (ctx) => {
  ;(ctx.state.getLogger('cspViolation') as Logger).error(
    `CSP VIOLATION: ${JSON.stringify(ctx.request.body)}`,
  )
  ctx.status = 204
})

server.router.post(
  LOCALE_PATH_PATTERN + '/new-member/connect-payment/adyen-callback',
  handleAdyen3dsPostRedirect,
)

reactPageRoutes.forEach((route) => {
  server.router.get(route.serverPath ?? route.path, getPage)
})

server.app.listen(getPort(), () => {
  appLogger.info(`Server started 🚀 listening on port ${getPort()}`)
})

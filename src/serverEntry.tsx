import '@babel/polyfill'
import 'source-map-support/register'

import * as Sentry from '@sentry/node' // tslint:disable-line ordered-imports
import { LOCALE_PATH_PATTERN } from 'components/utils/CurrentLocale'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { handleAdyen3dsPostRedirect } from 'server/adyenMiddleware'
import { Logger } from 'typescript-logging'
import { reactPageRoutes, serverSideRedirects } from './routes'
import { GIRAFFE_ENDPOINT, GIRAFFE_WS_ENDPOINT } from './server/config'
import { appLogger } from './server/logging'
import { configureAssets } from './server/middleware/assets'
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
} from './server/middleware/redirects'
import { getPage } from './server/page'
import { notNullable } from './utils/nullables'
import { sentryConfig } from './utils/sentry-server'

Sentry.init({
  ...sentryConfig(),
  serverName: process.env.HEROKU_DYNO_ID,
  attachStacktrace: true,
})

const getPort = () => (process.env.PORT ? Number(process.env.PORT) : 8040)

const app = new Koa()
const router = new Router()

configureAssets(app)

appLogger.info(`Booting server on ${getPort()} 👢`)
appLogger.info(
  `Sentry is ${
    Boolean(sentryConfig().enabled) ? 'enabled' : 'disabled'
  }, with environment "${sentryConfig().environment}"`,
)
appLogger.info(
  `Using giraffe at batchHttp:"${GIRAFFE_ENDPOINT}" ws:"${GIRAFFE_WS_ENDPOINT}" 🦒`,
)

if (process.env.FORCE_HOST) {
  appLogger.info(`Forcing host to be ${process.env.FORCE_HOST}`)
  router.use(forceHost({ host: process.env.FORCE_HOST! }))
}

router.use('/new-member(.*)', redirectEmptyLanguageToSweden)
router.use('/en/new-member(.*)', redirectEnLanguageToSweden)

serverSideRedirects.forEach(({ from, to }) => {
  router.use(from, permanentRedirect(to))
})

app.use(
  bodyParser({
    extendTypes: { json: ['application/csp-report'] },
  }),
)

if (process.env.USE_HELMET === 'true') {
  appLogger.info('Using helmet and strict CSP ⛑')
  app.use(helmet)
} else if (process.env.NODE_ENV !== 'development') {
  appLogger.warn(
    'NOT using any helmet or CSP headers. This is not recommended for production usage',
  )
}
app.use(setRequestUuidMiddleware)
app.use(setLoggerMiddleware)
app.use(logRequestMiddleware)
app.use(inCaseOfEmergency)
if (process.env.USE_AUTH) {
  appLogger.info(
    `Protecting server using basic auth with user ${process.env.AUTH_NAME} 💂‍`,
  )
  const basicAuth = require('koa-basic-auth') // tslint:disable-line no-var-requires
  const basicAuthMidleware = basicAuth({
    name: notNullable(process.env.AUTH_NAME),
    pass: notNullable(process.env.AUTH_PASS),
  })
  app.use(basicAuthMidleware)
} else {
  appLogger.info('Not using any auth, server is open to the public')
}

router.get('/panic-room', async () => {
  throw new Error(
    'Entered the panic room, this is an expected error. Carry on 👜',
  )
})

router.post('/new-member/_report-csp-violation', (ctx) => {
  ;(ctx.state.getLogger('cspViolation') as Logger).error(
    `CSP VIOLATION: ${JSON.stringify(ctx.request.body)}`,
  )
  ctx.status = 204
})

router.post(
  LOCALE_PATH_PATTERN + '/new-member/connect-payment/adyen-callback',
  handleAdyen3dsPostRedirect,
)

reactPageRoutes.forEach((route) => {
  router.get(route.serverPath ?? route.path, getPage)
})

app.use(router.middleware())

app.listen(getPort(), () => {
  appLogger.info(`Server started 🚀 listening on port ${getPort()}`)
})

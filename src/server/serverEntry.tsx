import 'source-map-support/register'

import * as Sentry from '@sentry/node'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { Logger } from 'typescript-logging'
import proxy from 'koa-server-http-proxy'
import { notNullable } from 'utils/nullables'
import { sentryConfig } from 'utils/sentry-server'
import { serverSideRoutes } from '../routes'
import { LOCALE_PATH_PATTERN } from '../shared/locale'
import { handleAdyen3dsPostRedirect } from './adyenMiddleware'
import { GIRAFFE_HOST, GIRAFFE_WS_ENDPOINT } from './config'
import { appLogger } from './logging'
import { configureAssets } from './middleware/assets'
import {
  inCaseOfEmergency,
  logRequestMiddleware,
  setLoggerMiddleware,
  setRequestUuidMiddleware,
} from './middleware/enhancers'
import { helmet } from './middleware/helmet'
import {
  forceHost,
  redirectEmptyLanguageToSweden,
  redirectEnLanguageToSweden,
} from './middleware/redirects'
import { getPage } from './page'

Sentry.init({
  ...sentryConfig(),
  serverName: process.env.HEROKU_DYNO_ID,
  attachStacktrace: true,
})

const getPort = () => (process.env.PORT ? Number(process.env.PORT) : 8040)

const app = new Koa()
const router = new Router()

configureAssets(app)

app.proxy = true
appLogger.info(`Booting server on ${getPort()} 👢`)
appLogger.info(
  `Sentry is ${
    sentryConfig().enabled ? 'enabled' : 'disabled'
  }, with environment "${sentryConfig().environment}"`,
)
appLogger.info(
  `Using giraffe at http:"${GIRAFFE_HOST}" ws:"${GIRAFFE_WS_ENDPOINT}" 🦒`,
)

app.use(
  proxy('/new-member/graphql', {
    target: GIRAFFE_HOST,
    changeOrigin: true,
    pathRewrite: {
      '/new-member/graphql': '/graphql',
    },
  }),
)

if (process.env.FORCE_HOST) {
  appLogger.info(`Forcing host to be ${process.env.FORCE_HOST}`)
  router.use(forceHost({ host: process.env.FORCE_HOST! }))
}

router.use('/new-member(.*)', redirectEmptyLanguageToSweden)
router.use('/en/new-member(.*)', redirectEnLanguageToSweden)

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
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const basicAuth = require('koa-basic-auth')
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

serverSideRoutes.forEach((route) => {
  router.get(route.path, getPage(route))
})

app.use(router.middleware())

app.listen(getPort(), () => {
  appLogger.info(`Server started 🚀 listening on port ${getPort()}`)
})

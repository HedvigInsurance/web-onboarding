import { createKoaServer } from '@hedviginsurance/web-survival-kit' // tslint:disable-line ordered-imports
import 'source-map-support/register'
import { reactPageRoutes } from './routes'
import { appLogger } from './server/logging'
import {
  inCaseOfEmergency,
  logRequestMiddleware,
  setLoggerMiddleware,
  setRequestUuidMiddleware,
} from './server/middleware/enhancers'
import { getPage } from './server/page'
import { getGiraffeEndpoint, getGiraffeWsEndpoint } from './utils/apolloClient'
import { notNullable } from './utils/nullables'

const getPort = () => (process.env.PORT ? Number(process.env.PORT) : 8080)

appLogger.info(`Booting server on ${getPort()} 👢`)
appLogger.info(
  `Using giraffe at batchHttp:"${getGiraffeEndpoint()}" ws:"${getGiraffeWsEndpoint()}" 🦒`,
)

const server = createKoaServer({
  publicPath: '/assets',
  assetLocation: __dirname + '/assets',
})
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

reactPageRoutes.forEach((route) => {
  server.router.get(route.path, getPage)
})

server.app.listen(getPort(), () => {
  appLogger.info(`Server started 🚀 listening on port ${getPort()}`)
})

import 'source-map-support/register'
import { createKoaServer } from '@hedviginsurance/web-survival-kit' // tslint:disable-line ordered-imports
import { reactPageRoutes } from './routes'
import { getPage } from './server/page'
import { notNullable } from './utils/nullables'

const getPort = () => (process.env.PORT ? Number(process.env.PORT) : 8080)

console.log(`Booting server on ${getPort()} 👢`) // tslint:disable-line no-console

const server = createKoaServer({
  publicPath: '/assets',
  assetLocation: __dirname + '/assets',
})

if (process.env.USE_AUTH) {
  // tslint:disable-next-line no-console
  console.log(
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
  // tslint:disable-next-line no-console
  console.log('Not using any auth, server is open to the public')
}

reactPageRoutes.forEach((route) => {
  server.router.get(route.path, getPage)
})

server.app.listen(getPort(), () => {
  console.log(`Server started 🚀 listening on port ${getPort()}`) // tslint:disable-line no-console
})

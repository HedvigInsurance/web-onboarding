import path from 'path'
import Koa from 'koa'
import mount from 'koa-mount'
import proxy from 'koa-server-http-proxy'
import koaStatic from 'koa-static'

export const configureAssets = (app: Koa) => {
  const rootDir = path.resolve(__dirname, '../../..')
  app.use(
    mount(
      '/new-member-assets',
      koaStatic(path.resolve(rootDir, 'assets'), {
        maxage: 1000 * 86400 * 365,
        brotli: true,
        gzip: true,
      }),
    ),
  )

  if (process.env.NODE_ENV === 'production') {
    app.use(
      mount(
        '/new-member-assets',
        koaStatic(path.resolve(rootDir, 'build/new-member-assets'), {
          maxage: 1000 * 86400 * 365,
          brotli: true,
          gzip: true,
        }),
      ),
    )
  } else {
    app.use(
      proxy('/new-member-assets', {
        target: 'http://localhost:8041',
      }),
    )
    app.use(
      proxy('/sockjs-node', {
        target: 'http://localhost:8041',
        ws: true,
      }),
    )
  }
}

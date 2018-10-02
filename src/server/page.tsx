import { getScriptLocation } from '@hedviginsurance/web-survival-kit'
import { renderStylesToString } from 'emotion-server'
import * as Koa from 'koa'
import * as path from 'path'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, StaticRouterContext } from 'react-router'
import { App } from '../App'
import { createSession } from '../utils/sessionStorage'
import { ServerCookieStorage } from '../utils/storage/ServerCookieStorage'

const scriptLocation = getScriptLocation({
  statsLocation: path.resolve(__dirname, 'assets'),
  webpackPublicPath: process.env.WEBPACK_PUBLIC_PATH || '',
})
const template = (body: string) => `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Example web app</title>
</head>
<body>
  <div id="react-root">${body}</div>
  
  <script src="${scriptLocation}"></script>
</body>
</html>
`

export const getPage: Koa.Middleware = async (ctx) => {
  const routerContext: StaticRouterContext = {}
  const reactBody = renderStylesToString(
    renderToString(
      <StaticRouter location={ctx.request.originalUrl} context={routerContext}>
        <App session={createSession(new ServerCookieStorage(ctx))} />
      </StaticRouter>,
    ),
  )

  if (routerContext.url) {
    ctx.redirect(routerContext.url)
    return
  }

  ctx.body = template(reactBody)
}

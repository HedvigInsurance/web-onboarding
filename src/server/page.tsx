import { getScriptLocation } from '@hedviginsurance/web-survival-kit'
import { renderStylesToString } from 'emotion-server'
import * as Koa from 'koa'
import * as path from 'path'
import * as React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { renderToString } from 'react-dom/server'
import { StaticRouter, StaticRouterContext } from 'react-router'
import { App } from '../App'
import { createApolloClient, getGiraffeEndpoint } from '../utils/apolloClient'
import { createSession } from '../utils/sessionStorage'
import { ServerCookieStorage } from '../utils/storage/ServerCookieStorage'

const scriptLocation = getScriptLocation({
  statsLocation: path.resolve(__dirname, 'assets'),
  webpackPublicPath: process.env.WEBPACK_PUBLIC_PATH || '',
})
const template = (body: string, initialState: any) => `
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
  
  <script>
    window.getGiraffeEndpoint = ${JSON.stringify(getGiraffeEndpoint())}
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
  </script>
  <script src="${scriptLocation}"></script>
</body>
</html>
`

export const getPage: Koa.Middleware = async (ctx) => {
  const apolloClient = createApolloClient(true)
  const routerContext: StaticRouterContext = {}
  const serverApp = (
    <StaticRouter location={ctx.request.originalUrl} context={routerContext}>
      <ApolloProvider client={apolloClient}>
        <App session={createSession(new ServerCookieStorage(ctx))} />
      </ApolloProvider>
    </StaticRouter>
  )
  await getDataFromTree(serverApp)
  const reactBody = renderStylesToString(renderToString(serverApp))

  if (routerContext.url) {
    ctx.redirect(routerContext.url)
    return
  }

  ctx.body = template(reactBody, apolloClient.extract())
}

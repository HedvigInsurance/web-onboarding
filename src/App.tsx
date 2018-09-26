import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route } from 'react-router-dom'
import { reactPageRoutes } from './routes'
import { GlobalCss } from './utils/globalStyles'

export const App: React.SFC = () => (
  <>
    <GlobalCss />
    {reactPageRoutes.map(({ path, exact, Component }) => (
      <Route key={path} exact={exact} component={Component} />
    ))}
  </>
)

export const HotApp = hot(module)(App)

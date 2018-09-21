import * as React from 'react'
import { reactPageRoutes } from './routes'
import { Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'

export const App: React.SFC = () => (
  <>
    {reactPageRoutes.map(({ path, exact, Component }) => (
      <Route key={path} exact={exact} component={Component} />
    ))}
  </>
)

export const HotApp = hot(module)(App)

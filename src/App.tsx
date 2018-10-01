import { Provider } from 'constate'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route } from 'react-router-dom'
import { reactPageRoutes } from './routes'
import { IsomorphicSessionStorage } from './utils/cookieStorage'
import { GlobalCss } from './utils/globalStyles'

export interface StorageState {
  session: IsomorphicSessionStorage<{}>
}

export interface WithStorageProps {
  storage: StorageState
}

export const App: React.SFC<StorageState> = ({ session }) => (
  <>
    <GlobalCss />
    <Provider<WithStorageProps> initialState={{ storage: { session } }}>
      {reactPageRoutes.map(({ path, exact, Component }) => (
        <Route key={path} path={path} exact={exact} component={Component} />
      ))}
    </Provider>
  </>
)

export const HotApp = hot(module)(App)

import { Project, TranslationsProvider } from '@hedviginsurance/textkeyfy'
import { Provider } from 'constate'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route } from 'react-router-dom'
import { reactPageRoutes } from './routes'
import { GlobalCss } from './utils/globalStyles'
import { IsomorphicSessionStorage, Session } from './utils/sessionStorage'

export interface StorageState {
  session: IsomorphicSessionStorage<Session>
}

export interface WithStorageProps {
  storage: StorageState
}

export const App: React.SFC<StorageState> = ({ session }) => (
  <>
    <GlobalCss />
    <TranslationsProvider code="sv_SE" project={Project.WebOnboarding}>
      <Provider<WithStorageProps> initialState={{ storage: { session } }}>
        {reactPageRoutes.map(({ path, exact, Component }) => (
          <Route key={path} path={path} exact={exact} component={Component} />
        ))}
      </Provider>
    </TranslationsProvider>
  </>
)

export const HotApp = hot(module)(App)

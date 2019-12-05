import { Project, TranslationsProvider } from '@hedviginsurance/textkeyfy'
import { Provider } from 'constate'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import {
  CurrentLanguage,
  getLanguageIsoCode,
} from './components/utils/CurrentLanguage'
import { reactPageRoutes } from './routes'
import { GlobalCss } from './utils/globalStyles'
import { StorageState, WithStorageProps } from './utils/StorageContainer'

export const App: React.ComponentType<StorageState> = ({
  session,
  dontPanicSession,
}) => (
  <>
    <GlobalCss />
    <CurrentLanguage>
      {({ currentLanguage }) => (
        <TranslationsProvider
          code={getLanguageIsoCode(currentLanguage)}
          project={Project.WebOnboarding}
        >
          <Provider<WithStorageProps>
            initialState={{ storage: { session, dontPanicSession } }}
            devtools={process.env.NODE_ENV !== 'production'}
          >
            <Switch>
              {reactPageRoutes.map(({ path, exact, Component, render }) => (
                <Route
                  key={path}
                  path={path}
                  exact={exact}
                  component={Component}
                  render={render}
                />
              ))}
            </Switch>
          </Provider>
        </TranslationsProvider>
      )}
    </CurrentLanguage>
  </>
)

export const HotApp = hot(module)(App)

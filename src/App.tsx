import { Project, TranslationsProvider } from '@hedviginsurance/textkeyfy'
import { CurrentLocale, getLocaleIsoCode } from 'components/utils/CurrentLocale'
import { Provider } from 'constate'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import { AppTokenRetrival } from './AppTokenRetrival'
import { reactPageRoutes } from './routes'
import { GlobalCss } from './utils/globalStyles'
import {
  StorageContext,
  StorageState,
  WithStorageProps,
} from './utils/StorageContainer'

export const App: React.ComponentType<StorageState> = ({ session }) => (
  <>
    <GlobalCss />
    <CurrentLocale>
      {({ currentLocale }) => (
        <TranslationsProvider
          code={getLocaleIsoCode(currentLocale)}
          project={Project.WebOnboarding}
        >
          <Provider<WithStorageProps>
            initialState={{ storage: { session } }}
            devtools={process.env.NODE_ENV !== 'production'}
          >
            <StorageContext.Provider value={{ session }}>
              <AppTokenRetrival>
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
              </AppTokenRetrival>
            </StorageContext.Provider>
          </Provider>
        </TranslationsProvider>
      )}
    </CurrentLocale>
  </>
)

export const HotApp = hot(module)(App)

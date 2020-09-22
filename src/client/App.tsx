import {
  getLocaleIsoCode,
  useCurrentLocale,
} from 'components/utils/CurrentLocale'
import { Provider } from 'constate'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import { reactPageRoutes } from '../routes'
import { AppTokenRetrieval } from './utils/AppTokenRetrieval'
import { GlobalCss } from './utils/globalStyles'
import { TextKeyProvider } from 'utils/textKeys'
import { Intercom } from './utils/Intercom'
import {
  StorageContext,
  StorageState,
  WithStorageProps,
} from './utils/StorageContainer'

export const App: React.ComponentType<StorageState> = ({ session }) => {
  const currentLocale = useCurrentLocale()

  return (
    <>
      <GlobalCss />
      <TextKeyProvider locale={getLocaleIsoCode(currentLocale)}>
        <Provider<WithStorageProps>
          initialState={{ storage: { session } }}
          devtools={process.env.NODE_ENV !== 'production'}
        >
          <StorageContext.Provider value={{ session }}>
            <AppTokenRetrieval>
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
            </AppTokenRetrieval>
          </StorageContext.Provider>
        </Provider>
      </TextKeyProvider>
      <Intercom />
    </>
  )
}

export const HotApp = hot(module)(App)

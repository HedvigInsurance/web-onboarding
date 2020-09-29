import {
  getLocaleIsoCode,
  useCurrentLocale,
} from 'components/utils/CurrentLocale'
import { Provider } from 'constate'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, useHistory } from 'react-router-dom'
import { TextKeyProvider } from 'utils/textKeys'
import { reactPageRoutes } from '../routes'
import { AppTokenRetrieval } from './utils/AppTokenRetrieval'
import { GlobalCss } from './utils/globalStyles'
import { Intercom } from './utils/Intercom'
import {
  StorageContext,
  StorageState,
  WithStorageProps,
} from './utils/StorageContainer'

export const App: React.ComponentType<StorageState> = ({ session }) => {
  const currentLocale = useCurrentLocale()
  const history = useHistory()

  return (
    <>
      <GlobalCss />
      <TextKeyProvider
        locale={getLocaleIsoCode(currentLocale)}
        locationSearch={history.location.search}
      >
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

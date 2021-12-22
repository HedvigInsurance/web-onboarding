import { Provider } from 'constate'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, useHistory } from 'react-router-dom'
import { TextKeyProvider } from 'utils/textKeys'
import { routes } from '../routes'
import { AppTokenRetrieval } from './utils/AppTokenRetrieval'
import { GlobalCss } from './utils/globalStyles'
import { Intercom } from './utils/Intercom'
import {
  StorageContext,
  StorageState,
  WithStorageProps,
} from './utils/StorageContainer'
import { useCurrentLocale } from './l10n/useCurrentLocale'
import { useGTMTracking } from './utils/tracking/gtm'

export const App: React.ComponentType<StorageState> = ({ session }) => {
  const { isoLocale } = useCurrentLocale()
  const history = useHistory()
  useGTMTracking()

  return (
    <>
      <GlobalCss />
      <TextKeyProvider
        locale={isoLocale}
        locationSearch={history.location.search}
      >
        <Provider<WithStorageProps>
          initialState={{ storage: { session } }}
          devtools={process.env.NODE_ENV !== 'production'}
        >
          <StorageContext.Provider value={{ session }}>
            <AppTokenRetrieval>
              <Switch>
                {routes.map(({ path, clientRouteData }) => {
                  if (!clientRouteData || !(typeof path === 'string')) {
                    return null
                  }
                  const { exact, Component, render } = clientRouteData
                  return (
                    <Route
                      key={path}
                      path={path}
                      exact={exact}
                      component={Component}
                      render={render}
                    />
                  )
                })}
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

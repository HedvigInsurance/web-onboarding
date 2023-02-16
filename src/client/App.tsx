import { Provider } from 'constate'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, useHistory } from 'react-router-dom'
import { useTrackNewSiteExperiment } from 'utils/tracking/hooks/useTrackNewSiteExperiment'
import { Feature } from 'shared/clientConfig'
import { routes } from '../routes'
import { TextKeyProvider } from './utils/textKeys'
import { useTrackPageViewEvent } from './utils/tracking/hooks/useTrackPageViewEvent'
import { AppTokenRetrieval } from './utils/AppTokenRetrieval'
import { GlobalCss } from './utils/globalStyles'
import { Intercom } from './utils/Intercom'
import {
  StorageContext,
  StorageState,
  WithStorageProps,
} from './utils/StorageContainer'
import { useCurrentLocale } from './l10n/useCurrentLocale'
import { useFeature } from './utils/hooks/useFeature'

const isProductionEnvironment =
  window.hedvigClientConfig.appEnvironment === 'production'

export const App: React.ComponentType<StorageState> = ({ session }) => {
  useTrackPageViewEvent()
  useTrackNewSiteExperiment()
  const [intercomEnabled] = useFeature([Feature.INTERCOM])

  const { isoLocale } = useCurrentLocale()
  const history = useHistory()

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
                {routes
                  .filter(
                    ({ isHiddenInProd }) =>
                      !(isProductionEnvironment && isHiddenInProd),
                  )
                  .map(({ path, clientRouteData }) => {
                    if (!clientRouteData || !(typeof path === 'string')) {
                      return
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
      {intercomEnabled && <Intercom />}
    </>
  )
}

export const HotApp = hot(module)(App)

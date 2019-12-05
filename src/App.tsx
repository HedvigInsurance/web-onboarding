import { Project, TranslationsProvider } from '@hedviginsurance/textkeyfy'
import { Provider } from 'constate'
import { EmbarkRoot } from 'pages/Embark'
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
              <Route
                path="/new-member/:name?/:id?"
                render={({ match }) => {
                  const getProps = () => {
                    switch (match.params.name) {
                      case 'new':
                        return {
                          baseUrl: '/new-member/new',
                          name: 'Web Onboarding - Swedish Needer',
                        }
                      case 'switch':
                        return {
                          baseUrl: '/new-member/switch',
                          name: 'Web Onboarding - Swedish Switcher',
                        }
                    }

                    return null
                  }

                  const props = getProps()

                  return (
                    <EmbarkRoot
                      name={(props && props.name) || undefined}
                      baseUrl={(props && props.baseUrl) || undefined}
                      showLanding={!props}
                    />
                  )
                }}
              />
              {reactPageRoutes.map(({ path, exact, Component }) => (
                <Route
                  key={path}
                  path={path}
                  exact={exact}
                  component={Component}
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

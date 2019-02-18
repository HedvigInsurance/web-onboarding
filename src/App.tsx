import { Project, TranslationsProvider } from '@hedviginsurance/textkeyfy'
import { Provider } from 'constate'
import * as React from 'react'
import { hot } from 'react-hot-loader'
import { matchPath, RouteComponentProps } from 'react-router'
import { Route, Switch, withRouter } from 'react-router-dom'
import { reactPageRoutes } from './routes'
import { GlobalCss } from './utils/globalStyles'
import { StorageState, WithStorageProps } from './utils/StorageContainer'

const getLanguageIsoCode = (path: string) => {
  const match = matchPath<WithLanguage>(path, { path: '/:language(en)?/*' })
  switch (match && match.params.language) {
    case 'en':
      return 'en_SE'
    case '':
    default:
      return 'sv_SE'
  }
}

interface WithLanguage {
  language: string
}

export const App: React.ComponentType<StorageState> = withRouter<
  RouteComponentProps<WithLanguage> & StorageState
>(({ session, dontPanicSession, location }) => (
  <>
    <GlobalCss />
    <TranslationsProvider
      code={getLanguageIsoCode(location.pathname)}
      project={Project.WebOnboarding}
    >
      <Provider<WithStorageProps>
        initialState={{ storage: { session, dontPanicSession } }}
        devtools={process.env.NODE_ENV !== 'production'}
      >
        <Switch>
          {reactPageRoutes.map(({ path, exact, Component }) => (
            <Route key={path} path={path} exact={exact} component={Component} />
          ))}
        </Switch>
      </Provider>
    </TranslationsProvider>
  </>
))

export const HotApp = hot(module)(App)

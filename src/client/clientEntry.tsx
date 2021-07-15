import { ApolloProvider } from '@apollo/react-hooks'
import { CookieStorage } from 'cookie-storage'
import { isMobile } from 'is-mobile'
import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { PageTracker } from 'containers/PageTracker'
import { HotApp } from 'App'
import {
  createSession,
  SavingCookieStorage,
  Session,
} from '../shared/sessionStorage'
import { apolloClient } from './apolloClient'
import { MobileContext } from './utils/mobileContext'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  integrations: [new Integrations.BrowserTracing()],
  enabled: Boolean(process.env.SENTRY_DSN),
  release: process.env.SENTRY_RELEASE,
})

const session = createSession<Session>(
  new SavingCookieStorage(new CookieStorage({ expires: null, path: '/' })),
)

window.setInterval(() => session.keepAlive(), 5 * 1000)

ReactDOM.render(
  <BrowserRouter>
    <PageTracker>
      <HelmetProvider>
        <ApolloProvider client={apolloClient!.client}>
          <MobileContext.Provider value={isMobile({ tablet: true })}>
            <HotApp session={session} />
          </MobileContext.Provider>
        </ApolloProvider>
      </HelmetProvider>
    </PageTracker>
  </BrowserRouter>,
  document.getElementById('react-root'),
)

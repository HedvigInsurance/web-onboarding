import { ApolloProvider } from '@apollo/react-hooks'
import { CookieStorage } from 'cookie-storage'
import { isMobile } from 'is-mobile'
import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import * as Datadog from 'utils/datadog'
import { PageTracker } from 'containers/PageTracker'
import { HotApp } from 'App'
import {
  createSession,
  SavingCookieStorage,
  Session,
} from '../shared/sessionStorage'
import { MobileContext } from './utils/mobileContext'

Datadog.initRum()

import { apolloClient } from './apolloClient'

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

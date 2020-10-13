import { ApolloProvider } from '@apollo/react-hooks'
import { HotApp } from 'App'
import { PageTracker } from 'containers/PageTracker'
import { CookieStorage } from 'cookie-storage'
import { isMobile } from 'is-mobile'
import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import {
  createSession,
  SavingCookieStorage,
  Session,
} from '../shared/sessionStorage'
import { apolloClient } from './apolloClient'
import { MobileContext } from './utils/mobileContext'

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

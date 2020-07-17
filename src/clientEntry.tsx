import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { PageTracker } from 'containers/PageTracker'
import { CookieStorage } from 'cookie-storage'
import { isMobile } from 'is-mobile'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { HotApp } from './App'
import { apolloClient } from './client/apolloClient'
import { MobileContext } from './utils/mobileContext'
import {
  createSession,
  SavingCookieStorage,
  Session,
} from './utils/sessionStorage'

const session = createSession<Session>(
  new SavingCookieStorage(new CookieStorage({ expires: null, path: '/' })),
)

window.setInterval(() => session.keepAlive(), 5 * 1000)

ReactDOM.render(
  <BrowserRouter>
    <PageTracker>
      <HelmetProvider>
        <ApolloHooksProvider client={apolloClient!.client}>
          <ApolloProvider client={apolloClient!.client!}>
            <MobileContext.Provider value={isMobile({ tablet: true })}>
              <HotApp session={session} />
            </MobileContext.Provider>
          </ApolloProvider>
        </ApolloHooksProvider>
      </HelmetProvider>
    </PageTracker>
  </BrowserRouter>,
  document.getElementById('react-root'),
)

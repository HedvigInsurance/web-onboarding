import { ApolloProvider } from '@apollo/react-common'
import { CookieStorage } from 'cookie-storage'
import { isMobile } from 'is-mobile'
import * as React from 'react'
import { ApolloProvider as LegacyApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { HotApp } from './App'
import { apolloClient } from './client/apolloClient'
import { PageTracker } from './components/PageTracker'
import { MobileContext } from './utils/mobileContext'
import {
  createSession,
  SavingCookieStorage,
  Session,
} from './utils/sessionStorage'

const session = createSession<Session>(
  new SavingCookieStorage(new CookieStorage({ expires: null, path: '/' })),
)
const dontPanicSession = createSession<any>(
  new SavingCookieStorage(new CookieStorage({ expires: null, path: '/' })),
  '_hv_dp',
)

window.setInterval(() => session.keepAlive(), 5 * 1000)

ReactDOM.render(
  <BrowserRouter>
    <PageTracker>
      <HelmetProvider>
        <ApolloProvider client={apolloClient!.client!}>
          <LegacyApolloProvider client={apolloClient!.client!}>
            <MobileContext.Provider value={isMobile({ tablet: true })}>
              <HotApp session={session} dontPanicSession={dontPanicSession} />
            </MobileContext.Provider>
          </LegacyApolloProvider>
        </ApolloProvider>
      </HelmetProvider>
    </PageTracker>
  </BrowserRouter>,
  document.getElementById('react-root'),
)

import { ApolloProvider } from '@apollo/react-common'
import { PageTracker } from 'containers/PageTracker'
import { CookieStorage } from 'cookie-storage'
import { isMobile } from 'is-mobile'
import * as React from 'react'
import { ApolloProvider as LegacyApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
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

ReactDOM.render(
  <BrowserRouter>
    <PageTracker>
      <HelmetProvider>
        <ApolloProvider client={apolloClient!.client!}>
          <LegacyApolloProvider client={apolloClient!.client!}>
            <MobileContext.Provider value={isMobile({ tablet: true })}>
              <HotApp session={session} />
            </MobileContext.Provider>
          </LegacyApolloProvider>
        </ApolloProvider>
      </HelmetProvider>
    </PageTracker>
  </BrowserRouter>,
  document.getElementById('react-root'),
)

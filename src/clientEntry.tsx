import { CookieStorage } from 'cookie-storage'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { HotApp } from './App'
import { apolloClient } from './client/apolloClient'
import { PageTracker } from './components/PageTracker'
import { createSession } from './utils/sessionStorage'

ReactDOM.hydrate(
  <BrowserRouter>
    <PageTracker>
      <HelmetProvider>
        <ApolloProvider client={apolloClient!.client!}>
          <HotApp
            session={createSession(new CookieStorage({ expires: null }))}
          />
        </ApolloProvider>
      </HelmetProvider>
    </PageTracker>
  </BrowserRouter>,
  document.getElementById('react-root'),
)

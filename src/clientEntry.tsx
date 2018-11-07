import { CookieStorage } from 'cookie-storage'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { HotApp } from './App'
import { apolloClient } from './client/apolloClient'
import { PageTracker } from './components/PageTracker'
import { createSession, Session } from './utils/sessionStorage'

const session = createSession<Session>(
  new CookieStorage({ expires: null, path: '/new-member' }),
)

window.setInterval(() => session.keepAlive(), 5 * 1000)

ReactDOM.hydrate(
  <BrowserRouter>
    <PageTracker>
      <HelmetProvider>
        <ApolloProvider client={apolloClient!.client!}>
          <HotApp session={session} />
        </ApolloProvider>
      </HelmetProvider>
    </PageTracker>
  </BrowserRouter>,
  document.getElementById('react-root'),
)

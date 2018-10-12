import { CookieStorage } from 'cookie-storage'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { HotApp } from './App'
import { apolloClient } from './client/apolloClient'
import { createSession } from './utils/sessionStorage'

ReactDOM.hydrate(
  <BrowserRouter>
    <HelmetProvider>
      <ApolloProvider client={apolloClient!.client!}>
        <HotApp session={createSession(new CookieStorage({ expires: null }))} />
      </ApolloProvider>
    </HelmetProvider>
  </BrowserRouter>,
  document.getElementById('react-root'),
)

import { CookieStorage } from 'cookie-storage'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { HotApp } from './App'
import { createApolloClient } from './utils/apolloClient'
import { createSession } from './utils/sessionStorage'

ReactDOM.hydrate(
  <BrowserRouter>
    <ApolloProvider client={createApolloClient(false)}>
      <HotApp session={createSession(new CookieStorage({ expires: null }))} />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('react-root'),
)

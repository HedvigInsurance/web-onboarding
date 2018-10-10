import { ApolloSubscriptionContext } from 'client/ApolloSubscriptionContext'
import { CookieStorage } from 'cookie-storage'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { HotApp } from './App'
import { createClientApolloClient } from './utils/apolloClient'
import { createSession } from './utils/sessionStorage'

ReactDOM.hydrate(
  <BrowserRouter>
<HelmetProvider>
    <ApolloSubscriptionContext.Provider value={createClientApolloClient()}>
      <ApolloSubscriptionContext.Consumer>
        {(subscriptionContext) => (
          <ApolloProvider client={subscriptionContext!.apolloClient!}>
            <HotApp
              session={createSession(new CookieStorage({ expires: null }))}
            />
          </ApolloProvider>
        )}
      </ApolloSubscriptionContext.Consumer>
    </ApolloSubscriptionContext.Provider>
</HelmetProvider>
  </BrowserRouter>,
  document.getElementById('react-root'),
)

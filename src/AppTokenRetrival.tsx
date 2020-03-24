import * as React from 'react'

import { Mount } from 'react-lifecycle-components'
import { apolloClient } from './client/apolloClient'
import { StorageContainer } from './utils/StorageContainer'

export const AppTokenRetrival = ({ children }) => (
  <StorageContainer>
    {(storageState) => (
      <Mount
        on={() => {
          if (location.hash.includes('token=')) {
            const token = location.hash.replace('#token=', '')
            console.log('setting token to', token)
            apolloClient!.subscriptionClient.close(true, true)
            storageState.setToken(token)
          }
        }}
      >
        {children}
      </Mount>
    )}
  </StorageContainer>
)

import React from 'react'

import { Mount } from 'react-lifecycle-components'
import { useLocation } from 'react-router'

import { apolloClient } from '../apolloClient'
import { StorageContainer } from './StorageContainer'

export const AppTokenRetrieval: React.FC = ({ children }) => {
  const location = useLocation()

  return (
    <StorageContainer>
      {(storageState) => (
        <Mount
          on={() => {
            if (location.hash.includes('#token')) {
              const token = location.hash.replace(/^#token=/, '')

              storageState.setToken(decodeURIComponent(token))
              apolloClient!.subscriptionClient.close(true, true)
            }
          }}
        >
          {children}
        </Mount>
      )}
    </StorageContainer>
  )
}

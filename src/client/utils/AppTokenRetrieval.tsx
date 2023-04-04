import React from 'react'

import { Mount } from 'react-lifecycle-components'
import { useLocation } from 'react-router'

import { getAuthorizationHeader } from 'utils/authorization'
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
              const token = decodeURIComponent(
                location.hash.replace(/^#token=/, ''),
              )

              storageState.setToken(token)
              apolloClient!.subscriptionClient.close(true, true)
              apolloClient!.httpLink.options.headers.authorization = getAuthorizationHeader(
                token,
              )
            }
          }}
        >
          {children}
        </Mount>
      )}
    </StorageContainer>
  )
}

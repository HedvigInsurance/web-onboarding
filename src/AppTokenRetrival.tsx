import * as React from 'react'

import { Mount } from 'react-lifecycle-components'
import { useLocation } from 'react-router'

import { apolloClient } from './client/apolloClient'
import { StorageContainer } from './utils/StorageContainer'

export const AppTokenRetrival: React.FC = ({ children }) => {
  const location = useLocation()

  return (
    <StorageContainer>
      {(storageState) => (
        <Mount
          on={() => {
            if (location.hash.includes('token')) {
              const params: { [string]: string } = location.hash
                .substring(1)
                .split('&')
                .reduce((acc, curr) => {
                  const param = curr.split('=')
                  return { ...acc, [param[0]]: param[1] }
                }, {})

              storageState.setToken(params.token)
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

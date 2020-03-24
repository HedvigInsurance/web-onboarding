import * as React from 'react'

import { Mount } from 'react-lifecycle-components'
import { useLocation } from 'react-router'

import { apolloClient } from './client/apolloClient'
import { StorageContainer } from './utils/StorageContainer'

export const AppTokenRetrival = ({ children }) => {
  const location = useLocation()

  return (
    <StorageContainer>
      {(storageState) => (
        <Mount
          on={() => {
            if (location.hash.includes('token')) {
              var params = {}

              location.hash
                .substring(1)
                .split('&')
                .map((hk) => {
                  let param = hk.split('=')
                  params[param[0]] = param[1]
                })

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

import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { StorageContainer } from '../utils/StorageContainer'

export const SessionTokenGuard: React.SFC = ({ children }) => (
  <StorageContainer>
    {(storageState) =>
      storageState.session.getSession() &&
      storageState.session.getSession()!.token ? (
        <>{children}</>
      ) : (
        <Redirect to="/new-member/hedvig" />
      )
    }
  </StorageContainer>
)

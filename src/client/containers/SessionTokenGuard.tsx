import React from 'react'
import { Redirect } from 'react-router-dom'
import { CurrentLocale } from '../components/utils/CurrentLocale'
import { StorageContainer } from '../utils/StorageContainer'

export const SessionTokenGuard: React.SFC = ({ children }) => (
  <StorageContainer>
    {(storageState) =>
      storageState.session.getSession()?.token ? (
        <>{children}</>
      ) : (
        <CurrentLocale>
          {({ currentLocale }) => (
            <Redirect to={`/${currentLocale}/new-member`} />
          )}
        </CurrentLocale>
      )
    }
  </StorageContainer>
)

import React from 'react'
import { Redirect } from 'react-router-dom'
import { CurrentLocale } from '../components/utils/CurrentLocale'
import { StorageContainer } from '../utils/StorageContainer'

type SessionTokenGuardProps = {
  children: React.ReactNode
  disable: boolean
}

export const SessionTokenGuard = ({
  children,
  disable,
}: SessionTokenGuardProps) => (
  <StorageContainer>
    {(storageState) =>
      storageState.session.getSession()?.token || disable ? (
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

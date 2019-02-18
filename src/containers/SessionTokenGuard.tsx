import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { CurrentLanguage } from '../components/utils/CurrentLanguage'
import { StorageContainer } from '../utils/StorageContainer'

export const SessionTokenGuard: React.SFC = ({ children }) => (
  <StorageContainer>
    {(storageState) =>
      storageState.session.getSession() &&
      storageState.session.getSession()!.token ? (
        <>{children}</>
      ) : (
        <CurrentLanguage>
          {({ currentLanguage }) => (
            <Redirect
              to={`/${currentLanguage &&
                currentLanguage + '/'}new-member/hedvig`}
            />
          )}
        </CurrentLanguage>
      )
    }
  </StorageContainer>
)

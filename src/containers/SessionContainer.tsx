import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import { Mount } from 'react-lifecycle-components'
import { apolloClient } from '../client/apolloClient'
import { StorageContainer } from '../utils/StorageContainer'

export const CREATE_SESSION_TOKEN_MUTATION: DocumentNode = gql`
  mutation CreateSessionToken {
    createSession
  }
`

interface SessionContainerProps {
  children: (token: string | null) => React.ReactNode
}

export const SessionContainer: React.SFC<SessionContainerProps> = ({
  children,
}) => (
  <StorageContainer>
    {(storageState) => (
      <Mutation<{ createSession: string }, void>
        mutation={CREATE_SESSION_TOKEN_MUTATION}
      >
        {(createSession, createSessionProps) => (
          <Mount
            on={() => {
              if (
                !storageState.session.getSession()!.token &&
                !createSessionProps.called
              ) {
                createSession({
                  update: (_, { data }) => {
                    if (data && data.createSession) {
                      storageState.setToken(data.createSession)
                      // async magic to let apollo reconnect after session has been updated
                      setTimeout(() => {
                        apolloClient!.subscriptionClient!.close(true, true)
                      }, 0)
                    }
                  },
                })
              }
            }}
          >
            {children(storageState.session.getSession()!.token || null)}
          </Mount>
        )}
      </Mutation>
    )}
  </StorageContainer>
)

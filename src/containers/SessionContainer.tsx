import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import { Mount } from 'react-lifecycle-components'
import { apolloClient } from '../client/apolloClient'
import { StorageContainer } from '../utils/StorageContainer'
import { IdentifyAction } from '../utils/tracking'

export const CREATE_SESSION_TOKEN_MUTATION: DocumentNode = gql`
  mutation CreateSessionToken {
    createSessionV2 {
      token
      memberId
    }
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
      <Mutation<{ createSessionV2: { token: string; memberId: string } }>
        mutation={CREATE_SESSION_TOKEN_MUTATION}
      >
        {(createSession, createSessionProps) => (
          <IdentifyAction identity={{}}>
            {({ identify }) => (
              <Mount
                on={() => {
                  if (
                    !storageState.session.getSession()!.token &&
                    !createSessionProps.called
                  ) {
                    createSession({
                      update: (_, { data }) => {
                        if (data && data.createSessionV2) {
                          // async magic to let apollo reconnect after session has been updated
                          setTimeout(() => {
                            apolloClient!.subscriptionClient!.close(true, true)
                            storageState.setToken(data.createSessionV2.token)
                            identify({ userId: data.createSessionV2.memberId })
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
          </IdentifyAction>
        )}
      </Mutation>
    )}
  </StorageContainer>
)

import { useApolloClient } from '@apollo/react-hooks'
import {
  getPickedLocaleFromCurrentLocale,
  useCurrentLocale,
} from 'components/utils/CurrentLocale'
import { Locale } from 'data/graphql'
import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import { afterTick } from 'pages/Embark/utils'
import * as React from 'react'
import { Mount } from 'react-lifecycle-components'
import {
  apolloClient as realApolloClient,
  ApolloClientAndSubscriptionClient,
} from '../client/apolloClient'
import { Storage, StorageContainer } from '../utils/StorageContainer'
import { IdentifyAction } from '../utils/tracking'

export const CREATE_SESSION_TOKEN_MUTATION: DocumentNode = gql`
  mutation CreateSessionToken {
    createSessionV2 {
      token
      memberId
    }
  }
`

export const UPDATE_PICKED_LOCALE_MUTATION: DocumentNode = gql`
  mutation UpdatePickedLocale($pickedLocale: Locale!) {
    updatePickedLocale(pickedLocale: $pickedLocale) {
      id
    }
  }
`

interface SessionContainerProps {
  children: (token: string | null) => React.ReactNode
}

export const setupSession = async (
  apolloClient: ApolloClientAndSubscriptionClient,
  storage: Storage,
  pickedLocale: Locale,
): Promise<
  | {
      id: string
      __typename: 'Member'
    }
  | undefined
> => {
  if (!apolloClient) {
    throw new Error('Missing apollo client')
  }

  if (storage.session?.getSession()?.token) {
    return
  }

  const sessionResult = await apolloClient.client.mutate({
    mutation: CREATE_SESSION_TOKEN_MUTATION,
  })
  await afterTick(() => {
    apolloClient!.subscriptionClient.close(true, true)
    storage.setToken(sessionResult.data.createSessionV2.token)
  })
  await apolloClient.client.mutate<object, { pickedLocale: Locale }>({
    mutation: UPDATE_PICKED_LOCALE_MUTATION,
    variables: { pickedLocale },
  })

  return sessionResult.data
}

export const SessionContainer: React.SFC<SessionContainerProps> = ({
  children,
}) => {
  const pickedLocale = getPickedLocaleFromCurrentLocale(useCurrentLocale())
  const [createSessionCalled, setCreateSessionCalled] = React.useState(false)
  const client = useApolloClient()

  return (
    <StorageContainer>
      {(storageState) => (
        <IdentifyAction identity={{}}>
          {({ identify }) => (
            <Mount
              on={async () => {
                if (
                  !storageState.session.getSession()?.token &&
                  !createSessionCalled
                ) {
                  const result = await setupSession(
                    {
                      client,
                      subscriptionClient: realApolloClient!.subscriptionClient,
                    },
                    storageState,
                    pickedLocale,
                  )
                  identify({
                    userId: result?.id,
                  })
                  setCreateSessionCalled(true)
                }
              }}
            >
              {children(storageState.session.getSession()?.token ?? null)}
            </Mount>
          )}
        </IdentifyAction>
      )}
    </StorageContainer>
  )
}

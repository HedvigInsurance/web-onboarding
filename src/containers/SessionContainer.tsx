import { useApolloClient } from '@apollo/react-hooks'
import {
  getPickedLocaleFromCurrentLocale,
  useCurrentLocale,
} from 'components/utils/CurrentLocale'
import { Locale, UpdatePickedLocaleDocument } from 'data/graphql'
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
import { SegmentAnalyticsJs } from 'quepasa'

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
    mutation: UpdatePickedLocaleDocument,
    variables: { pickedLocale },
  })

  try {
    const castedWindow = window as any
    const segment = castedWindow.analytics as SegmentAnalyticsJs
    segment.identify(sessionResult.data.createSessionV2.memberId)
  } catch (err) {}

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
        <Mount
              on={async () => {
                if (
                  !storageState.session.getSession()?.token &&
                  !createSessionCalled
                ) {
                  await setupSession(
                    {
                      client,
                      subscriptionClient: realApolloClient!.subscriptionClient,
                    },
                    storageState,
                    pickedLocale,
                  )
                  setCreateSessionCalled(true)
                }
              }}
            >
              {children(storageState.session.getSession()?.token ?? null)}
            </Mount>
      )}
    </StorageContainer>
  )
}

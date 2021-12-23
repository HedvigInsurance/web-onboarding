import { useApolloClient } from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import { SegmentAnalyticsJs } from 'quepasa'
import React from 'react'
import { Mount } from 'react-lifecycle-components'
import { afterTick } from 'pages/Embark/utils'
import { MemberDocument, UpdatePickedLocaleDocument } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { captureSentryError } from 'utils/sentry-client'
import { Storage, StorageContainer, StorageState } from 'utils/StorageContainer'
import {
  apolloClient as realApolloClient,
  ApolloClientUtils,
} from '../apolloClient'
import { LocaleData } from '../l10n/locales'

type MemberData = {
  __typename: 'Member'
  id: string
}

export const CREATE_SESSION_TOKEN_MUTATION: DocumentNode = gql`
  mutation CreateSessionToken {
    createSessionV2 {
      token
      memberId
    }
  }
`

const CREATE_ACCESS_TOKEN_MUTATION: DocumentNode = gql`
  mutation CreateAccessToken($id: ID!) {
    quoteCart_createAccessToken(id: $id) {
      accessToken
    }
  }
`

interface SessionContainerProps {
  children: (token: string | null) => React.ReactNode
}

export const setupSession = async (
  apolloClientUtils: ApolloClientUtils,
  storage: Storage,
  pickedLocale: LocaleData['isoLocale'],
): Promise<MemberData | undefined> => {
  if (!apolloClientUtils) {
    throw new Error('Missing apollo client')
  }

  if (storage.session?.getSession()?.token) {
    return
  }

  const sessionResult = await apolloClientUtils.client.mutate({
    mutation: CREATE_SESSION_TOKEN_MUTATION,
  })
  await afterTick(() => {
    apolloClientUtils!.subscriptionClient.close(true, true)
    storage.setToken(sessionResult.data.createSessionV2.token)
    apolloClientUtils.httpLink.options.headers.authorization =
      sessionResult.data.createSessionV2.token
  })
  await apolloClientUtils.client.mutate<
    // eslint-disable-next-line  @typescript-eslint/ban-types
    object,
    { pickedLocale: LocaleData['isoLocale'] }
  >({
    mutation: UpdatePickedLocaleDocument,
    variables: { pickedLocale },
  })

  try {
    const castedWindow = window as any
    const segment = castedWindow.analytics as SegmentAnalyticsJs
    segment.identify(sessionResult.data.createSessionV2.memberId)
  } catch (e) {
    captureSentryError(e)
  }

  return sessionResult.data
}

type SetupQuoteCartSessionParams = {
  quoteCartId: string
  apolloClientUtils: ApolloClientUtils
  storage: StorageState
}

export const setupQuoteCartSession = async ({
  quoteCartId,
  apolloClientUtils,
  storage,
}: SetupQuoteCartSessionParams): Promise<string> => {
  if (!apolloClientUtils) {
    throw new Error('Missing apollo client')
  }

  const accessTokenResult = await apolloClientUtils.client.mutate({
    mutation: CREATE_ACCESS_TOKEN_MUTATION,
    variables: { id: quoteCartId },
  })

  await afterTick(() => {
    const accessToken =
      accessTokenResult.data.quoteCart_createAccessToken.accessToken

    apolloClientUtils!.subscriptionClient.close(true, true)
    storage.session.setSession({
      ...((storage.session.getSession() || {}) as any),
      token: accessToken,
    })
    apolloClientUtils.httpLink.options.headers.authorization = accessToken
  })

  const memberResult = await apolloClientUtils.client.query({
    query: MemberDocument,
  })
  const memberId = memberResult.data.member.id

  try {
    const castedWindow = window as any
    const segment = castedWindow.analytics as SegmentAnalyticsJs
    segment.identify(memberId)
  } catch (e) {
    captureSentryError(e)
  }

  return memberId
}

export const SessionContainer: React.SFC<SessionContainerProps> = ({
  children,
}) => {
  const { isoLocale } = useCurrentLocale()

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
                  httpLink: realApolloClient!.httpLink,
                },
                storageState,
                isoLocale,
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

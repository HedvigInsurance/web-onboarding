import { useApolloClient } from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import React from 'react'
import { Mount } from 'react-lifecycle-components'
import { afterTick } from 'pages/Embark/utils'
import {
  MemberDocument,
  UpdatePickedLocaleDocument,
  CreateAccessTokenDocument,
} from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { Storage, StorageContainer, StorageState } from 'utils/StorageContainer'
import { Feature } from 'shared/clientConfig'
import { getAuthorizationHeader } from 'utils/authorization'
import {
  apolloClient as realApolloClient,
  ApolloClientUtils,
} from '../apolloClient'
import { LocaleData } from '../l10n/locales'
import { checkFeature } from '../utils/checkFeature'

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

  if (checkFeature(Feature.QUOTE_CART_API)) {
    return
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
    apolloClientUtils.httpLink.options.headers.authorization = getAuthorizationHeader(
      sessionResult.data.createSessionV2.token,
    )
  })
  await apolloClientUtils.client.mutate<
    // eslint-disable-next-line  @typescript-eslint/ban-types
    object,
    { pickedLocale: LocaleData['isoLocale'] }
  >({
    mutation: UpdatePickedLocaleDocument,
    variables: { pickedLocale },
  })

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
    mutation: CreateAccessTokenDocument,
    variables: { quoteCartId },
  })

  await afterTick(() => {
    const accessToken =
      accessTokenResult.data.quoteCart_createAccessToken.accessToken

    apolloClientUtils!.subscriptionClient.close(true, true)
    storage.session.setSession({
      ...((storage.session.getSession() || {}) as any),
      token: accessToken,
    })
    apolloClientUtils.httpLink.options.headers.authorization = getAuthorizationHeader(
      accessToken,
    )
  })

  const memberResult = await apolloClientUtils.client.query({
    query: MemberDocument,
  })
  const memberId = memberResult.data.member.id

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
                  ...realApolloClient!,
                  client,
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

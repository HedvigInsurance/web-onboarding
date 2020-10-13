import React from 'react'
import { Mount } from 'react-lifecycle-components'
import { useHistory } from 'react-router'
import { ExchangeTokenDocument } from 'data/graphql'
import { apolloClient as realApolloClient } from 'apolloClient'
import { captureSentryError } from 'utils/sentry-client'
import {
  StorageContainer,
  StorageEffects,
  StorageState,
} from 'utils/StorageContainer'

export enum ExchangeTokenRetrievalState {
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
  InvalidToken = 'InvalidToken',
  ExpiredToken = 'ExpiredToken',
  TakingTooLong = 'TakingTooLong',
}

export const ExchangeTokenRetrieval: React.FC<{
  children: (props: {
    exchangeTokenState: ExchangeTokenRetrievalState
    retry: () => void
  }) => React.ReactElement
  apolloClient?: typeof realApolloClient
}> = ({ children, apolloClient = realApolloClient }) => {
  const [hasFinishedFakeLoading, setHasFinishedFakeLoading] = React.useState(
    false,
  )
  const [actualLoadingState, setActualLoadingState] = React.useState(
    ExchangeTokenRetrievalState.Loading,
  )
  const [tokenExchangeState, setTokenExchangeState] = React.useState(
    ExchangeTokenRetrievalState.Loading,
  )
  const { location } = useHistory()

  React.useEffect(() => {
    if (!hasFinishedFakeLoading) {
      return
    }

    setTokenExchangeState(actualLoadingState)
  }, [actualLoadingState, hasFinishedFakeLoading])

  React.useEffect(() => {
    if (hasFinishedFakeLoading) {
      return
    }

    setTimeout(() => {
      setHasFinishedFakeLoading(true)
    }, 3000)
  }, [hasFinishedFakeLoading])

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (tokenExchangeState === ExchangeTokenRetrievalState.Loading) {
        setTokenExchangeState(ExchangeTokenRetrievalState.TakingTooLong)
      }
    }, 15 * 1000)

    return () => window.clearTimeout(timeout)
  }, [tokenExchangeState])

  const performTokenExchange = (
    storageState: StorageState & StorageEffects,
  ) => {
    setHasFinishedFakeLoading(false)
    setActualLoadingState(ExchangeTokenRetrievalState.Loading)
    setTokenExchangeState(ExchangeTokenRetrievalState.Loading)

    if (!storageState.session.getSession()?.token) {
      storageState.setToken('mock token to bypass initial auth layer')
      apolloClient!.subscriptionClient.close(true, true)
    }

    let exchangeToken: string | null
    try {
      exchangeToken = decodeURIComponent(
        location.hash.replace(/^#exchange-token=/, ''),
      )
    } catch (e) {
      captureSentryError(e)
      exchangeToken = null
    }

    if (!location.hash.includes('#exchange-token=') || !exchangeToken) {
      return
    }
    apolloClient!.client
      .mutate({
        mutation: ExchangeTokenDocument,
        variables: { exchangeToken },
      })
      .then(({ data }) => {
        switch (data?.exchangeToken?.__typename) {
          case 'ExchangeTokenSuccessResponse':
            storageState.setToken(data.exchangeToken.token)
            apolloClient!.subscriptionClient.close(true, true)
            setActualLoadingState(ExchangeTokenRetrievalState.Success)
            break
          case 'ExchangeTokenInvalidResponse':
            setActualLoadingState(ExchangeTokenRetrievalState.InvalidToken)
            break
          case 'ExchangeTokenExpiredResponse':
            setActualLoadingState(ExchangeTokenRetrievalState.ExpiredToken)
            break
          default:
            setActualLoadingState(ExchangeTokenRetrievalState.Error)
        }
      })
      .catch((e) => {
        setActualLoadingState(ExchangeTokenRetrievalState.Error)
        throw e
      })
  }

  return (
    <StorageContainer>
      {(storageState) => (
        <Mount
          on={() => {
            performTokenExchange(storageState)
          }}
        >
          {children({
            exchangeTokenState: tokenExchangeState,
            retry: () => performTokenExchange(storageState),
          })}
        </Mount>
      )}
    </StorageContainer>
  )
}

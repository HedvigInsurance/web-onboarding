import { apolloClient } from 'client/apolloClient'
import { ExchangeTokenDocument } from 'data/graphql'
import * as React from 'react'
import { Mount } from 'react-lifecycle-components'
import {
  StorageContainer,
  StorageEffects,
  StorageState,
} from 'utils/StorageContainer'

export enum LoadingState {
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
}

export enum ExchangeTokenRetrievalState {
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
  TakingTooLong = 'TakingTooLong',
}

export const ExchangeTokenRetrieval: React.FC<{
  children: (props: {
    exchangeTokenState: ExchangeTokenRetrievalState
    retry: () => void
  }) => React.ReactElement
}> = ({ children }) => {
  const [hasFinishedFakeLoading, setHasFinishedFakeLoading] = React.useState(
    false,
  )
  const [actualLoadingState, setActualLoadingState] = React.useState(
    LoadingState.Loading,
  )
  const [tokenExchangeState, setTokenExchangeState] = React.useState(
    ExchangeTokenRetrievalState.Loading,
  )

  React.useEffect(() => {
    if (!hasFinishedFakeLoading) {
      return
    }

    if (actualLoadingState === LoadingState.Error) {
      setTokenExchangeState(ExchangeTokenRetrievalState.Error)
    }

    if (actualLoadingState === LoadingState.Success) {
      setTokenExchangeState(ExchangeTokenRetrievalState.Success)
    }
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
        setTokenExchangeState(ExchangeTokenRetrievalState.Error)
      }
    }, 15 * 1000)

    return () => window.clearTimeout(timeout)
  }, [tokenExchangeState])

  const performTokenExchange = (
    storageState: StorageState & StorageEffects,
  ) => {
    setHasFinishedFakeLoading(false)
    setActualLoadingState(LoadingState.Loading)
    setTokenExchangeState(ExchangeTokenRetrievalState.Loading)

    storageState.setToken('mock token')

    if (!location.hash.includes('#exchange-token=')) {
      return
    }
    const exchangeToken = decodeURIComponent(
      location.hash.replace(/^#exchange-token=/, ''),
    )
    apolloClient!.client
      .mutate({
        mutation: ExchangeTokenDocument,
        variables: { exchangeToken },
      })
      .then(({ data }) => {
        if (data?.exchangeToken?.token) {
          storageState.setToken(data.exchangeToken.token)
          apolloClient!.subscriptionClient.close(true, true)
          setActualLoadingState(LoadingState.Success)
        } else {
          setActualLoadingState(LoadingState.Error)
        }
      })
      .catch((e) => {
        setActualLoadingState(LoadingState.Error)
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

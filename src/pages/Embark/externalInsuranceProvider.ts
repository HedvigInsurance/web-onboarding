import {
  ExternalInsuranceProviderEventEmitter,
  ExternalInsuranceProviderStatus,
} from '@hedviginsurance/embark'
import EventEmitter from 'eventemitter3'

import gql from 'graphql-tag'

import { apolloClient } from '../../client/apolloClient'

const START_SESSION_MUTATION = gql`
  mutation StartExternalDataCollection($input: InitiateDataCollectionInput!) {
    externalInsuranceProvider {
      initiateDataCollection(input: $input)
    }
  }
`

const SESSION_UPDATES_SUBCRIPTION = gql`
  subscription ExternalDataCollectionUpdates($id: ID!) {
    dataCollectionStatus(reference: $id) {
      status
      imageValue
      token
    }
  }
`

export const resolveExternalInsuranceProviderStartSession = (
  id: string,
  providerId: string,
  personalNumber: string,
) => {
  if (!apolloClient) {
    throw new Error('Missing apollo client')
  }

  const eventEmitter = new EventEmitter<ExternalInsuranceProviderEventEmitter>()

  apolloClient.client
    .mutate({
      mutation: START_SESSION_MUTATION,
      variables: {
        input: {
          reference: id,
          insuranceProvider: providerId,
          personalNumber,
        },
      },
    })
    .then(() => {
      if (!apolloClient) {
        throw new Error('Missing apollo client')
      }

      const subscriber = apolloClient.client
        .subscribe({
          query: SESSION_UPDATES_SUBCRIPTION,
          variables: {
            id,
          },
        })
        .subscribe((res) => {
          if (!res.data.dataCollectionStatus) {
            return
          }

          switch (res.data.dataCollectionStatus.status) {
            case 'RUNNING':
              eventEmitter.emit('data', {
                status: ExternalInsuranceProviderStatus.CONNECTING,
              })
              break
            case 'LOGIN':
              eventEmitter.emit('data', {
                status: ExternalInsuranceProviderStatus.REQUIRES_AUTH,
              })
              break
            case 'COLLECTING':
              eventEmitter.emit('data', {
                status: ExternalInsuranceProviderStatus.FETCHING,
              })
              break
            case 'COMPLETED_EMPTY':
            case 'FAILED':
              eventEmitter.emit('data', {
                status: ExternalInsuranceProviderStatus.FAILED,
              })
              subscriber.unsubscribe()
              break
            case 'COMPLETED':
            case 'COMPLETED_PARTIAL':
              eventEmitter.emit('data', {
                status: ExternalInsuranceProviderStatus.COMPLETED,
              })
              subscriber.unsubscribe()
              break
          }
        })
    })

  return eventEmitter
}

const PROVIDER_STATUS_QUERY = gql`
  query ExternalProviderStatus {
    externalInsuranceProvider {
      providerStatus {
        functional
        insuranceProvider
      }
    }
  }
`

export const resolveExternalInsuranceProviderProviderStatus = async () => {
  if (!apolloClient) {
    return Error('Missing apollo client')
  }

  const response = await apolloClient.client.query<{
    externalInsuranceProvider: {
      providerStatus: Array<{ insuranceProvider: string; functional: boolean }>
    }
  }>({
    query: PROVIDER_STATUS_QUERY,
  })

  return response.data.externalInsuranceProvider.providerStatus.map(
    (provider) => ({
      id: provider.insuranceProvider,
      functional: provider.functional,
    }),
  )
}

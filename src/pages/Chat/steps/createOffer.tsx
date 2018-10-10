import { ApolloError } from 'apollo-client'
import { apolloClient } from 'client/apolloClient'
import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import {
  StorageContainer,
  StorageEffects,
  StorageState,
} from 'utils/StorageContainer'
import { ChatContainer, State as ChatState } from '../state'

export interface CreateOfferMutationVariables {
  firstName: string
  lastName: string
  age: number
  address: string
  postalNumber: string
  city: string
  insuranceType: string
  squareMeters: number
  personsInHousehold: number
  previousInsurer?: string
}

export const CREATE_OFFER_MUTATION: DocumentNode = gql`
  mutation CreateOffer(
    $firstName: String!
    $lastName: String!
    $age: Int!
    $address: String!
    $postalNumber: String!
    $city: String!
    $insuranceType: InsuranceType!
    $squareMeters: Int!
    $personsInHousehold: Int!
    $previousInsurer: String
  ) {
    createOffer(
      details: {
        firstName: $firstName
        lastName: $lastName
        age: $age
        address: $address
        postalNumber: $postalNumber
        city: $city
        insuranceType: $insuranceType
        squareMeters: $squareMeters
        personsInHousehold: $personsInHousehold
        previousInsurer: $previousInsurer
      }
    )
  }
`

export const CREATE_SESSION_TOKEN_MUTATION: DocumentNode = gql`
  mutation CreateSessionToken {
    createSession
  }
`
const getCreateOfferParamsFromChatState = (
  chatState: ChatState,
): CreateOfferMutationVariables => ({
  firstName: chatState.nameAge.firstName,
  lastName: chatState.nameAge.lastName,
  age: Number(chatState.nameAge.age),
  address: chatState.livingSituation.streetAddress,
  postalNumber: chatState.livingSituation.postalCode,
  city: 'Storstan',
  personsInHousehold: Number(chatState.livingSituation.numberOfPeople),
  squareMeters: Number(chatState.livingSituation.size),
  insuranceType: chatState.livingSituation.apartmentType!,
  previousInsurer: chatState.currentInsurance.hasCurrentInsurance
    ? chatState.currentInsurance.currentInsurer
    : undefined,
})

const onSessionUpdate = (
  storageState: StorageState & StorageEffects,
  createOffer: MutationFn<
    { createOffer: string },
    CreateOfferMutationVariables
  >,
  chatState: ChatState,
) => (_: any, { data }: { data?: { createSession: string } }) => {
  if (!data) {
    return
  }
  storageState.setToken(data.createSession)
  // async magic to not interrupt connection while updating the store
  setTimeout(() => {
    apolloClient!.subscriptionClient!.close(true, true)
    createOffer({ variables: getCreateOfferParamsFromChatState(chatState) })
  }, 0)
}

export type CreateOfferChild = (
  mutate: () => void,
  props: {
    data?: string
    error?: ApolloError
    called: boolean
    loading: boolean
  },
) => React.ReactNode

export const CreateOffer: React.SFC<{ children: CreateOfferChild }> = ({
  children,
}) => (
  <StorageContainer>
    {(storageState) => (
      <ChatContainer>
        {(chatState) => (
          <Mutation<{ createSession: string }, void>
            mutation={CREATE_SESSION_TOKEN_MUTATION}
          >
            {(createSession, createSessionProps) => (
              <Mutation<{ createOffer: string }, CreateOfferMutationVariables>
                mutation={CREATE_OFFER_MUTATION}
              >
                {(createOffer, createOfferProps) =>
                  children(
                    () => {
                      if (
                        !storageState.session.getSession()!.token &&
                        !createSessionProps.called
                      ) {
                        createSession({
                          update: onSessionUpdate(
                            storageState,
                            createOffer,
                            chatState,
                          ),
                        })
                        return
                      }

                      createOffer({
                        variables: getCreateOfferParamsFromChatState(chatState),
                      })
                    },
                    {
                      data: Boolean(createOfferProps.data)
                        ? createOfferProps.data!.createOffer
                        : undefined,
                      called: createOfferProps.called,
                      error: createOfferProps.error || createSessionProps.error,
                      loading:
                        createOfferProps.loading || createSessionProps.loading,
                    },
                  )
                }
              </Mutation>
            )}
          </Mutation>
        )}
      </ChatContainer>
    )}
  </StorageContainer>
)

export const CreateOfferComponent = () => (
  <CreateOffer>
    {(mutate, { data, error, loading, called }) => {
      switch (true) {
        case (data === null || data === undefined) && !loading:
          return <button onClick={() => mutate()}>Create offer</button>

        case loading:
          return <div>loading</div>

        case Boolean(error):
          return <div>error</div>

        case called && Boolean(data):
          return <div>success</div>

        default:
          return null
      }
    }}
  </CreateOffer>
)

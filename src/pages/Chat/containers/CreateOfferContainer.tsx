import { ApolloError } from 'apollo-client'
import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import { State as ChatState } from '../state'

export interface CreateOfferMutationVariables {
  firstName: string
  lastName: string
  age: number
  address: string
  postalNumber: string
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
        insuranceType: $insuranceType
        squareMeters: $squareMeters
        personsInHousehold: $personsInHousehold
        previousInsurer: $previousInsurer
      }
    )
  }
`

export const getCreateOfferVariablesFromChatState = (
  chatState: ChatState,
): CreateOfferMutationVariables => ({
  firstName: chatState.nameAge.firstName,
  lastName: chatState.nameAge.lastName,
  age: Number(chatState.nameAge.age),
  address: chatState.livingSituation.streetAddress,
  postalNumber: chatState.livingSituation.postalCode,
  personsInHousehold: Number(chatState.livingSituation.numberOfPeople),
  squareMeters: Number(chatState.livingSituation.size),
  insuranceType: chatState.livingSituation.apartmentType!,
  previousInsurer: chatState.currentInsurance.hasCurrentInsurance
    ? chatState.currentInsurance.currentInsurer
    : undefined,
})

export type CreateOfferChild = (
  mutate: (variables: CreateOfferMutationVariables) => void,
  props: {
    data?: string
    error?: ApolloError
    called: boolean
    loading: boolean
  },
) => React.ReactNode

interface CreateOfferContainerProps {
  children: CreateOfferChild
}

export const CreateOfferContainer: React.SFC<CreateOfferContainerProps> = ({
  children,
}) => (
  <Mutation<{ createOffer: string }, CreateOfferMutationVariables>
    mutation={CREATE_OFFER_MUTATION}
  >
    {(mutate, { data, loading, error, called }) =>
      children(
        (variables) => {
          mutate({ variables })
        },
        {
          data: data && data.createOffer,
          loading,
          error,
          called,
        },
      )
    }
  </Mutation>
)

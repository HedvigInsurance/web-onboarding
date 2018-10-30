import { ApolloError } from 'apollo-client'
import { DocumentNode } from 'graphql'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import { Unmount } from 'react-lifecycle-components'
import { mapToStudentVariant } from 'utils/insuranceDomainUtils'
import { sanitizePostalNumber } from 'utils/postalNumbers'
import { Insurer, State as ChatState } from '../state'
import { ChatScreenContainer } from './ChatScreenContainer'

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

const getPreviousInsurer = (chatState: ChatState) => {
  if (!chatState.currentInsurance.hasCurrentInsurance) {
    return undefined
  }
  if (chatState.currentInsurance.currentInsurer !== Insurer.OTHER) {
    return chatState.currentInsurance.currentInsurer
  }
  return chatState.currentInsurance.otherInsurer
}

export const getCreateOfferVariablesFromChatState = (
  chatState: ChatState,
): CreateOfferMutationVariables => ({
  firstName: chatState.nameAge.firstName,
  lastName: chatState.nameAge.lastName,
  age: Number(chatState.nameAge.age),
  address: chatState.livingSituation.streetAddress,
  postalNumber: sanitizePostalNumber(chatState.livingSituation.postalNumber),
  personsInHousehold: Number(chatState.livingSituation.numberOfPeople),
  squareMeters: Number(chatState.livingSituation.size),
  insuranceType:
    chatState.isStudent === 'true'
      ? mapToStudentVariant(chatState.livingSituation.insuranceType!)
      : chatState.livingSituation.insuranceType!,
  previousInsurer: getPreviousInsurer(chatState),
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
  <ChatScreenContainer>
    {(chatScreenState) => (
      <Unmount
        on={() => {
          chatScreenState.abortDebounce()
        }}
      >
        <Mutation<{ createOffer: string }, CreateOfferMutationVariables>
          mutation={CREATE_OFFER_MUTATION}
        >
          {(mutate, { data, loading, error, called }) =>
            children(
              (variables) => {
                mutate({ variables })
                chatScreenState.beginCreateOffer()
                chatScreenState.beginDebounce()
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
      </Unmount>
    )}
  </ChatScreenContainer>
)

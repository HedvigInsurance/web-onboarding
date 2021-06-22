import { gql } from '@apollo/client'
import { AddressSuggestion } from '@hedviginsurance/embark'
import { apolloClient } from 'apolloClient'

const query = gql`
  query AutoComplete($term: String!) {
    autoCompleteAddress(input: $term) {
      id
      address
      streetName
      streetNumber
      floor
      apartment
      postalCode
      city
    }
  }
`

export const resolveAddressAutocomplete = async (
  term: string,
): Promise<AddressSuggestion[]> => {
  if (!apolloClient) {
    throw new Error('Missing apollo client')
  }

  const result = await apolloClient.client.query({ query, variables: { term } })
  return result.data.autoCompleteAddress || []
}

import { gql } from '@apollo/client'
import { AddressSuggestion } from '@hedviginsurance/embark'
// import {
//   AddressSuggestion,
//   AddressAutocompleteType,
//   AddressAutocompleteQuery
// } from '@hedviginsurance/embark'
import { apolloClient } from 'apolloClient'

// TODO: remove in favor of imports from embark
type AddressAutocompleteType = 'STREET' | 'BUILDING' | 'APARTMENT'
type AddressAutocompleteQuery = (
  searchTerm: string,
  options?: { type: AddressAutocompleteType },
) => Promise<AddressSuggestion[]>

const query = gql`
  query AutoComplete($term: String!, $type: AddressAutocompleteType!) {
    autoCompleteAddress(input: $term, options: { type: $type }) {
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

export const resolveAddressAutocomplete: AddressAutocompleteQuery = async (
  term: string,
  { type } = { type: 'STREET' },
) => {
  if (!apolloClient) {
    throw new Error('Missing apollo client')
  }

  const result = await apolloClient.client.query({
    query,
    variables: { term, type },
  })
  return result.data.autoCompleteAddress || []
}

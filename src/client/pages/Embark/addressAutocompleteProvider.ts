import { gql } from '@apollo/client'
import { apolloClient } from 'apolloClient'

// This interface should be imported from Embark when we've bumped to new version that doesn't exist yet
interface AddressSuggestion {
  id?: string
  address: string
  streetName?: string
  streetNumber?: string
  floor?: string
  apartment?: string
  postalCode?: string
  city?: string
}

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
): Promise<AddressSuggestion | Error> => {
  if (!apolloClient) {
    return Error('Missing apollo client')
  }

  const result = await apolloClient.client.query({ query, variables: { term } })
  return result.data.autoCompleteAddress || []
}

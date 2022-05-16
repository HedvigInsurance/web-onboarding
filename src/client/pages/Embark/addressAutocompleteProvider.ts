import { datadogRum } from '@datadog/browser-rum'
import { gql } from '@apollo/client'
import { AddressAutocompleteQuery } from '@hedviginsurance/embark'
import { apolloClient } from 'apolloClient'

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

  try {
    const result = await apolloClient.client.query({
      query,
      variables: { term, type },
    })

    return result.data.autoCompleteAddress || []
  } catch (error) {
    datadogRum.addError(error)
  }

  return []
}
